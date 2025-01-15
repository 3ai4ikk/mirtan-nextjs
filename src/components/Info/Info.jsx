import React from "react";
import Slider from "../Slider/SliderMain";

import "./info.scss";

const Info = () => {
  return (
    <section className="info section">
      <h2 className="info__title">Иллюстрации</h2>
      <Slider />
    </section>
  );
};

export default Info;
