"use client";

import * as React from "react";
import Link from "next/link";

import style from "./Header.module.scss";
import Image from "next/image";
import {cn} from "@/app/lib/utils";
import {useEffect, useState} from "react";
import HeaderLogOut from "@/components/Admin/Header/HeaderLogOut";

export const Header = () => {

  const [isTop, setIsTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsTop(window.scrollY === 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={cn(style.header, style[isTop ? "top" : ""])}>
      <div className={cn(style.header__inner, "container")}>
        <Link href="/admin"><Image
          className={style.logo}
          src="/logo/logo-light.png"
          width={200}
          height={50}
          alt="Mirtan"
        /></Link>
        <HeaderLogOut />
      </div>

    </header>
  );
}