import { useTranslations } from "next-intl";

type TranslationFunction = ReturnType<typeof useTranslations>;

export const getProductsItems = (t: TranslationFunction) => {
  const product = t.raw("product");

  return [
    {
      title: product[5].title,
      link: "/products/mill",
      imageUrl: "/images/products/6.jpg",
      description: product[5].description,
    },
    {
      title: product[2].title,
      link: "/products/millstone-mill",
      imageUrl: "/images/products/3.jpg",
      description: product[2].description,
    },
    {
      title: product[0].title,
      link: "/products/breakout",
      imageUrl: "/images/products/1.jpg",
      description: product[0].description,
    },
    {
      title: product[1].title,
      link: "/products/beating-machine",
      imageUrl: "/images/products/2.jpg",
      description: product[1].description,
    },
    {
      title: product[3].title,
      link: "/products/grain-separator",
      imageUrl: "/images/products/4.jpg",
      description: product[3].description,
    },
    {
      title: product[4].title,
      link: "/products/stone-picker",
      imageUrl: "/images/products/5.jpg",
      description: product[4].description,
    },
    {
      title: product[6].title,
      link: "/products/scalping-machine",
      imageUrl: "/images/products/7.jpg",
      description: product[6].description,
    },
    {
      title: product[7].title,
      link: "/products/pneumatic-separator",
      imageUrl: "/images/products/8.jpg",
      description: product[7].description,
    },
    {
      title: product[8].title,
      link: "/products/sieving",
      imageUrl: "/images/products/9.jpg",
      description: product[8].description,
    },
    {
      title: product[9].title,
      link: "/products/purifier",
      imageUrl: "/images/products/10.jpg",
      description: product[9].description,
    },
    {
      title: product[10].title,
      link: "/products/rolling-mill",
      imageUrl: "/images/products/11.jpg",
      description: product[10].description,
    },
    {
      title: product[11].title,
      link: "/products/brush-machine",
      imageUrl: "/images/products/12.jpg",
      description: product[11].description,
    },
    {
      title: product[12].title,
      link: "/products/mir-15",
      imageUrl: "/images/products/13.jpg",
      description: product[12].description,
    },
    {
      title: product[13].title,
      link: "/products/mir-20",
      imageUrl: "/images/products/14.jpg",
      description: product[13].description,
    },
    {
      title: product[14].title,
      link: "/products/mir-25",
      imageUrl: "/images/products/15.jpg",
      description: product[14].description,
    },
    {
      title: product[15].title,
      link: "/products/automat",
      imageUrl: "/images/products/16.jpg",
      description: product[15].description,
    },
  ];
};
