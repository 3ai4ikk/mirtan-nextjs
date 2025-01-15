import React from "react";
import Link from "next/link";
import Image from "next/image";
import "./products.scss";

const Product = ({ title, link, imageUrl, description }) => {
  return (
    <div className="products__card">
      <Image
        src={imageUrl}
        alt={title}
        className="products__card-img"
        width={450}
        height={270}
      />
      <Link href={link} className="products__card-link">
        <div className="products__card-body">
          <h3 className="products__card-title">{title}</h3>
          <div className="products__card-text">
            <p>{description}</p>
          </div>
          <button className="products__card-button button button--bg-red button--animation-up visible-tablet">
            Подробнее
          </button>
        </div>
      </Link>
    </div>
  );
};

export default Product;
