import React from "react";

import Slider from "@/components/Slider/SliderProducts";

import "@/components/Slider/SliderProducts";

import { images } from "./images/images";

import "@/styles/products/products-item.scss";
import "@/styles/components/table.scss";
import { useTranslations } from "next-intl";

const BrushMachine = () => {
  const t = useTranslations("Products");

  const item = t.raw("product")[11];

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
              <div className="products-item__table">
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
          </div>
          <Slider images={images} />
        </div>
      </div>
    </section>
  );
};

export default BrushMachine;
