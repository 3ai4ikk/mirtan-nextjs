"use client";

import React, { useRef, useState } from "react";

import { Navigation } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import style from "./swiper.module.scss";
import ImageLoader from "../ImageLoader/ImageLoader";
import { Download } from "lucide-react";

type Props = {
  onFileSelected: (file: File | File[]) => void;
  images?: string | string[];
};

const SwiperLoader = ({ onFileSelected, images }: Props) => {
  const ref = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File | File[]>([]);
  const [urls, setUrls] = useState<string | string[]>(images || []);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setFiles(files);
      setUrls(files.map((file) => URL.createObjectURL(file)));
      onFileSelected(files);
    }
  };

  const onClickHandler = () => {
    if (urls.length == 0) ref.current?.click();
  };

  const handleFileUpdate = (file: File | null, index: number) => {
    const newFiles = Array.isArray(files) ? [...files] : [];

    if (file) {
      newFiles[index] = file;
    } else {
      newFiles.splice(index, 1);
    }

    setFiles([...newFiles]);
    onFileSelected([...newFiles]);
  };

  const SwiperInput = () => (
    <input
      type="file"
      accept="image/*"
      ref={ref}
      onChange={onChangeHandler}
      multiple
      hidden
    />
  );

  return (
    <div className="SwiperLoader">
      <SwiperInput />
      <div className={style.image}>
        <Download
          onClick={onClickHandler}
          className={`${style.image__svg} ${urls.length === 0 ? "" : "hidden"}`}
        />
        {urls.length === 1 && (
          <ImageLoader
            src={urls[0]}
            onFileSelect={(file) => {
              setFiles(file);
              onFileSelected(file);
            }}
          />
        )}
        {urls.length > 1 && (
          <Swiper
            className={style.slider}
            modules={[Navigation]}
            slidesPerView={1}
            slideClass={style.slider__slide}
            wrapperClass={style.slider__wrapper}
            speed={1300}
            navigation
            loop
          >
            {[...urls].map((src, index) => {
              return (
                <SwiperSlide key={index} className={style.slider__slide}>
                  <ImageLoader
                    src={src}
                    onFileSelect={(file) => {
                      handleFileUpdate(file, index);
                    }}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        )}
      </div>
    </div>
  );
};

export default SwiperLoader;
