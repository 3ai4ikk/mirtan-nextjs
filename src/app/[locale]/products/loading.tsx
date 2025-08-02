import * as React from "react";

import "@/app/[locale]/products/products.scss";
import "@/app/styles/admin.scss";

const Loading = () => {
  return (
    <section className="products__inner container section">
      <h1 className="products__title">Комплектные мельницы</h1>
      <div className="products__body">
        <div className="products__list">
          <div className="admin__loading-item"></div>
          <div className="admin__loading-item"></div>
          <div className="admin__loading-item"></div>
          <div className="admin__loading-item"></div>
          <div className="admin__loading-item"></div>
          <div className="admin__loading-item"></div>
        </div>
      </div>

      <h1 className="products__title">Наши товары</h1>
      <div className="products__body">
        <div className="products__list">
          <div className="admin__loading-item"></div>
          <div className="admin__loading-item"></div>
          <div className="admin__loading-item"></div>
          <div className="admin__loading-item"></div>
          <div className="admin__loading-item"></div>
          <div className="admin__loading-item"></div>
        </div>
      </div>

      <h1 className="products__title">Автоматизация</h1>
      <div className="products__body">
        <div className="products__list">
          <div className="admin__loading-item"></div>
          <div className="admin__loading-item"></div>
          <div className="admin__loading-item"></div>
          <div className="admin__loading-item"></div>
          <div className="admin__loading-item"></div>
          <div className="admin__loading-item"></div>
        </div>
      </div>
    </section>
  );
}

export default Loading;