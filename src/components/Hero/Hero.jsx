import React from "react";
import "./hero.scss";

const Hero = () => {
  return (
    <section className="hero section">
      <div className="hero__inner container">
        <div className="hero__body">
          <h1 className="hero__title">
            НАША МИССИЯ ЗАКЛЮЧАЕТСЯ В ТОМ, ЧТОБЫ ПОМОЧЬ НАШИМ КЛИЕНТАМ РАСТИ
          </h1>
          <p className="hero__subtitle">
            Наша компания производит комплектные вальцевые мельницы и
            оборудование для переработки круп, пшеничной и гороховой крупы,
            овсяной и кукурузной крупы и зерновых хлопьев. А также производство
            рисовой муки и муки из нута. Индивидуально под заказчика мы
            разработаем и внедрим новые технологии, укомплектуем модернизируем
            современным оборудованием предприятия по переработке зерновых
            культур и комбикормов.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
