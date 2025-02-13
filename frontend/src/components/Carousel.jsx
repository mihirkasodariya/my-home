import React, { useState } from "react";

const Carousel = ({ galleryImages }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Handle next slide
  const nextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % galleryImages.length);
  };

  // Handle previous slide
  const prevSlide = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? galleryImages.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="grid sm:grid-cols-12 gap-4">
      <div className="lg:col-span-8">
        <div
          id="controls-carousel"
          className="relative w-full border"
          data-carousel="static"
        >
          {/* Carousel wrapper */}
          <div className="relative overflow-hidden h-[280px] md:h-[350px] lg:h-[400px]">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{
                transform: `translateX(-${activeIndex * 100}%)`,
              }}
            >
              {galleryImages.map((image, index) => (
                <div
                  key={index}
                  className="w-full flex-shrink-0"
                  style={{ flex: "0 0 100%" }}
                >
                  <img
                    src={image}
                    className="block h-[280px] md:h-[350px] lg:h-[400px] w-full  object-fill object-center"
                    alt={`Slide ${index + 1}`}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Slider controls */}
          <button
            type="button"
            className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
            onClick={prevSlide}
            data-carousel-prev
          >
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
              <svg
                className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 1 1 5l4 4"
                />
              </svg>
              <span className="sr-only">Previous</span>
            </span>
          </button>
          <button
            type="button"
            className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
            onClick={nextSlide}
            data-carousel-next
          >
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
              <svg
                className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>
              <span className="sr-only">Next</span>
            </span>
          </button>
        </div>
      </div>
      <div className="hidden lg:block lg:col-span-4">
        <div className="flex flex-col gap-3">
          <img
            src={galleryImages[(activeIndex + 1) % galleryImages.length]}
            className="w-full h-[195px]"
            alt="Next image in carousel"
          />

          <div className="relative">
            <img
              src={galleryImages[galleryImages.length - 1]}
              className="w-full h-[195px]"
              alt="Carousel slide"
            />
            <div className="absolute top-0 w-full h-[195px] bg-[#3357ccc0] ">
              <div className="flex items-center justify-center h-full">
                <p className="text-white text-xl font-semibold">
                  {galleryImages.length - 2}+ Photos
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
