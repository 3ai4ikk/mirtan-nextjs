import React from "react";

import Slider from "../../../../components/Slider/SliderProducts";

import "../../../../components/Slider/SliderProducts";

import { images } from "./images/images";

import "@/app/styles/products/products-item.scss";
import { useTranslations } from "next-intl";

const Mill = () => {
  const t = useTranslations("Products");
  const item = t.raw("product")[5];

  return (
    <section className="products-item section">
      <div className="products-item__inner container">
        <div className="products-item__hero">
          <div className="products-item__main">
            <h1 className="products-item__title">{item.title}</h1>
            <div className="products-item__subtitle">
              {item.info.map((info: string, index: number) => (
                <p key={index}>{info}</p>
              ))}
            </div>
          </div>
          <Slider images={images} />
        </div>
        <div className="products-item__info">
          <h3 className="products-item__info-title">{t("info")}</h3>
          <div className="products-item__info-text">
            <p>{item.text[0]}</p>
            <span>{item.span[0]}</span>
            <ul>
              {item.li[0].map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            <p>{item.text[1]}</p>
            <p>{item.text[2]}</p>
            <span>{item.span[1]}</span>
            <ul>
              {item.li[1].map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            {item.text
              .slice(3, item.length)
              .map((item: string, index: number) => (
                <p key={index}>{item}</p>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mill;
