import React from "react";

import "./about.scss";
import { useTranslations } from "next-intl";

const About = () => {
  const t = useTranslations("AboutPage");

  const paragraphs = t.raw("subtitle");

  return (
    <section className="about section">
      <div className="about__inner container">
        <h1 className="about__title">{t("title")}</h1>
        <div className="about__info">
          {paragraphs.map((info: string, index: number) => (
            <p key={index}>{info}</p>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
