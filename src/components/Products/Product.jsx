import React from "react";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import { useTranslations } from "next-intl";
import "./products.scss";

const Product = ({ title, link, imageUrl, description }) => {
  const t = useTranslations("Products");

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
            {t("button")}
          </button>
        </div>
      </Link>
    </div>
  );
};

export default Product;
