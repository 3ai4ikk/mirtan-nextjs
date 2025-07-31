import React from "react";

import "./about.scss";
import {useTranslations} from "next-intl";
import {Metadata} from "next";
import {getTranslations} from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Metadata");
  return {
    title: "Mirtan | " + t("Titles.about"),
    description: t("Descriptions.about"),
  };
}

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
