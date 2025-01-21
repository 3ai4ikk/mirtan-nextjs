"use client";

import React, { useState } from "react";
import { getMenuItems } from "./items";
import Link from "next/link";

import "./header.scss";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

const HeaderBurgerMenu = () => {
  const path = usePathname();

  const t = useTranslations("Header");

  const [isActive, setIsActive] = useState(false);

  const languagePrefix = path.split("/")[1];

  const buttonClick = () => {
    setIsActive(!isActive);
    document.documentElement.classList.toggle("is-active");
  };

  return (
    <>
      <div
        className={`header__overlay-close-button ${
          isActive ? "is-active" : ""
        } `}
        onClick={buttonClick}
      >
        <span></span>
      </div>
      <div className={`header__overlay ${isActive ? "is-active" : ""}`}>
        <nav className="header__overlay-nav">
          <ul className="header__overlay-list">
            {getMenuItems(t).map(({ title, link }, index) => {
              const fullLink = `/${languagePrefix}${link}`;
              const isActive =
                (link === "/" && path === `/${languagePrefix}`) ||
                path === fullLink ||
                path.startsWith(fullLink + "/");
              return (
                <li key={index} className="header__navigation-item">
                  <Link
                    href={link}
                    className={`header__navigation-link ${
                      isActive ? "is-active" : ""
                    }`}
                    onClick={buttonClick}
                  >
                    {title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default HeaderBurgerMenu;
