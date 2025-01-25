import React from "react";
import Image from "next/image";
import image from "./images/1.jpg";
import { useTranslations } from "next-intl";

import "../../../../components/Slider/SliderProducts";

import "@/app/styles/products/products-item.scss";
import "@/app/styles/components/table.scss";

const Automat = () => {
  const t = useTranslations("Products");

  const item = t.raw("product")[15];

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
          <div className="products-item__right">
            <div className="products-item__right-elements">
              <span>{item.img[0]}</span>
              <span>{item.img[1]}</span>
            </div>
            <Image
              className="products-item__right-elements-img"
              src={image}
              width={450}
              height={270}
              alt=""
            />
          </div>
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
            {item.text
              .slice(2, item.length)
              .map((item: string, index: number) => (
                <p key={index}>{item}</p>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Automat;
