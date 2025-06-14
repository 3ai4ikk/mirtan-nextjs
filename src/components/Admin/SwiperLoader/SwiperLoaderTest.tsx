import React, { useRef, useState, useEffect } from "react";

import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import style from "./swiper.module.scss";
import ImageLoader from "../ImageLoader/ImageLoader";
import { Trash2 } from "lucide-react";

// Types for tracking image changes
export type ImageChange = {
  type: "add" | "delete" | "replace";
  index?: number;
  oldUrl?: string;
  newFile?: File;
};

export type ImageItem = {
  id: string;
  url: string;
  isNew: boolean;
  file?: File;
  isDeleted: boolean;
};

type Props = {
  images?: string[];
  onChanges: (changes: ImageChange[], currentImages: ImageItem[]) => void;
};

const SwiperLoaderTest = ({ images, onChanges }: Props) => {
  const input = useRef<HTMLInputElement>(null);

  // Initialize state with existing images
  const [imageItems, setImageItems] = useState<ImageItem[]>(() => {
    return (images ?? []).map((url, index) => ({
      id: `existing-${index}`,
      url,
      isNew: false,
      isDeleted: false,
    }));
  });

  const [changes, setChanges] = useState<ImageChange[]>([]);

  // Update parent component when changes occur
  useEffect(() => {
    onChanges(changes, imageItems);
  }, [changes, imageItems, onChanges]);

  const handleAddImages = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const files = Array.from(event.target.files);

    if (files.length > 0) {
      const newItems: ImageItem[] = files.map((file, index) => ({
        id: `new-${Date.now()}-${index}`,
        url: URL.createObjectURL(file),
        isNew: true,
        file,
        isDeleted: false,
      }));

      setImageItems((prev) => [...prev, ...newItems]);

      // Add changes
      const newChanges: ImageChange[] = files.map((file) => ({
        type: "add",
        newFile: file,
      }));

      setChanges((prev) => [...prev, ...newChanges]);
    }
  };

  // Handle image replacement from ImageLoader
  const handleImageReplace = (file: File, originalIndex: number) => {
    const newUrl = URL.createObjectURL(file);
    const oldItem = imageItems[originalIndex];

    setImageItems((prev) =>
      prev.map((item, i) =>
        i === originalIndex ? { ...item, url: newUrl, file, isNew: true } : item
      )
    );

    // Add replacement change
    const replaceChange: ImageChange = {
      type: "replace",
      index: originalIndex,
      oldUrl: oldItem.url,
      newFile: file,
    };

    setChanges((prev) => [...prev, replaceChange]);
  };

  const handleDelete = (originalIndex: number) => {
    const item = imageItems[originalIndex];

    // Mark as deleted instead of physically removing
    setImageItems((prev) =>
      prev.map((img, i) =>
        i === originalIndex ? { ...img, isDeleted: true } : img
      )
    );

    // Add deletion change
    const deleteChange: ImageChange = {
      type: "delete",
      index: originalIndex,
      oldUrl: item.url,
    };

    setChanges((prev) => [...prev, deleteChange]);
  };

  // Filter non-deleted images for display
  const visibleImages = imageItems.filter((item) => !item.isDeleted);

  return (
    <div className="SwiperLoader">
      {/* Input for adding new images */}
      <input
        type="file"
        accept="image/*"
        ref={input}
        onChange={handleAddImages}
        hidden
        multiple
      />

      <div className={style.image}>
        <Swiper
          className={style.slider}
          modules={[Navigation]}
          slidesPerView={1}
          navigation
          speed={800}
          wrapperClass={style.slider__wrapper}
        >
          {visibleImages.map((imageItem) => {
            // Find the original index in the full imageItems array
            const originalIndex = imageItems.findIndex(
              (item) => item.id === imageItem.id
            );

            return (
              <SwiperSlide className={style.slider__slide} key={imageItem.id}>
                {/* ImageLoader with replacement functionality */}
                <ImageLoader
                  src={imageItem.url}
                  onImageReplace={handleImageReplace}
                  index={originalIndex}
                  allowReplace={true}
                />

                {/* Delete button only */}
                <div
                  style={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    zIndex: 40,
                  }}
                >
                  <div
                    className={style.deleteBtn}
                    style={{
                      background: "rgba(255,255,255,0.7)",
                      border: "none",
                      borderRadius: "50%",
                      cursor: "pointer",
                      padding: "4px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onClick={() => handleDelete(originalIndex)}
                    title="Удалить изображение"
                  >
                    <Trash2 size={20} color="#e3342f" />
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
          {/* Slide to add new images */}
          <SwiperSlide className={style.slider__slide}>
            <div
              style={{
                cursor: "pointer",
                userSelect: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                textAlign: "center",
                padding: "20px",
              }}
              onClick={() => input.current?.click()}
            >
              <p>+ Добавить изображения</p>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default SwiperLoaderTest;
