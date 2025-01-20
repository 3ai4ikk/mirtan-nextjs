import Image from "next/image";
import Link from "next/link";
import React from "react";

import Product from "./Product";
import { getProductsItems } from "../products";

import "./products.scss";
import { useTranslations } from "next-intl";

const ProductsMain = () => {
  const tMain = useTranslations("ProductsMain");
  const tProducts = useTranslations("Products");

  return (
    <section className="products section">
      <div className="products__inner container">
        <header className="products__header">
          <h2 className="products__title">{tMain("title")}</h2>
          <Link
            href="/products"
            className="products__button button button--bg-red button--animation-up"
          >
            {tMain("list")}
          </Link>
        </header>
        <div className="products__body">
          <div className="products__list">
            {getProductsItems(tProducts)
              .slice(0, 6)
              .map(({ title, link, imageUrl, description }, index) => (
                <Product
                  key={index}
                  title={title}
                  link={link}
                  imageUrl={imageUrl}
                  description={description}
                />
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsMain;
