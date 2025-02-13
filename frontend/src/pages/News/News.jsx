import React from "react";
import { Layout } from "../../components/Layout";
import "./News.css";

import { NewsCard } from "../../components/NewsCard";
import { useFetchData } from "../../hooks/useFetchData";
import { Link } from "react-router-dom";
import { NavigationBar } from "../../components/NavigationBar";
import { CircularProgress } from "@mui/material";

export const News = () => {
  const apiUrl = `${process.env.BASE_URL}/api/v1/news`;

  const { data, loading, error, refetch } = useFetchData(apiUrl);

  const news =
    data && data.news
      ? data.news.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      : [];

  return (
    <Layout>
      {/* News Hero  */}
      <div className="newsbanner flex items-center justify-center">
        <div className="grid sm:grid-cols-12">
          <div className="col-span-12 text-center mt-10 lg:mt-20">
            <h1 className="font-dmsans font-medium text-white text-3xl lg:text-4xl ">
              News
            </h1>
          </div>
        </div>
      </div>

      <NavigationBar />

      {/* Latest News  */}
      <div className="my-5">
        <h1 className="font-roboto text-3xl lg:text-4xl font-bold lg:font-medium text-center  py-3 lg:py-8">
          Latest News
        </h1>

        <div className="grid sm:grid-cols-12 my-3 lg:my-5 max-w-[1280px] mx-auto">
          {loading && (
            <div className="col-span-12 flex justify-center">
              <CircularProgress size="30px" />
            </div>
          )}
          {error && <p>{error}</p>}
          {news?.map((item) => {
            return (
              <div
                key={item._id}
                className="col-span-12 md:col-span-6 lg:col-span-3 m-3"
              >
                <a href={item.url} target="_blank">
                  <NewsCard item={item} />
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};
