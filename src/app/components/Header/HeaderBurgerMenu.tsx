"use client";

import React, { useState } from "react";
import { menuItems } from "./items";
import Link from "next/link";

import "./header.scss";
import { usePathname } from "next/navigation";

const HeaderBurgerMenu = () => {
  const path = usePathname();

  const [isActive, setIsActive] = useState(false);

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
            {menuItems.map(({ title, link }, index) => (
              <li key={index} className="header__navigation-item">
                <Link
                  href={link}
                  className={`header__navigation-link ${
                    link === "/" + path.split("/")[1] ? "is-active" : ""
                  }`}
                  onClick={buttonClick}
                >
                  {title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default HeaderBurgerMenu;
