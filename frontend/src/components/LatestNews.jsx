import React from "react";
import { useFetchData } from "../hooks/useFetchData";
import { NewsCard } from "./NewsCard";
import "./LatestNews.css";
import { Button, CircularProgress } from "@mui/material";
import EastIcon from "@mui/icons-material/East";
import { Link } from "react-router-dom";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import bgImage from "../assets/img/img4.jpg";

export const LatestNews = () => {
  const apiUrl = `${process.env.BASE_URL}/api/v1/news`;
  const { data, loading, error, refetch } = useFetchData(apiUrl);

  const news = data?.news
    ? data.news.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    : [];

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
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
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

  return (
    <div
      className="bg-latest"
      style={{
        background: `linear-gradient(#0e1d3499, #0e1d34cc), url(${bgImage})`,
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="max-w-[1280px] mx-auto overflow-hidden">
        <div className="my-5 py-10">
          <h1 className="font-roboto text-3xl lg:text-4xl font-bold lg:font-medium text-white text-center py-8">
            Latest News
          </h1>
          {loading && (
            <div className="flex justify-center">
              <CircularProgress sx={{color: "white"}} size="30px" />
            </div>
          )}
          {error && (
            <div  className="flex flex-col items-center justify-center">
              <p>Something went wrong while loading the news.</p>
              <Button onClick={refetch} variant="contained" color="primary">
                Retry
              </Button>
            </div>
          )}
          {!loading && !error && (
            <Slider {...settings}>
              {news.map((item) => (
                <div key={item._id}>
                  <a href={item.url} target="_blank" rel="noopener noreferrer">
                    <NewsCard item={item} />
                  </a>
                </div>
              ))}
            </Slider>
          )}

          <div className="flex justify-center mt-10">
            <Link to="/news">
              <Button
                size="large"
                variant="contained"
                endIcon={<EastIcon />}
                sx={{
                  backgroundColor: "white",
                  color: "#03002e",
                  textTransform: "none",
                }}
              >
                View all
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
