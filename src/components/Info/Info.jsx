import React from "react";
import Slider from "../Slider/SliderMain";

import "./info.scss";
import { useTranslations } from "next-intl";

const Info = () => {
  const t = useTranslations("Info");

  return (
    <section className="info section">
      <h2 className="info__title">{t("title")}</h2>
      <Slider />
    </section>
  );
};

export default Info;
