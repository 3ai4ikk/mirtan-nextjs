import {Link} from "@/i18n/navigation";
import React, {Suspense} from "react";

import Product from "./Product";
import {getItems} from "../products";

import "./products.scss";
import {getLocale, getTranslations} from "next-intl/server";

const ProductsMain = async () => {
  const tMain = await getTranslations("ProductsMain");

  const locale = await getLocale();

  const products = await getItems();

  return (
    <Suspense fallback={<></>}>
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
              {products
                .slice(0, 6)
                .map((item) => (
                  <Product
                    key={item.id}
                    title={item?.content.find((item) => item.lang === locale)?.title}
                    link={"/products/" + item.link}
                    imageUrl={item.preview}
                    description={item?.content.find((item) => item.lang === locale)?.description}
                  />
                ))}
            </div>
          </div>
        </div>
      </section>
    </Suspense>
  );
};

export default ProductsMain;
