"use client";

import React, { useRef, useState, useMemo } from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type SwiperCore from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import style from "./swiper.module.scss";
import ImageLoader from "../ImageLoader/ImageLoader";
import { Trash2 } from "lucide-react";

type Props = {
  images?: (string | File)[];
  onFileSelected: (images: (string | File)[]) => void;
};

const getUniqueKey = (img: string | File) => {
  if (typeof img === "string") return img;
  // Use file.name + file.lastModified for File objects
  return img.name + "_" + img.lastModified;
};

const SwiperLoader: React.FC<Props> = ({
  images = [],
  onFileSelected,
}: Props) => {
  const addInputRef = useRef<HTMLInputElement>(null);
  const swiperRef = useRef<SwiperCore | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const [imageList, setImageList] = useState<(string | File)[]>(images);

  // Cache unique keys for images
  const slideKeys = useMemo(() => images.map(getUniqueKey), [images]);

  // Add new images to gallery (appends to end of array)
  const handleAddImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      onFileSelected([...images, ...files]);
      setImageList([...images, ...files]);
    }
  };

  // Replace single image at a specific index
  const handleReplaceImage = (file: File, idx: number) => {
    const newImages = [...images];
    newImages[idx] = file;
    onFileSelected(newImages);
    setImageList(newImages);
  };

  // Remove active image with visual sync
  const handleDeleteCurrent = () => {
    if (images.length === 0) return;
    const newImages = [...images];
    newImages.splice(activeIndex, 1);

    // Подбираем следующий правильный активный индекс:
    let newActiveIndex = activeIndex;
    if (activeIndex >= newImages.length) {
      newActiveIndex = newImages.length - 1; // Если удалён последний
    }
    if (newActiveIndex < 0) newActiveIndex = 0;

    onFileSelected(newImages);
    setImageList(newImages);

    // Ждём когда Swiper перерендерится, затем скроллим на нужный индекс
    setTimeout(() => {
      if (swiperRef.current && newImages.length > 0) {
        swiperRef.current.slideTo(newActiveIndex, 0);
        setActiveIndex(newActiveIndex);
      }
    }, 0);
  };

  // Preview URL logic
  const getImageSrc = (image: string | File) => {
    if (typeof image === "string") return image;
    return URL.createObjectURL(image);
  };

  return (
    <div className="SwiperLoader">
      <input
        type="file"
        accept="image/*"
        multiple
        ref={addInputRef}
        hidden
        onChange={handleAddImages}
      />
      <div className={style.image}>
        {/* If no images, show big "add" button */}

        <Swiper
          className={style.slider}
          modules={[Navigation]}
          slidesPerView={1}
          navigation
          speed={800}
          wrapperClass={style.slider__wrapper}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
            setActiveIndex(swiper.realIndex);
          }}
          onActiveIndexChange={(swiper) => {
            setActiveIndex(swiper.realIndex);
          }}
        >
          {imageList.map((img, idx) => (
            <SwiperSlide
              key={slideKeys[idx] || idx}
              className={style.slider__slide}
            >
              <div style={{ position: "relative" }}>
                {/* ImageLoader for replacing */}
                <ImageLoader
                  src={getImageSrc(img)}
                  onFileSelect={(file) => {
                    handleReplaceImage(file, idx);
                    setImageList((prev) => [...prev, file]);
                  }}
                />
                {/* Delete button — only show for active slide */}
                {activeIndex === idx && (
                  <div
                    className={style.deleteBtn}
                    style={{
                      position: "absolute",
                      top: 8,
                      right: 8,
                      background: "rgba(255,255,255,0.7)",
                      border: "none",
                      borderRadius: "50%",
                      cursor: "pointer",
                      zIndex: 40,
                    }}
                    onClick={handleDeleteCurrent}
                  >
                    <Trash2 size={24} color="#e3342f" />
                  </div>
                )}
              </div>
            </SwiperSlide>
          ))}
          {/* Slide to add new images */}
          <SwiperSlide className={style.slider__slide}>
            <p
              style={{ cursor: "pointer", userSelect: "none" }}
              onClick={() => addInputRef.current?.click()}
            >
              + Добавить изображения
            </p>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default SwiperLoader;
