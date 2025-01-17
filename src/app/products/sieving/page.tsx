import React from "react";

import Slider from "@/components/Slider/SliderProducts";

import "@/components/Slider/SliderProducts";

import { images } from "./images/images";

import "@/products/products-item.scss";

const Sieving = () => {
  return (
    <section className="pneumatic-separator products-item section">
      <div className="pneumatic-separator__inner products-item__inner container">
        <div className="pneumatic-separator__hero products-item__hero">
          <div className="pneumatic-separator__main products-item__main">
            <h1 className="pneumatic-separator__title products-item__title">
              Рассев
            </h1>
            <div className="pneumatic-separator__subtitle products-item__subtitle">
              <p>
                Самобалансирующийся 6-приемный рассев веретенного типа
                используется для разделения на ситах продуктов размола. Рассев
                состоит из главной рамы с расположенным на нем балансирным
                механизмом, двух кузовов с ситовыми рамами, верхнего приводного
                механизма, находящегося на перекрытии второго этажа мельницы.
              </p>
              <p>
                Вращение от привода на балансирный механизм передается через
                веретено. Рассев крепится на тросах к станине мельницы. Основной
                функциональной частью рассева являются два кузова, состоящие из
                уложенных друг на друга деревянных рам с натянутыми на них
                горизонтальными ситами. Ситовые кузова совершают в
                горизонтальной плоскости колебательные движения.
              </p>
              <p>
                Продукты измельчения, перемещаясь по ситам рассева, переходят
                сверху вниз с рамы на раму и постепенно просеиваются, разделяясь
                на муку высшего и первого сортов, а также промежуточные фракции.
                Через транспортные коробки рассева мука и отруби подаются в
                бункера выбойного отделения мельницы, а промежуточные фракции
                возвращаются на помол.
              </p>
            </div>
          </div>
          <Slider images={images} />
        </div>
      </div>
    </section>
  );
};

export default Sieving;
