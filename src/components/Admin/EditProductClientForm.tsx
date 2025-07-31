"use client";
import {ChangeEvent, useCallback, useState} from "react";
import Editor from "@/components/Editor/Editor";
import Form from "next/form";
import ImageLoader from "./ImageLoader/ImageLoader";
import {addImages, deleteProduct, updateProduct} from "@/app/lib/action";
import {useEdgeStore} from "@/app/lib/edgestore";
import Switcher from "./TableComponent/Switcher";
import SwiperLoaderTest, {ImageChange} from "./SwiperLoader/SwiperLoaderTest";

import {type ImageItem} from "./SwiperLoader/SwiperLoaderTest";
import {useRouter} from "next/navigation";
import {Content} from "@/app/types/types";
import {Locale} from "@/i18n/routing";
import {Category, cn, initialEditorValue} from "@/app/lib/utils";

import style from "@/app/admin/add/page.module.scss";
import {hasProduct} from "@/app/lib/serverUtils";
import {useDebouncedCallback} from "use-debounce";
import MyTableComponent from "./TableComponent/MyTableComponent";

type Props = {
  productId: number;
  productLangs: string[];
  productLink: string;
  productCategory: string;
  productPreview: string;
  images: string[];
  productTitle: Content;
  productDescription: Content;
  productSubBody: Content;
  productSubBodyJSON: Content;
  productBody: Content;
  productBodyJSON: Content;
  productTable: Content;
  productTableJSON: Content;
};

