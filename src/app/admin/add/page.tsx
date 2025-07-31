"use client";

import {addProduct, addImages} from "@/app/lib/action";
import {useEdgeStore} from "@/app/lib/edgestore";
import {hasProduct} from "@/app/lib/serverUtils";
import ImageLoader from "@/components/Admin/ImageLoader/ImageLoader";
import SwiperLoaderTest, {
  ImageChange,
  ImageItem,
} from "@/components/Admin/SwiperLoader/SwiperLoaderTest";
import Switcher from "@/components/Admin/TableComponent/Switcher";
import Editor from "@/components/Editor/Editor";
import Form from "next/form";
import {redirect} from "next/navigation";
import React, {useState, useCallback} from "react";
import {useDebouncedCallback} from "use-debounce";

import style from "./page.module.scss";
import {Category, cn, initialEditorValue} from "@/app/lib/utils";
import {Content} from "@/app/types/types";
import {Locale} from "@/i18n/routing";
import MyTableComponent
  from "@/components/Admin/TableComponent/MyTableComponent";

const initialLang = "ru";

const AddProductPage = () => {
  const [langs, setLangs] = useState<Locale[]>([initialLang]);
  const [preview, setPreview] = useState<File>();
  const [images, setImages] = useState<File[]>([]);
  const [subBodyJSON, setSubBodyJSON] = useState<Content>(
    Object.fromEntries(
      langs.map((lang) => [lang, {value: JSON.stringify(initialEditorValue)}])
    )
  );
  const [subBody, setSubBody] = useState<Content>(
    Object.fromEntries(langs.map((lang) => [lang, {value: ""}]))
  );
  const [body, setBody] = useState<Content>(
    Object.fromEntries(langs.map((lang) => [lang, {value: ""}]))
  );
  const [bodyJSON, setBodyJSON] = useState<Content>(
    Object.fromEntries(
      langs.map((lang) => [lang, {value: JSON.stringify(initialEditorValue)}])
    )
  );
  const [table, setTable] = useState<Content>(
    Object.fromEntries(langs.map((lang) => [lang, {value: ""}]))
  );
  const [tableJSON, setTableJSON] = useState<Content>(
    Object.fromEntries(langs.map((lang) => [lang, {value: ""}]))
  );
  const [isTable, setIsTable] = useState<Content>(
    Object.fromEntries(langs.map((lang) => [lang, {value: false}]))
  );

  const [title, setTitle] = useState<Content>(
    Object.fromEntries(langs.map((lang) => [lang, {value: ""}]))
  );

  const [description, setDescription] = useState<Content>(
    Object.fromEntries(langs.map((lang) => [lang, {value: ""}]))
  );

  const [link, setLink] = useState<string>("");

  const [linkState, setLinkState] = useState<"red" | "green" | "gray">("gray");

  const [locale, setLocale] = useState<Locale>("ru");

  const [category, setCategory] = useState<Category>(Category.EMPTY);

  const {edgestore} = useEdgeStore();

  const linkHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const link = e.target.value.toLowerCase();

    const isValid = /^[A-Za-z0-9\s-]+$/.test(link);

    if (!isValid) {
      setLinkState("red");
      return;
    }

    const res = await hasProduct(link);

    setLinkState((res) ? "red" : "green");
  };

  const debounce = useDebouncedCallback(linkHandler, 1000);

  const handleTableChange = useCallback(
    (html: string, json: string[][]) => {
      setTable((prev) => ({...prev, [locale]: {value: html}}));
      setTableJSON((prev) => ({...prev, [locale]: {value: json}}));
    },
    [locale]
  );

  const handleImagesChange = useCallback(
    (changes: ImageChange[], currentImages: ImageItem[]) => {
      // Извлекаем файлы из currentImages и записываем в state setImages
      const files = currentImages
        .filter((item) => !item.isDeleted && item.file) // Фильтруем удаленные и без файлов
        .map((item) => item.file!) // Извлекаем файлы
        .filter(Boolean); // Убираем undefined

      setImages(files);
    },
    []
  );

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
                manualFileName: `products/slider/${link}/${index}.${
                  file.type.split("/")[1]
                }`,
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

  const formHandler = async () => {
    const res = await addProduct(
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

    if (res) {
      const url = await uploadPreview(preview as File, link as string);

      const imagesURL = await uploadImages(images, link as string);

      await addImages(link as string, url as string, imagesURL);
    }

    redirect("/admin");
  };

  const addNewLang = (lang: Locale) => {
    setDescription((prev) => ({...prev, [lang]: {value: ""}}));
    setTitle((prev) => ({...prev, [lang]: {value: ""}}));
    setTable((prev) => ({...prev, [lang]: {value: ""}}));
    setSubBody((prev) => ({...prev, [lang]: {value: ""}}));
    setBody((prev) => ({...prev, [lang]: {value: ""}}));
    setSubBodyJSON((prev) => ({
      ...prev,
      [lang]: {value: JSON.stringify(initialEditorValue)},
    }));
    setBodyJSON((prev) => ({
      ...prev,
      [lang]: {value: JSON.stringify(initialEditorValue)},
    }));
    setTableJSON((prev) => ({
      ...prev,
      [lang]: {value: {}},
    }));
    setIsTable((prev) => ({...prev, [lang]: {value: false}}));
  };

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
              onChange={(e) => {
                setCategory(e.target.value as Category);
              }}
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
              <SwiperLoaderTest onChanges={handleImagesChange} />
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
                key={`subBodyEditor-${locale}`}
                initialContent={JSON.parse(
                  subBodyJSON[locale]?.value as string
                )}
                onChange={(jsonContent, htmlContent) => {
                  setSubBodyJSON((prev) => ({
                    ...prev,
                    [locale]: {value: JSON.stringify(jsonContent)},
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
                key={`bodyEditor-${locale}`}
                initialContent={JSON.parse(bodyJSON[locale]?.value as string)}
                onChange={(jsonContent, htmlContent) => {
                  setBodyJSON((prev) => ({
                    ...prev,
                    [locale]: {value: JSON.stringify(jsonContent)},
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
            onChange={(html, json) => {
              handleTableChange(html, json);
            }}
          />
        )}

        <button
          disabled={linkState !== "green"}
          type="submit"
          className="w-full md:w-auto px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors duration-150"
        >
          Добавить товар
        </button>
      </Form>
    </>
  );
};

export default AddProductPage;
