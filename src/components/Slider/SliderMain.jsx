"use client";

import React from "react";
import Image from "next/image";
import { Pagination, Navigation } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./slider-main.scss";

const SliderMain = () => {
  return (
    <Swiper
      className="slider"
      modules={[Pagination, Navigation]}
      navigation={true}
      spaceBetween={80}
      slidesPerView={1}
      pagination={{ clickable: true }}
      loop={true}
      centeredSlides={true}
      slideClass="slider__slide"
      slideActiveClass="slider__slide-active"
      wrapperClass="slider__wrapper"
      speed={1300}
      breakpoints={{
        767: {
          slidesPerView: 1.5,
          spaceBetween: 120,
        },
        1023: {
          slidesPerView: 2,
          spaceBetween: 80,
        },
      }}
    >
      <SwiperSlide className="slider__slide">
        <Image src="/images/bg-1.jpg" alt="Slide 1" width={890} height={501} />
      </SwiperSlide>
      <SwiperSlide className="slider__slide">
        <Image src="/images/bg-2.jpg" alt="Slide 1" width={890} height={501} />
      </SwiperSlide>
      <SwiperSlide className="slider__slide">
        <Image src="/images/bg-3.jpg" alt="Slide 1" width={890} height={501} />
      </SwiperSlide>
      <SwiperSlide className="slider__slide">
        <Image src="/images/bg-1.jpg" alt="Slide 1" width={890} height={501} />
      </SwiperSlide>
      <SwiperSlide className="slider__slide">
        <Image src="/images/bg-2.jpg" alt="Slide 1" width={890} height={501} />
      </SwiperSlide>
      <SwiperSlide className="slider__slide">
        <Image src="/images/bg-3.jpg" alt="Slide 1" width={890} height={501} />
      </SwiperSlide>
    </Swiper>
  );
};

export default SliderMain;
