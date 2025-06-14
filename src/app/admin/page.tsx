import React from "react";
import prisma from "../lib/prismaClient";

import "@/app/[locale]/products/products.scss";
import ProductAdmin from "@/components/Products/ProductAdmin";
import AddProductComponent from "@/components/Admin/AddProductComponent";

const AdminPage = async () => {
  const products = await prisma.product.findMany({
    include: { content: true },
  });

  return (
    <section className="products section">
      <div className="products__inner container">
        <h1 className="products__title">Наши товары</h1>
        <div className="products__body">
          <div className="products__list">
            <AddProductComponent />
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
      </div>
    </section>
  );
};

export default AdminPage;
