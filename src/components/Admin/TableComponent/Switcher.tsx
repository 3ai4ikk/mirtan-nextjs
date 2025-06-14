"use client";

import React from "react";

import style from "./switcher.module.scss";
import { cn } from "@/app/lib/utils";

type Props = {
  initialValue?: boolean;
  onChange: (value: boolean) => void;
};

const Switcher = ({ onChange, initialValue }: Props) => {
  return (
    <div
      className={cn(style.switcher, initialValue ? style.true : "")}
      onClick={() => onChange(!initialValue)}
    ></div>
  );
};

export default Switcher;
