import Image from "next/image";
import Link from "next/link";
import React from "react";

import Product from "./Product";

import "./products.scss";

import { products } from "../products";

const ProductsMain = () => {
  const productsList = products.slice(0, 6);

  return (
    <section className="products section">
      <div className="products__inner container">
        <header className="products__header">
          <h2 className="products__title">Наши товары</h2>
          <Link
            href="/products"
            className="products__button button button--bg-red button--animation-up"
          >
            Весь список
          </Link>
        </header>
        <div className="products__body">
          <div className="products__list">
            {productsList.map(
              ({ title, link, imageUrl, description }, index) => (
                // <div className="products__card" key={index}>
                //   <Image
                //     src={imageUrl}
                //     alt={title}
                //     className="products__card-img"
                //     width={450}
                //     height={270}
                //   />
                //   <Link href={link} className="products__card-link">
                //     <div className="products__card-body">
                //       <h3 className="products__card-title">{title}</h3>
                //       <div className="products__card-text">
                //         <p>{description}</p>
                //       </div>
                //       <button className="products__card-button button button--bg-red button--animation-up visible-tablet">
                //         Подробнее
                //       </button>
                //     </div>
                //   </Link>
                // </div>
                <Product
                  key={index}
                  title={title}
                  link={link}
                  imageUrl={imageUrl}
                  description={description}
                />
              )
            )}
            {/* <div className="products__card">
              <Image
                src="/images/products/1.jpg"
                alt=""
                className="products__card-img"
                width={405}
                height={270}
              />
              <Link href="/products/1" className="products__card-link">
                <div className="products__card-body">
                  <h3 className="products__card-title">Выбой</h3>
                  <div className="products__card-text">
                    <p>
                      Дозатор весовой (в дальнейшем дозатор) предназначен для
                      дозирования в мешки продуктов с насыпной массой 0,3-0,75
                      т/м3 и влажностью не более 15 %
                    </p>
                  </div>
                  <button className="products__card-button button button--bg-red button--animation-up visible-tablet">
                    Подробнее
                  </button>
                </div>
              </Link>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsMain;
