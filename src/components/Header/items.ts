import { useTranslations } from "next-intl";

type TranslationFunction = ReturnType<typeof useTranslations>;
export const getMenuItems = (t: TranslationFunction) => {
  return [
    { title: t.rich("main"), link: "/" },
    { title: t.rich("products"), link: "/products" },
    { title: t.rich("about"), link: "/about" },
    { title: t.rich("contacts"), link: "/contacts" },
  ];
};
