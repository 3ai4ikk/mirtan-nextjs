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
  // const [isPending, startTransition] = useTransition();
  // const [isOpen, setIsOpen] = useState(false);
  // const [selectedOption, setSelectedOption] = useState(useLocale());
  const path = usePathname();
  // const router = useRouter();

  const t = useTranslations("Header");
  // const locale = useLocale();

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

  // const handleChangeLang = () => {
  //   const pathLocal = path.split("/").slice(2).join("/");
  //   startTransition(() => {
  //     router.replace(`/${locale}/${pathLocal}`);
  //   });
  // };

  // const toggleDropdown = () => setIsOpen(!isOpen);

  // const handleOptionClick = (value: string) => {
  //   setSelectedOption(value);
  //   setRequestLocale(value);
  //   setIsOpen(false);
  //   handleChangeLang();
  // };

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
            {/* <div
              className={`header__select ${isPending && "pending"}`}
              onClick={toggleDropdown}
            >
              {selectedOption.toUpperCase()}
              <div className={`header__options ${isOpen ? "open" : ""}`}>
                <span
                  className={`header__option ${
                    selectedOption === "tr" ? "active" : ""
                  }`}
                  onClick={() => handleOptionClick("tr")}
                >
                  TR
                </span>
                <span
                  className={`header__option ${
                    selectedOption === "en" ? "active" : ""
                  }`}
                  onClick={() => handleOptionClick("en")}
                >
                  EN
                </span>
                <span
                  className={`header__option ${
                    selectedOption === "ru" ? "active" : ""
                  }`}
                  onClick={() => handleOptionClick("ru")}
                >
                  RU
                </span>
              </div>
            </div> */}
          </nav>
        )}
        {isMobile && <HeaderBurgerMenu />}
      </div>
    </header>
  );
};

export default Header;
