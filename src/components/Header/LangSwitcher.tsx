import React from "react";
import LocaleSwitcher from "../LocaleSwitcher";

const LangSwitcher = () => {
  // const locale = useLocale();
  // const router = useRouter();
  // const pathname = usePathname();

  // const [isOpen, setIsOpen] = useState(false);

  // const [selectedLocale, setSelectedLocale] = useState(locale);
  // const [isPending, startTransition] = useTransition();

  // useEffect(() => {
  //   const currentLocale = pathname.split("/")[1] as Locale;
  //   setSelectedLocale(currentLocale);
  // }, [pathname]);

  // const onSelectChange = (value: Locale) => {
  //   const newValue = value as Locale;
  //   setSelectedLocale(value);

  //   startTransition(() => {
  //     // Replace the locale in the current path
  //     const pathParts = pathname.split("/");
  //     pathParts[1] = newValue; // Update the locale part
  //     const newPath = pathParts.join("/");
  //     router.push(newPath);
  //   });
  // };

  return <LocaleSwitcher />;
  // (
  //   <div
  //     className={`header__select ${isPending && "pending"}`}
  //     onClick={() => setIsOpen(!isOpen)}
  //   >
  //     {locale.toUpperCase()}
  //     <div className={`header__options ${isOpen ? "open" : ""}`}>
  //       <span
  //         className={`header__option ${
  //           selectedLocale === "tr" ? "active" : ""
  //         }`}
  //         onClick={() => onSelectChange("tr")}
  //       >
  //         TR
  //       </span>
  //       <span
  //         className={`header__option ${
  //           selectedLocale === "en" ? "active" : ""
  //         }`}
  //         onClick={() => onSelectChange("en")}
  //       >
  //         EN
  //       </span>
  //       <span
  //         className={`header__option ${
  //           selectedLocale === "ru" ? "active" : ""
  //         }`}
  //         onClick={() => onSelectChange("ru")}
  //       >
  //         RU
  //       </span>
  //     </div>
  //   </div>
  // );
};

export default LangSwitcher;
