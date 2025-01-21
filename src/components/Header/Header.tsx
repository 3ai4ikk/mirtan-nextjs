"use client";

import { useEffect, useState } from "react";
import "./header.scss";
import Link from "next/link";
import { getMenuItems } from "./items";
import HeaderBurgerMenu from "./HeaderBurgerMenu";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

const Header = () => {
  const [isClient, setIsClient] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const path = usePathname();

  const t = useTranslations("Header");

  useEffect(() => {
    setIsClient(true);
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (!isClient) return;

  const languagePrefix = path.split("/")[1];

  return (
    <header
      className={`header ${isScrolled ? "scroll" : ""} 
    ${path.split("/").length > 2 ? "header--bg-light-brown" : ""}`}
    >
      <div className="header__inner container">
        <div className="header__logo">
          <Link href="/" className="header__logo-link"></Link>
        </div>

        {!isMobile && (
          <nav className="header__menu ">
            <ul className="header__list">
              {getMenuItems(t).map(({ title, link }, index) => {
                const fullLink = `/${languagePrefix}${link}`;
                const isActive =
                  (link === "/" && path === `/${languagePrefix}`) ||
                  path === fullLink ||
                  path.startsWith(fullLink + "/");
                return (
                  <li key={index} className="header__item">
                    <Link
                      className={`header__link ${isActive ? "is-active" : ""}`}
                      href={link}
                    >
                      {title}
                    </Link>
                  </li>
                );
              })}
            </ul>
            {/* <LangSwitcher /> */}
          </nav>
        )}
        {isMobile && <HeaderBurgerMenu />}
      </div>
    </header>
  );
};

export default Header;
