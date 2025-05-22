"use server";

import prisma from "./prismaClient";
import { Prisma } from "../../../generated/prisma";
import { revalidatePath } from "next/cache";

export const revalidate = async (path: string) => {
  revalidatePath(path, "page");
};

export const addProduct = async (
  formData: FormData,
  subBody: string,
  subBodyJSON: string,
  body: string,
  bodyJSON: string,
  table: string,
  tableJSON: string
) => {
  const { title, link, description } = Object.fromEntries(formData);

  let res = null;

  try {
    res = await prisma.product.create({
      data: {
        title: title as string,
        link: link as string,
        description: description as string,
        preview: "",
        images: [],
        subBody: subBody,
        subBodyJSON: subBodyJSON,
        body: body,
        bodyJSON: bodyJSON,
        table: table,
        tableJSON: tableJSON,
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
  formData: FormData,
  subBody: string,
  subBodyJSON: string,
  body: string,
  bodyJSON: string,
  table: string,
  tableJSON: string
) => {
  const { title, description } = Object.fromEntries(formData);

  await prisma.product.update({
    where: { link: link },
    data: {
      title: title as string,
      link: link as string,
      description: description as string,
      subBody: subBody,
      subBodyJSON: subBodyJSON,
      body: body,
      bodyJSON: bodyJSON,
      table: table,
      tableJSON: tableJSON,
    },
  });

  console.log("Product updated");
};

export const deleteProduct = async (link: string) => {
  await prisma.product.delete({
    where: {
      link: link,
    },
  });
};
