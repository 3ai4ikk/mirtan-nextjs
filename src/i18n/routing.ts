import { createNavigation } from "next-intl/navigation";
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["tr", "en", "ru"],
  defaultLocale: "tr",
  pathnames: {
    "/": "/",
    "/pathnames": {
      tr: "/pathnames",
      en: "/pathnames",
      ru: "/pathnames",
    },
  },
});

export type Pathnames = keyof typeof routing.pathnames;
export type Locale = (typeof routing.locales)[number];

export const { Link, getPathname, redirect, usePathname, useRouter } =
  createNavigation(routing);
