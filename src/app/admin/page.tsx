import React from "react";
import prisma from "../lib/prismaClient";

import "@/app/[locale]/products/products.scss";
import ProductAdmin from "@/components/Products/ProductAdmin";
import AddProductComponent from "@/components/Admin/AddProductComponent";

const AdminPage = async () => {
  const products = await prisma.product.findMany();

  return (
    <section className="products section">
      <div className="products__inner container">
        <h1 className="products__title">Наши товары</h1>
        <div className="products__body">
          <div className="products__list">
            <AddProductComponent />
            {products.map((product) => (
              <ProductAdmin
                key={product.id}
                description={product.description}
                title={product.title}
                link={`/admin/products/${product.link}`}
                imageUrl={product.preview}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminPage;
