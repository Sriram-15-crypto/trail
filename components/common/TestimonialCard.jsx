"use client";

import Image from "next/image";

import React from "react";
import { useEffect, useState } from "react";
export default function TestimonialCard({ data, index }) {
  const [rating, setRating] = useState([]);
  useEffect(() => {
    for (let i = Math.round(data.rating); i >= 1; i--) {
      setRating((pre) => [...pre, "star"]);
    }
  }, []);
  return (
    <div className="swiper-slide">
      <div
        className="testimonials -type-3 sm:px-20 sm:py-40 bg-white"
        data-aos="fade-left"
        data-aos-duration={(index + 1) * 600}
      >
        <div className="row y-gap-30 md:text-center md:justify-center">
          <div className="col-md-auto">
            <div className="testimonials__image">
              <Image width={170} height={160} src={data.image} alt="image" />
            </div>
          </div>

          <div className="col-md">
            <p className="testimonials__text text-16 lh-17 fw-500 mt-15">
              “{data.review}”
            </p>

            <div className="mt-15">
              <div className="text-15 lh-1 text-dark-1 fw-500">{data.name}</div>
              <div className="text-13 lh-1 mt-10">
                {data?.service?.title}
                {data?.stack?.name}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
