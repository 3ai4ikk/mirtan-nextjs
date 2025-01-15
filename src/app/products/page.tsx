import React from "react";
import Product from "../components/Products/Product";

import { products } from "../components/products";

import "../components/Products/products.scss";
import "./products.scss";

const Products = () => {
  return (
    <section className="products section">
      <div className="products__inner container">
        <h1 className="products__title">Наши товары</h1>
        <div className="products__body">
          <div className="products__list">
            {products.map(({ title, link, imageUrl, description }, index) => (
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
        <h1 className="products__title">Комплектные мельницы</h1>
        <div className="products__body">
          <div className="products__list">
            {products
              .slice(0, 3)
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
        <h1 className="products__title">Промышленная автоматизация</h1>
        <div className="products__body">
          <div className="products__list">
            {products
              .slice(0, 2)
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

export default Products;
