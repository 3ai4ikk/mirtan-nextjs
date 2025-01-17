import React from "react";

import Slider from "@/components/Slider/SliderProducts";

import "@/components/Slider/SliderProducts";

import { images } from "./images/images";

import "@/products/products-item.scss";

import "./pneumatic-separator.scss";

const PneumaticSeparator = () => {
  return (
    <section className="pneumatic-separator products-item section">
      <div className="pneumatic-separator__inner products-item__inner container">
        <div className="pneumatic-separator__hero products-item__hero">
          <div className="pneumatic-separator__main products-item__main">
            <h1 className="pneumatic-separator__title products-item__title">
              Пневматический сепаратор
            </h1>
            <div className="pneumatic-separator__subtitle products-item__subtitle">
              <p>
                Предназначен для очистки зерна от примесей, отличающихся от него
                аэродинамическими свойствами. Пневмосепаратор представляет собой
                сварной короб, разделенный перегородками на ряд камер. Зерно
                через приемный патрубок вместе с транспортирующим его воздухом
                попадает в осадочную камеру пневматического сепаратора. Под
                действием собственного веса зерно открывает заслонку и
                просыпается тонким слоем в пневмосепарирующий канал, где
                продувается воздухом.
              </p>
              <p>
                В результате этого от него отделяются легкие примеси, которые
                воздушным потоком выводятся из машины в циклон-пылеосадитель.
                Скорость воздуха и интенсивность продувки зерна регулируются
                подвижной стенкой, позволяющей менять поперечное сечение канала.
                Очищенное зерно выводится из пневмосепаратора через шлюзовый
                затвор.
              </p>
            </div>
          </div>
          <Slider images={images} />
        </div>
      </div>
    </section>
  );
};

export default PneumaticSeparator;
