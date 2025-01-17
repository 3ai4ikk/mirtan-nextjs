import React from "react";

import Slider from "@/components/Slider/SliderProducts";

import "@/components/Slider/SliderProducts";

import { images } from "./images/images";

import "@/products/products-item.scss";
import "@/styles/components/table.scss";

const BeatingMachine = () => {
  return (
    <section className="products-item section">
      <div className="products-item__inner container">
        <div className="products-item__hero">
          <div className="products-item__main">
            <h1 className="products-item__title">Вымольная машина</h1>
            <div className="products-item__subtitle">
              <p>
                Вымольная машина предназначена для отделения частиц ядра от
                оболочек при производстве муки
              </p>
              <div className="products-item__table">
                <table className="table">
                  <tbody>
                    <tr>
                      <th>Производительность, т/час, не менее</th>
                      <td>0,3-0,55</td>
                    </tr>
                    <tr>
                      <th>Зазор между ротором и поверхностью сита, мм</th>
                      <td>10</td>
                    </tr>
                    <tr>
                      <th>Площадь сит, м²</th>
                      <td>0,36</td>
                    </tr>
                    <tr>
                      <th>Частота вращения бичевого ротора, об/мин</th>
                      <td>620</td>
                    </tr>
                    <tr>
                      <th>Мощность электродвигателя, кВт</th>
                      <td>1,1</td>
                    </tr>
                    <tr>
                      <th>Частота вращения электродвигателя, об/мин</th>
                      <td>940</td>
                    </tr>
                    <tr>
                      <th>Срок службы, лет</th>
                      <td>13</td>
                    </tr>
                    <tr>
                      <th>Масса, кг, не более</th>
                      <td>110</td>
                    </tr>
                    <tr>
                      <th colSpan={2}>Габаритные размеры, мм, не более</th>
                    </tr>
                    <tr>
                      <th>Длина</th>
                      <td>1110</td>
                    </tr>
                    <tr>
                      <th>Ширина</th>
                      <td>475</td>
                    </tr>
                    <tr>
                      <th>Высота</th>
                      <td>1030</td>
                    </tr>
                  </tbody>
                </table>
              </div>
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
              Машина состоит из следующих основных узлов: корпуса, корпуса
              выпускного, ротора бичевого, ситового полуцилиндра, воронки,
              клиноременной передачи, привода , ограждения . Корпус, сваренный
              из листового металла, является основой для крепления всех узлов
              обоечной машины. Бичевой ротор состоит из вала, с установленными
              на него бичами. Вал закреплен в самоустанавливающихся подшипниках.
              На консольной части вала установлен приводной шкив. Ситовой
              полуцилиндр состоит из деревянного каркаса и закреплённой к нему
              сетки. Привод ротора осуществляется от электродвигателя через
              клиноременную передачу. Технологический процесс в машине
              осуществляется следующим образом. Продукт через приемный патрубок
              поступает в рабочую зону между ротором и ситовым полуцилиндром,
              затем продвигается гонками в осевом направлении, подвергаясь
              многочисленным ударам и трению. При этом частицы эндосперма
              отделяются от отрубей, проходят через отверстия в сите и выходят
              через выпускной конус из машины. Более крупные отруби выводятся
              сходом ситового полуцилиндра.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BeatingMachine;