export default function EditProductClientForm(
  {
    productId,
    productLangs,
    productLink,
    productCategory,
    productPreview,
    images,
    productDescription,
    productSubBody,
    productSubBodyJSON,
    productBody,
    productBodyJSON,
    productTable,
    productTableJSON,
    productTitle,
  }: Props) {
  const {edgestore} = useEdgeStore();

  const [langs, setLangs] = useState<Locale[]>(productLangs as Locale[]);

  const [link, setLink] = useState<string>(productLink);

  const [preview, setPreview] = useState<string | File>(productPreview);

  const [title, setTitle] = useState<Content>(productTitle);

  const [description, setDescription] = useState<Content>(productDescription);

  // Track image changes
  const [imageChanges, setImageChanges] = useState<ImageChange[]>([]);
  const [currentImages, setCurrentImages] = useState<ImageItem[]>([]);

  const [subBody, setSubBody] = useState<Content>(productSubBody);
  const [subBodyJSON, setSubBodyJSON] = useState<Content>(productSubBodyJSON);
  const [body, setBody] = useState<Content>(productBody);
  const [bodyJSON, setBodyJSON] = useState<Content>(productBodyJSON);
  const [table, setTable] = useState<Content>(productTable);
  const [tableJSON, setTableJSON] = useState<Content>(productTableJSON);
  const [isTable, setIsTable] = useState<Content>(productTable ?? false);

  const [locale, setLocale] = useState<Locale>("ru");

  const [linkState, setLinkState] = useState<"red" | "green" | "gray">("green");

  const [category, setCategory] = useState<Category>(
    productCategory as Category
  );

  const router = useRouter();

  const linkHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    const link = e.target.value.toLowerCase();

    const isValid = /^[A-Za-z0-9\s-]+$/.test(link);


    if (!isValid) {
      setLinkState("red");
      return;
    }

    const res = await hasProduct(link);

    setLinkState((res) ? "red" : "green");
  };

  const handleTableChange = useCallback(
    (html: string, json: string[][]) => {
      setTable((prev) => ({...prev, [locale]: {value: html}}));
      setTableJSON((prev) => ({
        ...prev,
        [locale]: {value: json},
      }));
    },
    [locale]
  );

  const debounce = useDebouncedCallback(linkHandler, 1000);

  const uploadPreview = async (file: File, link: string) => {
    if (file as File) {
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

  const uploadNewImage = async (
    file: File,
    link: string,
    timestamp: number
  ) => {
    const res = await edgestore.publicImages.upload({
      file: file,
      options: {
        replaceTargetUrl: `products/slider/${link}/${timestamp}.${
          file.type.split("/")[1]
        }`,
      },
    });
    return res.url;
  };

  const deleteImageFromStorage = async (imageUrl: string) => {
    console.log(imageUrl);
    try {
      await edgestore.publicImages.delete({
        url: imageUrl,
      });
      console.log("Image deleted from storage:", imageUrl);
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  const handleImageChanges = (changes: ImageChange[], images: ImageItem[]) => {
    setImageChanges(changes);
    setCurrentImages(images);
  };

  const processImageChanges = async (link: string) => {
    const finalImages: string[] = [];
    const imagesToDelete: string[] = [];
    let imageCounter = Date.now();

    // Process existing images
    const visibleImages = currentImages.filter((img) => !img.isDeleted);

    for (const image of visibleImages) {
      if (image.isNew && image.file) {
        // Upload new or replaced image
        const newUrl = await uploadNewImage(image.file, link, imageCounter++);
        finalImages.push(newUrl);
      } else if (!image.isNew) {
        // Keep existing unchanged image
        finalImages.push(image.url);
      }
    }

    // Handle deletions
    const deletedImages = currentImages.filter((img) => img.isDeleted);
    for (const deletedImage of deletedImages) {
      if (!deletedImage.isNew) {
        imagesToDelete.push(deletedImage.url);
      }
    }

    // Handle replacements (find old URLs to delete)
    for (const change of imageChanges) {
      if (change.type === "replace" && change.oldUrl) {
        // Check if old URL was an existing file
        const wasExisting = images.includes(change.oldUrl);
        if (wasExisting) {
          imagesToDelete.push(change.oldUrl);
        }
      }
    }

    // Delete images from storage
    if (imagesToDelete.length > 0) {
      await Promise.all(
        imagesToDelete.map((url) => deleteImageFromStorage(url))
      );
    }

    return finalImages;
  };

  const handleForm = async () => {
    try {
      // Update product
      await updateProduct(
        productLink,
        link,
        category,
        langs,
        title,
        description,
        subBody,
        subBodyJSON,
        body,
        bodyJSON,
        table,
        tableJSON,
        isTable
      );

      // Handle preview image
      const previewUrl =
        preview instanceof File
          ? await uploadPreview(preview as File, link)
          : productPreview;

      // Process image changes
      const finalImages = await processImageChanges(link);

      // Save all images in their correct order
      await addImages(link, previewUrl as string, finalImages);

      console.log("Form submission completed successfully");

      // Revalidate page
      router.replace(`/admin/products/${link}`, {scroll: false});
    } catch (error) {
      console.error("Error during form submission:", error);
      // Could add user-facing error handling here
    }
  };

  const addNewLang = (lang: Locale) => {
    setDescription((prev) => ({...prev, [lang]: {value: ""}}));
    setTitle((prev) => ({...prev, [lang]: {value: ""}}));
    setTable((prev) => ({...prev, [lang]: {value: ""}}));
    setSubBody((prev) => ({...prev, [lang]: {value: ""}}));
    setBody((prev) => ({...prev, [lang]: {value: ""}}));
    setSubBodyJSON((prev) => ({
      ...prev,
      [lang]: {value: initialEditorValue},
    }));
    setBodyJSON((prev) => ({
      ...prev,
      [lang]: {value: initialEditorValue},
    }));
    setTableJSON((prev) => ({
      ...prev,
      [lang]: {value: {}},
    }));
    setIsTable((prev) => ({...prev, [lang]: {value: false}}));
  };

  const handleDelete = async () => {
    await deleteProduct(productId);
    router.replace("/admin");
  }

  return (
    <>
      <nav className={style.nav}>
        <ul>
          {langs.map((lang) => (
            <li
              key={lang}
              className={cn(style.li, locale === lang ? style["active"] : "")}
              onClick={() => setLocale(lang)}
            >
              <span>{lang.toUpperCase()}</span>
            </li>
          ))}
          {langs.length < 3 && (
            <button
              type="button"
              onClick={() => {
                const availableLangs: Locale[] = ["en", "tr", "ru"];
                const lang = availableLangs.find((l) => !langs.includes(l));
                if (lang) {
                  setLangs((prev) => [...prev, lang]);
                  addNewLang(lang);
                }
              }}
            >
              +
            </button>
          )}
        </ul>
      </nav>

      <Form
        id="form"
        formMethod="POST"
        action={handleForm}
        className={cn(style.form, "space-y-8 bg-white pt-15 rounded-xl shadow-md container")}
      >
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-700 pb-2 border-b border-gray-200">
            Основная информация
          </h2>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-600">
              URL товара
              <div
                className={cn(
                  "mt-1 flex rounded-md shadow-sm",
                  style.div,
                  style[linkState]
                )}
              >
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                  https://mirtantarim.com/products/
                </span>
                <input
                  type="text"
                  name="link"
                  value={link}
                  placeholder="product-link"
                  required
                  className="flex-1 block w-full rounded-r-md border-gray-300 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  onChange={(e) => {
                    setLink(e.target.value.replace(/\s+/g, '-').trim());
                    debounce(e);
                  }}
                />
              </div>
            </label>
          </div>

          <div className="space-y-2">
            <span className="block text-sm font-medium text-gray-600">
              Категория товара
            </span>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as Category)}
              style={{fontSize: "14px"}}
              name="select-category"
            >
              <option>{Category.EMPTY}</option>
              <option>{Category.CompleteMills}</option>
              <option>{Category.IndustrialAutomation}</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-600">
              Название товара
              <input
                type="text"
                name="title"
                value={title[locale]?.value as string}
                placeholder="Введите название"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                onChange={(e) => {
                  setTitle((prev) => ({
                    ...prev,
                    [locale]: {value: e.target.value},
                  }));
                }}
              />
            </label>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-600">
              Краткое описание
              <input
                type="text"
                name="description"
                value={description[locale]?.value as string}
                placeholder="Введите описание"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                onChange={(e) => {
                  setDescription((prev) => ({
                    ...prev,
                    [locale]: {value: e.target.value},
                  }));
                }}
              />
            </label>
          </div>
        </div>
        <div className={cn(style.images, "space-y-6")}>
          <h2 className="text-lg font-semibold text-gray-700 pb-2 border-b border-gray-200">
            Изображения
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border-2 border-dashed border-gray-200 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-600 mb-2">
                Главное изображение
              </h3>
              <ImageLoader
                src={productPreview}
                onFileSelect={setPreview}
              />
            </div>

            <div className="border-2 border-dashed border-gray-200 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-600 mb-2">
                Галерея изображений
              </h3>
              <SwiperLoaderTest
                images={images}
                onChanges={handleImageChanges}
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
                key={locale}
                initialContent={subBodyJSON[locale]?.value as object}
                onChange={(jsonContent, htmlContent) => {
                  setSubBodyJSON((prev) => ({
                    ...prev,
                    [locale]: {value: jsonContent},
                  }));
                  setSubBody((prev) => ({
                    ...prev,
                    [locale]: {value: htmlContent},
                  }));
                }}
              />
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-600">
                Полное описание
              </h3>
              <Editor
                key={locale}
                initialContent={bodyJSON[locale]?.value as object}
                onChange={(jsonContent, htmlContent) => {
                  setBodyJSON((prev) => ({
                    ...prev,
                    [locale]: {value: jsonContent},
                  }));
                  setBody((prev) => ({
                    ...prev,
                    [locale]: {value: htmlContent},
                  }));
                }}
              />
            </div>
          </div>
        </div>
        <Switcher
          initialValue={isTable[locale]?.value as boolean}
          onChange={(value) => {
            setIsTable((prev) => ({...prev, [locale]: {value: value}}));
          }}
        />
        {isTable[locale]?.value && (
          <MyTableComponent
            key={`table-${locale}`}
            initialValue={tableJSON[locale]?.value as string[][]}
            onChange={handleTableChange}
          />
        )}
        <div className="flex justify-between gap-10">
          <button
            disabled={linkState !== "green"}
            type="submit"
            className="w-full md:w-auto px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors duration-150"
          >
            Сохранить товар
          </button>

          <button
            type="button"
            className="w-full md:w-auto px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-md transition-colors duration-150"
            onClick={handleDelete}
          >
            Удалить товар
          </button>
        </div>

      </Form>
    </>
  );
}
