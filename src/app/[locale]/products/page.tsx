import React from "react";
import Product from "../../../components/Products/Product";

import {getItems} from "@/components/products";

import "@/components/Products/products.scss";
import "./products.scss";
import {getLocale, getTranslations} from "next-intl/server";
import {Category} from "@/app/lib/utils";
import {Metadata} from "next";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Metadata");
  return {
    title: "Mirtan | " + t("Titles.products"),
    description: t("Descriptions.products"),
  };
}

const Products = async () => {
  const t = await getTranslations("Products");

  const locale = await getLocale();

  const products = await getItems();

  const mills = products.filter(
    (item) => item.category === Category.CompleteMills
  ).sort((a, b) => a.id - b.id);

  const automation = products.filter(
    (item) => item.category === Category.IndustrialAutomation
  ).sort((a, b) => a.id - b.id);

  const productsTitles = t.raw("title");

  return (
    <section className="products section">
      <div className="products__inner container">
        <h1 className="products__title">{productsTitles[1]}</h1>
        <div className="products__body">
          <div className="products__list">
            {mills.map((item) => (<Product
              key={item.id}
              title={item.content.find((item) => item.lang === locale)?.title}
              link={"/products/" + item.link}
              imageUrl={item.preview}
              description={item.content.find((item) => item.lang === locale)?.description}
            />))}
          </div>
        </div>
        <h1 className="products__title">{productsTitles[0]}</h1>
        <div className="products__body">
          <div className="products__list">
            {products.map((item) => (<Product
              key={item.id}
              title={item.content.find((item) => item.lang === locale)?.title}
              link={"/products/" + item.link}
              imageUrl={item.preview}
              description={item.content.find((item) => item.lang === locale)?.description}
            />))}
          </div>
        </div>
        <h1 className="products__title">{productsTitles[2]}</h1>
        <div className="products__body">
          <div className="products__list">
            {automation.map((item) => (<Product
              key={item.id}
              title={item.content.find((item) => item.lang === locale)?.title}
              link={"/products/" + item.link}
              imageUrl={item.preview}
              description={item.content.find((item) => item.lang === locale)?.description}
            />))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products;
