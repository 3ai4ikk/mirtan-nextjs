"use client";

import { addProduct, addImages } from "@/app/lib/action";
import { useEdgeStore } from "@/app/lib/edgestore";
import ImageLoader from "@/components/Admin/ImageLoader/ImageLoader";
import SwiperLoader from "@/components/Admin/SwiperLoader/SwiperLoader";
import TableComponent from "@/components/Admin/TableComponent/TableComponent";
import Editor from "@/components/Editor/Editor";
import Form from "next/form";
import { redirect } from "next/navigation";
import React, { useState } from "react";

const AddProductPage = () => {
  const [preview, setPreview] = useState<File>();
  const [images, setImages] = useState<File[]>([]);
  const [subBodyJSON, setSubBodyJSON] = useState<object>({});
  const [subBody, setSubBody] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [bodyJSON, setBodyJSON] = useState<object>({});
  const [table, setTable] = useState<string>("");
  const [tableJSON, setTableJSON] = useState<object>({});

  const { edgestore } = useEdgeStore();

  const uploadPreview = async (file: File, link: string) => {
    if (file) {
      const res = await edgestore.publicImages.upload({
        file: file,
        options: {
          manualFileName: `products/preview/${link}.${file.type.split("/")[1]}`,
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

  const formHandler = async (formData: FormData) => {
    const link = formData.get("link");

    const res = await addProduct(
      formData,
      subBody,
      JSON.stringify(subBodyJSON),
      body,
      JSON.stringify(bodyJSON),
      table,
      JSON.stringify(tableJSON)
    );

    if (res) {
      const url = await uploadPreview(preview as File, link as string);

      const imagesURL = await uploadImages(images, link as string);

      await addImages(link as string, url as string, imagesURL);
    }

    redirect("/admin");
  };

  return (
    <Form
      formMethod="POST"
      action={formHandler}
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
            <ImageLoader onFileSelect={(file) => setPreview(file)} />
          </div>

          <div className="border-2 border-dashed border-gray-200 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-600 mb-2">
              Галерея изображений
            </h3>
            <SwiperLoader
              onFileSelected={(file) => {
                if (Array.isArray(file)) setImages(file);
                else setImages([file]);
              }}
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
              onChange={(jsonContent, htmlContent) => {
                setBodyJSON(jsonContent);
                setBody(htmlContent);
              }}
            />
          </div>
        </div>
      </div>

      <TableComponent
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
};

export default AddProductPage;
