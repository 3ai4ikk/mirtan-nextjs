"use client";

import Image from "next/image";
import React, { useRef, useState } from "react";
import style from "./ImageLoader.module.scss";
import { Download } from "lucide-react";

type Props = {
  onFileSelect: (file: File) => void;
  src?: string;
};

const ImageLoader = ({ onFileSelect, src }: Props) => {
  const ref = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File>();
  const [url, setURL] = useState<string>(src || "");

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setURL(URL.createObjectURL(e.target.files[0]));
      setFile(e.target.files[0]);
      onFileSelect(e.target.files[0]);
    }
  };

  const Input = () => (
    <input
      type="file"
      accept="image/*"
      ref={ref}
      onChange={onChangeHandler}
      hidden
    />
  );

  return (
    <div className="ImageLoader">
      <Input />
      <div className={style.image} onClick={() => ref.current?.click()}>
        <Download className={`${style.image__svg} ${url ? "hidden" : ""}`} />
        {url && (
          <Image
            src={url}
            alt=""
            className={style.image__img}
            width={300}
            height={200}
          />
        )}
      </div>
    </div>
  );
};

export default ImageLoader;
