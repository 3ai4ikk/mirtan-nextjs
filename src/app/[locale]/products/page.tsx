import React from "react";
import Product from "../../components/Products/Product";

import { getProductsItems } from "../../components/products";

import "@/components/Products/products.scss";
import "./products.scss";
import { useTranslations } from "next-intl";

const Products = () => {
  const t = useTranslations("Products");

  const productsTitles = t.raw("title");

  return (
    <section className="products section">
      <div className="products__inner container">
        <h1 className="products__title">{productsTitles[1]}</h1>
        <div className="products__body">
          <div className="products__list">
            <Product
              title={getProductsItems(t)[12].title}
              link={getProductsItems(t)[12].link}
              imageUrl={getProductsItems(t)[12].imageUrl}
              description={getProductsItems(t)[12].description}
            />
            <Product
              title={getProductsItems(t)[13].title}
              link={getProductsItems(t)[13].link}
              imageUrl={getProductsItems(t)[13].imageUrl}
              description={getProductsItems(t)[13].description}
            />
            <Product
              title={getProductsItems(t)[14].title}
              link={getProductsItems(t)[14].link}
              imageUrl={getProductsItems(t)[14].imageUrl}
              description={getProductsItems(t)[14].description}
            />
          </div>
        </div>
        <h1 className="products__title">{productsTitles[0]}</h1>
        <div className="products__body">
          <div className="products__list">
            {getProductsItems(t).map(
              ({ title, link, imageUrl, description }, index) => (
                <Product
                  key={index}
                  title={title}
                  link={link}
                  imageUrl={imageUrl}
                  description={description}
                />
              )
            )}
          </div>
        </div>
        <h1 className="products__title">{productsTitles[2]}</h1>
        <div className="products__body">
          <div className="products__list">
            <Product
              title={getProductsItems(t)[15].title}
              link={getProductsItems(t)[15].link}
              imageUrl={getProductsItems(t)[15].imageUrl}
              description={getProductsItems(t)[15].description}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products;
