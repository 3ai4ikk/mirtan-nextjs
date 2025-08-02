import * as React from "react";

import "@/app/[locale]/products/products.scss";
import "@/app/styles/admin.scss";
import {getTranslations} from "next-intl/server";

const Loading = async () => {

  const t = await getTranslations("Products");

  const productsTitles = t.raw("title");

  return (
    <section className="products__inner container section admin__title">
      <h1 className="products__title">{productsTitles[1]}</h1>
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

      <h1 className="products__title">{productsTitles[0]}</h1>
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

      <h1 className="products__title">{productsTitles[2]}</h1>
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