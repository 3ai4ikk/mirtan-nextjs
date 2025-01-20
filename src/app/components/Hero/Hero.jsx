import React from "react";
import "./hero.scss";

import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";

const Hero = () => {
  const t = useTranslations("Hero");

  return (
    <section className="hero section">
      <div className="hero__inner container">
        <div className="hero__body">
          <h1 className="hero__title">{t.rich("title")}</h1>
          <h2 className="hero__title2">{t.rich("title2")}</h2>
          <p className="hero__subtitle">{t.rich("subtitle")}</p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
