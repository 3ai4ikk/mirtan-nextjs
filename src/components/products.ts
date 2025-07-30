import prisma from "@/app/lib/prismaClient";

export const getItems = async () => {
  return prisma.product.findMany({include: {content: true}}).then(value => value.sort((a, b) => a.id - b.id));
}
