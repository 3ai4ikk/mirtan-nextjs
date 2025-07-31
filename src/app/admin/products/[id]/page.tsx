import prisma from "@/app/lib/prismaClient";
import EditProductClientForm from "@/components/Admin/EditProductClientForm";

import {notFound} from "next/navigation";
import React from "react";
import {Metadata} from "next";

export async function generateMetadata({params}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {

  const {id} = await params;

  const product = await prisma.product.findUnique({
    where: {link: id},
    include: {content: true},
  });

  return {
    title: "Mirtan | " + product?.content.find(item => item.lang === "ru")?.title
  };
}

const EditProductPage = async (
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  }) => {
  const {id} = await params;

  const product = await prisma.product.findUnique({
    where: {link: id},
    include: {content: true},
  });

  if (!product) return notFound();

  const getContentByField = (field: keyof (typeof product.content)[0]) =>
    Object.fromEntries(
      product.content.map((c) => [c.lang, {value: c[field] ?? ""}])
    );

  const availableLangs = product.content.map((c) => c.lang);

  return (
    <EditProductClientForm
      productId={product.id}
      productLangs={availableLangs}
      productCategory={product.category}
      images={product.images}
      productPreview={product.preview}
      productLink={product.link}
      productTitle={getContentByField("title")}
      productDescription={getContentByField("description")}
      productSubBody={getContentByField("subBody")}
      productSubBodyJSON={getContentByField("subBodyJSON")}
      productBody={getContentByField("body")}
      productBodyJSON={getContentByField("bodyJSON")}
      productTable={getContentByField("table")}
      productTableJSON={getContentByField("tableJSON")}
    />
  );
};

export default EditProductPage;
