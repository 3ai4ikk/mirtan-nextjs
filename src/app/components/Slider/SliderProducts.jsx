"use client";

import React from "react";
import Image from "next/image";
import { Pagination, Navigation } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./slider-products.scss";

const SliderProducts = ({ images }) => {
  return (
    <Swiper
      className="slider-products"
      modules={[Pagination, Navigation]}
      navigation={true}
      spaceBetween={20}
      slidesPerView={1}
      pagination={{ clickable: true }}
      loop={true}
      centeredSlides={true}
      slideClass="slider-products__slide"
      slideActiveClass="slider-products__slide-active"
      wrapperClass="slider-products__slide__wrapper"
      speed={1300}
    >
      {images.map((item, index) => (
        <SwiperSlide className="slider-products__slide" key={index}>
          <Image src={item} alt={`Slider ${index}`} width={890} height={501} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SliderProducts;
