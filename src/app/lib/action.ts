"use server";

import prisma from "./prismaClient";
import {Prisma} from "../../../generated/prisma";
import {Content} from "../types/types";
import {Locale} from "@/i18n/routing";
import {Category} from "./utils";

export const addProduct = async (
  link: string,
  category: Category,
  langs: Locale[],
  title: Content,
  description: Content,
  subBody: Content,
  subBodyJSON: Content,
  body: Content,
  bodyJSON: Content,
  table: Content,
  tableJSON: Content,
  isTable: Content
) => {
  let res = null;

  try {
    res = await prisma.product.create({
      data: {
        link: link,
        preview: "",
        images: [],
        category: category,
        content: {
          create: langs.map((lang) => ({
            lang: lang,
            title: title[lang]?.value as string,
            description: description[lang]?.value as string,
            subBody: subBody[lang]?.value as string,
            subBodyJSON: JSON.parse(subBodyJSON[lang]?.value as string),
            body: body[lang]?.value as string,
            bodyJSON: JSON.parse(bodyJSON[lang]?.value as string),
            table: isTable[lang]?.value ? (table[lang]?.value as string) : "",
            tableJSON: isTable[lang]?.value
              ? JSON.parse(JSON.stringify(tableJSON[lang]?.value as string))
              : {},
          })),
        },
      },
    });
    console.log("Product created");
    return res;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      throw new Error(error.code);
    }
    throw new Error(error as string);
  }
};

export const addImages = async (
  link: string,
  preview: string,
  images: string[]
) => {
  await prisma.product.update({
    where: {
      link: link,
    },
    data: {
      preview: preview,
      images: images,
    },
  });

  console.log("Product updated");
};

export const updateProduct = async (
  link: string,
  newLink: string,
  category: Category,
  langs: Locale[],
  title: Content,
  description: Content,
  subBody: Content,
  subBodyJSON: Content,
  body: Content,
  bodyJSON: Content,
  table: Content,
  tableJSON: Content,
  isTable: Content
) => {
  // Получаем существующие языки для продукта
  const product = await prisma.product.findUnique({
    where: {link},
    include: {content: true},
  });
  const existingLangs = product?.content.map((c) => c.lang) ?? [];

  // Разделяем на существующие и новые
  const langsToUpdate = langs.filter((lang) => existingLangs.includes(lang));
  const langsToCreate = langs.filter((lang) => !existingLangs.includes(lang));

  await prisma.product.update({
    where: {link: link},
    data: {
      link: newLink,
      category: category,
      content: {
        updateMany: langsToUpdate.map((lang) => ({
          where: {lang: lang},
          data: {
            title: title[lang]?.value as string,
            description: description[lang]?.value as string,
            subBody: subBody[lang]?.value as string,
            subBodyJSON: JSON.parse(
              JSON.stringify(subBodyJSON[lang]?.value as string)
            ),
            body: body[lang]?.value as string,
            bodyJSON: JSON.parse(
              JSON.stringify(bodyJSON[lang]?.value as string)
            ),
            table: isTable[lang]?.value ? (table[lang]?.value as string) : "",
            tableJSON: isTable[lang]?.value
              ? JSON.parse(JSON.stringify(tableJSON[lang]?.value as string))
              : {},
          },
        })),
        create: langsToCreate.map((lang) => ({
          lang: lang,
          title: title[lang]?.value as string,
          description: description[lang]?.value as string,
          subBody: subBody[lang]?.value as string,
          subBodyJSON: JSON.parse(
            JSON.stringify(subBodyJSON[lang]?.value as string)
          ),
          body: body[lang]?.value as string,
          bodyJSON: JSON.parse(JSON.stringify(bodyJSON[lang]?.value as string)),
          table: isTable[lang]?.value ? (table[lang]?.value as string) : "",
          tableJSON: isTable[lang]?.value
            ? JSON.parse(JSON.stringify(tableJSON[lang]?.value as string))
            : {},
        })),
      },
    },
  });

  console.log("Product updated");
};

export const deleteProduct = async (id: number) => {

  await prisma.content.deleteMany({where: {productId: id}});

  await prisma.product.delete({where: {id}});
};
