import React from "react";

import Slider from "@/components/Slider/SliderProducts";

import "@/components/Slider/SliderProducts";

import { images } from "./images/images";

import "@/products/products-item.scss";
import "@/styles/components/table.scss";

const RollingMill = () => {
  return (
    <section className="products-item section">
      <div className="products-item__inner container">
        <div className="products-item__hero">
          <div className="products-item__main">
            <h1 className="products-item__title">Вальцевый станок</h1>
            <div className="products-item__subtitle">
              <p>
                Вальцовый станок предназначен для измельчения зерна и
                промежуточных продуктов размола в процессах производства круп,
                комбикормов и муки - классической пшеничной, цельнозерновой,
                безглютеновой и т. д.
              </p>
              <table className="table">
                <tbody>
                  <tr>
                    <th>Номинальная длина бочки вальца, мм</th>
                    <td>250 / 320 / 400</td>
                  </tr>
                  <tr>
                    <th>
                      Техническая производительность станка на I драной системе
                      сортового помола пшеницы, т/сутки, не менее
                    </th>
                    <td>21 / 27 / 33,6</td>
                  </tr>
                  <tr>
                    <th>
                      Наибольшая установленная мощность электродвигателя привода
                      одного станка, кВт
                    </th>
                    <td>7,5</td>
                  </tr>
                  <tr>
                    <th colSpan={2}>
                      Частота вращения быстровращающегося вальца, с-1 (об/мин)
                    </th>
                  </tr>
                  <tr>
                    <th>для рифленых вальцов</th>
                    <td>7-7,8 (420-470)</td>
                  </tr>
                  <tr>
                    <th>для гладких вальцов</th>
                    <td>6,6-6,9(395-415)</td>
                  </tr>
                  <tr>
                    <th colSpan={2}>
                      Габаритные размеры станка в смонтированном состоянии, мм,
                      не более:
                    </th>
                  </tr>
                  <tr>
                    <th>длина (глубина)</th>
                    <td>805</td>
                  </tr>
                  <tr>
                    <th>ширина (без электропривода и межвалковой передачи)</th>
                    <td>280 / 650 / 730</td>
                  </tr>
                  <tr>
                    <th>Высота</th>
                    <td>952</td>
                  </tr>
                  <tr>
                    <th>
                      Масса станка (без электропривода и других неприсоединяемых
                      к станку деталей), кг, не более
                    </th>
                    <td>358 / 401,5 / 445</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <Slider images={images} />
        </div>
        <div className="products-item__info">
          <h3 className="products-item__info-title">
            Дополнительная информация
          </h3>
          <div className="products-item__info-text">
            <p>
              Вальцовый станок состоит из следующих основных частей: сварной
              станины, двух пар мелющих вальцов, межвальцовой передачи (в
              зависимости от варианта использования), устройства привала
              вальцов, устройства подачи исходного продукта, устройства
              автоматической регулировки подачи (опционно), очистителей вальцов,
              горловины
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RollingMill;
