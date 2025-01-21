import React from "react";

import Slider from "../../../../components/Slider/SliderProducts";

import "../../../../components/Slider/SliderProducts";

import { images } from "./images/images";

import "@/app/styles/products/products-item.scss";
import { useTranslations } from "next-intl";

const Breakout = () => {
  const t = useTranslations("Products");

  const item = t.raw("product")[0];

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
      </div>
    </section>
  );
};

export default Breakout;
