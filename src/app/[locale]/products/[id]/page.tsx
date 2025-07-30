import prisma from "@/app/lib/prismaClient";
import React from "react";
import Slider from "@/components/Slider/SliderProducts";
import {getLocale, getTranslations} from "next-intl/server";

import "@/components/Slider/SliderProducts";

import "@/app/styles/products/products-item.scss";
import "@/app/styles/components/table.scss";
import {notFound} from "next/navigation";

type ProductPageProps = {
  params: Promise<{ id: string }>;
};

const ProductPage = async ({params}: ProductPageProps) => {
  const {id} = await params;

  const product = await prisma.product.findUnique({
    where: {link: id},
    include: {content: true},
  });

  const t = await getTranslations("Products");

  const locale = await getLocale();

  const content = product?.content.find((item) => item.lang === locale);

  if (!content) return notFound();

  return (
    <section className="products-item section">
      <div className="products-item__inner container">
        <div className="products-item__hero">
          <div className="products-item__main">
            <h1 className="products-item__title">{content?.title}</h1>
            <div
              className="products-item__subtitle"
              dangerouslySetInnerHTML={{
                __html: content?.subBody ?? "",
              }}
            />
            <div
              className="table"
              dangerouslySetInnerHTML={{
                __html: content?.table ?? "",
              }}
            />
          </div>
          <Slider images={product?.images} />
        </div>
        {content?.body && (
          <div className="products-item__info">
            <h3 className="products-item__info-title">{t("info")}</h3>
            <div
              className="products-item__info-text"
              dangerouslySetInnerHTML={{__html: content?.body ?? ""}}
            />
          </div>
        )
        }

      </div>
    </section>
  );
};

export default ProductPage;
