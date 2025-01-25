import { Locale } from "@/i18n/routing";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import React, { startTransition, useState } from "react";
import { routing } from "@/i18n/routing";
import "./header.scss";

const LangSwitcher = ({ isMobile = false }) => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);

  const onSelectChange = (value: Locale) => {
    const newLocale = value;
    const path = pathname.split("/").slice(2).join("/");

    startTransition(() => {
      router.push(`/${newLocale}/${path}`);
    });
  };

  return (
    <div
      className={`header__select ${isMobile ? "mobile" : ""}`}
      onClick={() => setIsOpen(!isOpen)}
    >
      {locale.toUpperCase()}
      <div
        className={`header__options ${isOpen ? "open" : ""} ${
          isMobile ? "mobile" : ""
        }`}
      >
        {routing.locales.map((loc: Locale) => {
          return (
            <span
              key={loc}
              className={`header__option ${locale === loc ? "active" : ""}`}
              onClick={() => onSelectChange(loc)}
            >
              {loc.toUpperCase()}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default LangSwitcher;
