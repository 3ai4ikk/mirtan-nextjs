import prisma from "@/app/lib/prismaClient";
import EditProductClientForm from "@/components/Admin/EditProductClientForm";

import { notFound } from "next/navigation";
import React from "react";

const EditProductPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const product = await prisma.product.findUnique({ where: { link: id } });

  if (!product) return notFound();

  return <EditProductClientForm product={product} />;
};

export default EditProductPage;
