import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";

// import required modules
import { EffectCards, Autoplay } from "swiper/modules";
import "./AwardComponent.css";
import { useFetchData } from "../hooks/useFetchData";
import { CircularProgress } from "@mui/material";

export const AwardComponent = () => {
  const apiUrl = `${process.env.BASE_URL}/api/v1/awards`;
  const { data, loading, error, refetch } = useFetchData(apiUrl);
  const awards = data?.awards || [];
  return (
    <div className="body my-10">
      {loading && (
        <div className="col-span-12 flex min-h-[400px] items-center justify-center">
          <CircularProgress sx={{ color: "white" }} size="30px" />
        </div>
      )}
      {error && (
        <div className="flex justify-center">
          <p>Something went wrong while loading the awards.</p>
        </div>
      )}
      {awards && (
        <Swiper
          effect={"cards"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={"auto"}
          loop={true} // Enable infinite loop
          autoplay={{
            delay: 2500, // Slide change interval (in milliseconds)
            disableOnInteraction: false, // Auto play won't stop after interaction
          }}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={true}
          modules={[EffectCards, Autoplay]} // Add Autoplay module
          className="mySwiper awards-swiper"
        >
          {awards.map((award, i) => {
            return (
              <SwiperSlide key={award._id}>
                <img
                  src={`${process.env.BASE_URL}/${award.image}`}
                  className="h-[300px] w-[300px] lg:h-[500px] lg:w-[450px]"
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      )}
    </div>
  );
};
