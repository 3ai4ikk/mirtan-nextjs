import Hero from "../../components/Hero/Hero";
import ProductsMain from "../../components/Products/ProductsMain";
import Info from "../../components/Info/Info";
import Contacts from "../../components/Contacts/Contacts";
import {Metadata} from "next";
import {getTranslations} from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Metadata");
  return {
    title: "Mirtan | " + t("Titles.home"),
    description: t("Descriptions.home"),
  };
}

export default async function Home() {
  return (
    <>
      <Hero />
      <ProductsMain />
      <Info />
      <Contacts />
    </>
  );
}
