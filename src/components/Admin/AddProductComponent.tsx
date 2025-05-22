import React from "react";

import "@/components/Products/products.scss";
import style from "./add.module.scss";
import Link from "next/link";

const AddProductComponent = () => {
  return (
    <div className={`products__card ${style.add}`}>
      <Link href={"/admin/add"} className={style.add__square}></Link>
    </div>
  );
};

export default AddProductComponent;
