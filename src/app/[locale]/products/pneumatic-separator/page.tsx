import React from "react";

import Slider from "../../../../components/Slider/SliderProducts";

import "../../../../components/Slider/SliderProducts";

import { images } from "./images/images";

import "@/app/styles/products/products-item.scss";

import "./pneumatic-separator.scss";
import { useTranslations } from "next-intl";

const PneumaticSeparator = () => {
  const t = useTranslations("Products");

  const item = t.raw("product")[7];

  return (
    <section className="pneumatic-separator products-item section">
      <div className="pneumatic-separator__inner products-item__inner container">
        <div className="pneumatic-separator__hero products-item__hero">
          <div className="pneumatic-separator__main products-item__main">
            <h1 className="pneumatic-separator__title products-item__title">
              {item.title}
            </h1>
            <div className="pneumatic-separator__subtitle products-item__subtitle">
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

export default PneumaticSeparator;
