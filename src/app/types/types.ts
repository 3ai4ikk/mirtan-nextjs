import { Locale } from "@/i18n/routing";

export type Product = {
  id: number;
  link: string;
  title?: string;
  description?: string;
  preview?: string;
  images?: string[];
  subbody?: string;
  body?: string;
  table: string;
  subBodyJSON: object;
  bodyJSON: object;
  tableJSON: object;
};

export type Content = {
  [key in Locale]?: {
    value: string | string[][] | FormData | object | boolean;
  };
};
