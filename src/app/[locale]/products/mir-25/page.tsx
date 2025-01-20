import React from "react";
import Slider from "@/components/Slider/SliderProducts";
import { images } from "./images/images";
import { useTranslations } from "next-intl";

import "@/components/Slider/SliderProducts";

import "@/styles/products/products-item.scss";
import "@/styles/components/table.scss";

const Mir20 = () => {
  const t = useTranslations("Products");

  const item = t.raw("product")[14];

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
              <table className="table">
                <tbody>
                  {item.table.map(({ th = "", td = "" }, index: number) => (
                    <tr key={index}>
                      {td ? <th>{th}</th> : <th colSpan={2}>{th}</th>}
                      {td ? <td>{td}</td> : null}
                    </tr>
                  ))}
                </tbody>
              </table>
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
            <p>{item.text[3]}</p>
            <span>{item.span[1]}</span>
            <ul>
              {item.li[1].map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            {item.text.slice(4, 12).map((item: string, index: number) => (
              <p key={index}>{item}</p>
            ))}
            <span>{item.span[2]}</span>
            <ul>
              {item.li[2].map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            {item.text
              .slice(12, item.length)
              .map((item: string, index: number) => (
                <p key={index}>{item}</p>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mir20;
