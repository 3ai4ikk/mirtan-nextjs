"use client";

import Image from "next/image";
import React, { useRef, useState } from "react";
import style from "./ImageLoader.module.scss";
import { Download } from "lucide-react";

type Props = {
  onFileSelect?: (file: File) => void;
  onImageReplace?: (file: File, index: number) => void;
  src?: string;
  index?: number;
  allowReplace?: boolean;
};

const ImageLoader = ({
  onFileSelect,
  onImageReplace,
  src,
  index,
  allowReplace = false,
}: Props) => {
  const ref = useRef<HTMLInputElement>(null);
  const [url, setURL] = useState<string>(src || "");

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setURL(URL.createObjectURL(file));

      // If this is an image replacement in a parent component
      if (allowReplace && onImageReplace && index !== undefined) {
        onImageReplace(file, index);
      }
      // If this is a regular file selection (e.g., for preview)
      else if (onFileSelect) {
        onFileSelect(file);
      }
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
