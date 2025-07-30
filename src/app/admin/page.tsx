import React from "react";
import prisma from "../lib/prismaClient";

import "@/app/[locale]/products/products.scss";
import "@/app/styles/admin.scss";

import ProductAdmin from "@/components/Products/ProductAdmin";
import AddProductComponent from "@/components/Admin/AddProductComponent";
import {Category} from "../lib/utils";

const AdminPage = async () => {
  const products = await prisma.product.findMany({
    include: {content: true},
  }).then(value => value.sort((a, b) => a.id - b.id));

  const mills = products.filter(
    (item) => item.category === Category.CompleteMills
  ).sort((a, b) => a.id - b.id);

  const automation = products.filter(
    (item) => item.category === Category.IndustrialAutomation
  ).sort((a, b) => a.id - b.id);

  return (
    <section className="products section container admin">
      <AddProductComponent />
      <div className="products__inner container">
        <h1 className="products__title">Мельницы</h1>
        <div className="products__body">
          <div className="products__list">
            {mills.map((product) => {
              const productLang = product.content.find(
                (item) => item.lang === "ru"
              );
              return (
                <ProductAdmin
                  key={product.id}
                  description={productLang?.description as string}
                  title={productLang?.title as string}
                  link={`/admin/products/${product.link}`}
                  imageUrl={product.preview}
                />
              );
            })}
          </div>
        </div>

        <h1 className="products__title">Наши товары</h1>
        <div className="products__body">
          <div className="products__list">
            {products.map((product) => {
              const productLang = product.content.find(
                (item) => item.lang === "ru"
              );
              return (
                <ProductAdmin
                  key={product.id}
                  description={productLang?.description as string}
                  title={productLang?.title as string}
                  link={`/admin/products/${product.link}`}
                  imageUrl={product.preview}
                />
              );
            })}
          </div>
        </div>

        <h1 className="products__title">Промышленная автоматизация</h1>
        <div className="products__body">
          <div className="products__list">
            {automation.map((product) => {
              const productLang = product.content.find(
                (item) => item.lang === "ru"
              );
              return (
                <ProductAdmin
                  key={product.id}
                  description={productLang?.description as string}
                  title={productLang?.title as string}
                  link={`/admin/products/${product.link}`}
                  imageUrl={product.preview}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminPage;
