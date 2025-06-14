"use server";

import prisma from "./prismaClient";

export const hasProduct = async (link: string) => {
  const product = await prisma.product.findUnique({ where: { link: link } });
  return product !== null;
};
