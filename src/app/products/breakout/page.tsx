import React from "react";

import Slider from "@/components/Slider/SliderProducts";

import "@/components/Slider/SliderProducts";

import { images } from "./images/images";

import "@/products/products-item.scss";

const Breakout = () => {
  return (
    <section className="products-item section">
      <div className="products-item__inner container">
        <div className="products-item__hero">
          <div className="products-item__main">
            <h1 className="products-item__title">Выбойный дозатор</h1>
            <div className="products-item__subtitle">
              <p>
                Дозатор весовой (в дальнейшем дозатор) предназначен для
                дозирования в мешки продуктов с насыпной массой 0,3-0,75 т/м3 и
                влажностью не более 15 %.
              </p>
              <p>
                В состав входит: бункер накопительный 0,25м³, дозирующий шнек,
                программируемый контроллер, тензометрические датчики,
                пневматическая система зажима мешка.
              </p>
            </div>
          </div>
          <Slider images={images} />
        </div>
      </div>
    </section>
  );
};

export default Breakout;
