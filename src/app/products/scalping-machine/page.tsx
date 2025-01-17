import React from "react";

import Slider from "@/components/Slider/SliderProducts";

import "@/components/Slider/SliderProducts";

import { images } from "./images/images";

import "@/products/products-item.scss";
import "@/styles/components/table.scss";

const ScalpingMachine = () => {
  return (
    <section className="products-item section">
      <div className="products-item__inner container">
        <div className="products-item__hero">
          <div className="products-item__main">
            <h1 className="products-item__title">Обоечная машина</h1>
            <div className="products-item__subtitle">
              <p>
                Машина обоечная горизонтальная предназначена для сухой очистки
                поверхности зерновых культур от пыли, частичного отделения
                плодовых оболочек, бородки и зародыша зерна на предприятиях
                мукомольной промышленности.
              </p>
              <table className="table">
                <thead>
                  <tr>
                    <th>Наименование показателя</th>
                    <th>Бичевая</th>
                    <th>Щеточно-бичевая</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>Производительность техническая, т/ч</th>
                    <td>1 - 2</td>
                    <td>1,5 - 2</td>
                  </tr>
                  <tr>
                    <th>Установленная мощность, кВт, не более</th>
                    <td>1,1</td>
                    <td>1,1</td>
                  </tr>
                  <tr>
                    <th>
                      Снижение зольности зерна при однократном пропуске через
                      машину, % (для пшеницы)
                    </th>
                    <td>0,01 ÷ 0,02</td>
                    <td>0,04 ÷ 0,06</td>
                  </tr>
                  <tr>
                    <th>Содержание битого зерна, %, не более (для пшеницы)</th>
                    <td>1,0</td>
                    <td>1,0</td>
                  </tr>
                  <tr>
                    <th>Частота вращения ротора, об/мин, не менее</th>
                    <td>940</td>
                    <td>940</td>
                  </tr>
                  <tr>
                    <th>Масса, кг, не более</th>
                    <td>123,9</td>
                    <td>114</td>
                  </tr>
                  <tr>
                    <th colSpan={3}>Габаритные размеры, мм, не более</th>
                  </tr>
                  <tr>
                    <th>Длина</th>
                    <td>1511</td>
                    <td>1511</td>
                  </tr>
                  <tr>
                    <th>Ширина</th>
                    <td>466</td>
                    <td>466</td>
                  </tr>
                  <tr>
                    <th>Высота</th>
                    <td>618</td>
                    <td>618</td>
                  </tr>
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
