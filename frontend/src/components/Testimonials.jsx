import React, { useState } from "react";
import StarIcon from "@mui/icons-material/Star";
import quote from "../assets/img/SVG.png";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-flip";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./Testimonials.css";

import { EffectFlip, Autoplay } from "swiper/modules";
import { CircularProgress } from "@mui/material";
import { useFetchData } from "../hooks/useFetchData";

export const Testimonials = () => {
  const apiUrl = `${process.env.BASE_URL}/api/v1/testimonials`;

  const { data, loading, error, refetch } = useFetchData(apiUrl);
  const testimonials = data?.testimonials || [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState("next"); // Determines animation direction

  const handlePrev = () => {
    setDirection("prev");
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setDirection("next");
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <>
      {/* Testimonial  */}
      <div className="bg-[#FFF8F6] lg:py-8 lg:px-16">
        <div className="grid sm:grid-cols-12 gap-5 max-w-[1280px] mx-auto">
          <div className="col-span-12 lg:col-span-6 flex justify-center">
            <div className="m-3 lg:m-5 px-5 lg:px-7 lg:py-16 font-roboto lg:pe-20 flex flex-col items-center ">
              <h1 className="text-xl lg:text-4xl text-[#1A1A1A] my-4 font-medium">
                What our customers are saying us?
              </h1>
              <p className="text-[#1A1A1A] text-md lg:text-lg text-justify my-5 lg:pe-20">
                Don't just take our word for it—hear directly from those who
                have experienced our services. Our customers' stories reflect
                the dedication, expertise, and care we put into every
                transaction. Read their testimonials and see why we're the
                trusted choice for all your real estate needs.
              </p>
              <div className="flex justify-end lg:justify-start gap-10 w-full">
                <div className="flex-col mt-5 lg:mt-10">
                  <h3 className="font-medium text-[#1A1A1A] text-sm lg:text-2xl">
                    10m+
                  </h3>
                  <p className="text-xs lg:text-lg">Happy People</p>
                </div>
                <div className="flex-col mt-5 lg:mt-10">
                  <h3 className="font-medium text-[#1A1A1A] text-sm lg:text-2xl">
                    4.88
                  </h3>
                  <p className="text-xs lg:text-lg">Overall rating</p>
                  <div className="flex mt-3">
                    <StarIcon
                      sx={{ color: "#e7c874", fontSize: { xs: 15, lg: 25 } }}
                      size="small"
                    />
                    <StarIcon
                      sx={{ color: "#e7c874", fontSize: { xs: 15, lg: 25 } }}
                      size="small"
                    />
                    <StarIcon
                      sx={{ color: "#e7c874", fontSize: { xs: 15, lg: 25 } }}
                      size="small"
                    />
                    <StarIcon
                      sx={{ color: "#e7c874", fontSize: { xs: 15, lg: 25 } }}
                      size="small"
                    />
                    <StarIcon
                      sx={{ color: "#e7c874", fontSize: { xs: 15, lg: 25 } }}
                      size="small"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-12 lg:col-span-6 flex justify-center testimonial-container">
            {loading && (
              <div className="flex items-center justify-center">
                <CircularProgress size="30px" />
              </div>
            )}
            {error && (
              <div className="flex items-center justify-center">
                <p>Something went wrong while loading the news.</p>
              </div>
            )}

            {testimonials && (
              <Swiper
                effect={"flip"}
                grabCursor={true}
                modules={[EffectFlip, Autoplay]} // Add Autoplay module
                autoplay={{
                  delay: 3000, // 3 seconds delay
                  disableOnInteraction: false, // Keep autoplay even after interaction
                }}
                className="mySwiper testimonial-swiper"
              >
                {testimonials.map((testimonial) => {
                  return (
                    <SwiperSlide key={testimonial._id}>
                      <div className="py-8 lg:py-16 font-roboto lg:ps-26">
                        <div className="flex-col items-center gap-4 testimonial-item">
                          <div className="flex items-center gap-5">
                            <img
                              src={`${process.env.BASE_URL}/${testimonial.image}`}
                              alt={testimonial.name}
                              className="w-[50px] lg:w-[90px] rounded-[50%] h-[50px] lg:h-[90px] object-cover object-top"
                            />
                            <div className="flex-col justify-center gap-5">
                              <h5 className="font-medium text-[#1A1A1A] text-sm lg:text-lg">
                                {testimonial.name}
                              </h5>
                              <p className="text-sm text-[#1A1A1A]">
                                {testimonial.role}
                              </p>
                            </div>
                            <div className="ms-32">
                              <img src={quote} alt="quote" />
                            </div>
                          </div>
                          <div className="mt-5">
                            <p className="lg:leading-10 text-sm lg:text-lg text-justify font-roboto font-medium text-[#1A1A1A]">
                              {testimonial.review.slice(0, 270) + "..."}
                            </p>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
