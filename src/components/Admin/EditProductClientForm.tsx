"use client";
import { useState } from "react";
import Editor from "@/components/Editor/Editor";
import Form from "next/form";
import TableComponent, {
  TableInitialValue,
} from "./TableComponent/TableComponent";
import ImageLoader from "./ImageLoader/ImageLoader";
import SwiperLoader from "./SwiperLoader/SwiperLoader";
import { addImages, revalidate, updateProduct } from "@/app/lib/action";
import { useEdgeStore } from "@/app/lib/edgestore";

type Product = {
  link: string;
  body: string;
  table: string | null;
  title: string;
  description: string;
  subBody: string;
  subBodyJSON: string;
  bodyJSON: string;
  tableJSON: string | null;
  id: number;
  images: string[];
  preview: string;
};

export default function EditProductClientForm({
  product,
}: {
  product: Product;
}) {
  const { edgestore } = useEdgeStore();

  const [preview, setPreview] = useState<string | File>(product.preview);

  const [images, setImages] = useState<string[] | File[]>(product.images);

  const [subBody, setSubBody] = useState<string>(product.subBody);
  const [subBodyJSON, setSubBodyJSON] = useState<object>(
    JSON.parse(product.subBodyJSON)
  );
  const [body, setBody] = useState<string>(product.body);
  const [bodyJSON, setBodyJSON] = useState<object>(
    JSON.parse(product.bodyJSON)
  );
  const [table, setTable] = useState(product.table);
  const [tableJSON, setTableJSON] = useState<object>(
    JSON.parse(product.tableJSON || "{}")
  );

  const uploadPreview = async (file: File, link: string) => {
    if (file) {
      const res = await edgestore.publicImages.upload({
        file: file,
        options: {
          replaceTargetUrl: `products/preview/${link}.${
            file.type.split("/")[1]
          }`,
        },
      });

      console.log("Preview uploaded", res.url);

      return res.url;
    }
  };

  const uploadImages = async (files: File[], link: string) => {
    const imageArray: string[] = [];

    if (files) {
      await Promise.all(
        files.map(async (file, index) => {
          await edgestore.publicImages
            .upload({
              file: file,
              options: {
                replaceTargetUrl: `products/slider/${link}/${index}.${
                  file.type.split("/")[1]
                }`,
              },
            })
            .then((res) => imageArray.push(res.url));
        })
      );
    }

    console.log("Images uploaded", imageArray);

    return imageArray;
  };

  const handleForm = async (formData: FormData) => {
    await updateProduct(
      product.link,
      formData,
      subBody,
      JSON.stringify(subBodyJSON),
      body,
      JSON.stringify(bodyJSON),
      table as string,
      JSON.stringify(tableJSON)
    );

    const url = await uploadPreview(preview as File, product.link);

    const imagesURL = await uploadImages(images as File[], product.link);

    await addImages(product.link, url as string, imagesURL);

    revalidate(`/admin/products/${product.link}`);
  };

  return (
    <Form
      formMethod="POST"
      action={handleForm}
      className="space-y-8 bg-white p-6 rounded-xl shadow-md"
    >
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-700 pb-2 border-b border-gray-200">
          Основная информация
        </h2>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-600">
            URL товара
            <div className="mt-1 flex rounded-md shadow-sm">
              <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                https://mirtantarim.com/products/
              </span>
              <input
                type="text"
                name="link"
                defaultValue={product.link}
                placeholder="product-link"
                required
                className="flex-1 block w-full rounded-r-md border-gray-300 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </label>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-600">
            Название товара
            <input
              type="text"
              name="title"
              defaultValue={product.title}
              placeholder="Введите название"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </label>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-600">
            Краткое описание
            <input
              type="text"
              name="description"
              defaultValue={product.description}
              placeholder="Введите описание"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </label>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-lg font-semibold text-gray-700 pb-2 border-b border-gray-200">
          Изображения
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border-2 border-dashed border-gray-200 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-600 mb-2">
              Главное изображение
            </h3>
            <ImageLoader src={product.preview} onFileSelect={setPreview} />
          </div>

          <div className="border-2 border-dashed border-gray-200 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-600 mb-2">
              Галерея изображений
            </h3>
            <SwiperLoader
              onFileSelected={(file) => {
                setImages(file as File[]);
              }}
              images={product.images}
            />
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-lg font-semibold text-gray-700 pb-2 border-b border-gray-200">
          Описания
        </h2>

        <div className="space-y-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-600">
              Дополнительное описание
            </h3>
            <Editor
              initialContent={subBodyJSON}
              onChange={(jsonContent, htmlContent) => {
                setSubBodyJSON(jsonContent);
                setSubBody(htmlContent);
              }}
            />
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-600">
              Полное описание
            </h3>
            <Editor
              initialContent={bodyJSON}
              onChange={(jsonContent, htmlContent) => {
                setBodyJSON(jsonContent);
                setBody(htmlContent);
              }}
            />
          </div>
        </div>
      </div>

      <TableComponent
        initialValue={tableJSON as TableInitialValue}
        onChange={(content, contentJSON) => {
          setTable(content);
          setTableJSON(contentJSON);
        }}
      />

      <button
        type="submit"
        className="w-full md:w-auto px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors duration-150"
      >
        Добавить товар
      </button>
    </Form>
  );
}
