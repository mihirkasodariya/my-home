import React, { useState } from "react";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "./Card.css";
import { useFetchData } from "../hooks/useFetchData";
import { PropertyCard } from "./PropertyCard";
import { CircularProgress } from "@mui/material";

export const Card = ({ category }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 550,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const apiUrl = `${process.env.BASE_URL}/api/v1/property`;
  const { data, loading, error, refetch } = useFetchData(apiUrl);

  console.log('properties', data)
  const properties = data.properties;
  return (
    <div className="max-w-[1280px] mx-auto overflow-hidden">
      {loading && (
        <div className="flex justify-center">
          <CircularProgress size="30px" />
        </div>
      )}
      {error && (
        <div>
          <p>Error: {error}</p>
        </div>
      )}
      <Slider {...settings}>
        {properties &&
          properties
            .filter((property) => property.category.name == category)
            .map((property) => {
              return (
                <PropertyCard
                  key={property._id}
                  id={property._id}
                  name={property.name}
                  image={property.image[0]}
                  location={property.location}
                  builder={property.builder}
                  unit={property.unit}
                  size={property.size}
                  price={property.price}
                />
              );
            })}
      </Slider>
    </div>
  );
};
