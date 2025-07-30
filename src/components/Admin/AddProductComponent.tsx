import React from "react";

import style from "./add.module.scss";
import Link from "next/link";

const AddProductComponent = () => {
  return (
    <div className={style.box}>
      <h4>Добавить новый товар</h4>
      <Link
        href="/admin/add"
        className={style.button}
      ></Link>
    </div>
  );
};

export default AddProductComponent;
