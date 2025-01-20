import React from "react";

import Slider from "@/components/Slider/SliderProducts";

import "@/components/Slider/SliderProducts";

import { images } from "./images/images";

import "@/styles/products/products-item.scss";
import "@/styles/components/table.scss";
import { useTranslations } from "next-intl";

const ScalpingMachine = () => {
  const t = useTranslations("Products");

  const item = t.raw("product")[6];

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
                <thead>
                  <tr>
                    {item.table.headers.map((header: string, index: number) => (
                      <th key={index}>{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {item.table.rows.map(
                    ({ th = "", td = [] }, index: number) => {
                      return (
                        <tr key={index}>
                          {td.length > 0 ? (
                            <th>{th}</th>
                          ) : (
                            <th colSpan={3}>{th}</th>
                          )}
                          {td.length > 0 ? <td>{td[0]}</td> : null}
                          {td.length > 0 ? <td>{td[1]}</td> : null}
                        </tr>
                      );
                    }
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <Slider images={images} />
        </div>
      </div>
    </section>
  );
};

export default ScalpingMachine;
