import React from "react";
import { toast, ToastContainer } from "react-toastify";
import { Layout } from "../../components/Layout";
import { NavigationBar } from "../../components/NavigationBar";
import { useFetchData } from "../../hooks/useFetchData";
import "./Awards.css";
import { CircularProgress } from "@mui/material";

export const Awards = () => {
  const apiUrl = `${process.env.BASE_URL}/api/v1/awards`;
  const { data, loading, error, refetch } = useFetchData(apiUrl);
  const awards = data?.awards || [];
  return (
    <>
      <ToastContainer />
      <Layout>
        <div className="awardsbanner flex items-center justify-center">
          <div className="grid sm:grid-cols-12">
            <div className="col-span-12 text-center lg:mt-20 flex justify-center items-center">
              <h1 className="font-dmsans text-3xl lg:text-4xl font-medium text-white">
                Awards
              </h1>
            </div>
          </div>
        </div>

        <NavigationBar />

        <div className="my-10">
          <h1 className="font-roboto text-3xl lg:text-4xl font-bold lg:font-medium text-center py-3 lg:py-8">
            Awards
          </h1>

          <div className="grid sm:grid-cols-12 max-w-[1280px] mx-auto">
            {loading && (
              <div className="col-span-12 flex justify-center">
                <CircularProgress size="30px" />
              </div>
            )}
            {error && (
              <div className="col-span-12 flex justify-center">
                <p>Something went wrong while loading the awards.</p>
              </div>
            )}
            {awards?.map((award, i) => {
              return (
                <div key={award._id} className="col-span-12 md:col-span-6 lg:col-span-4 m-5">
                  <img src={`${process.env.BASE_URL}/${award.image}`} alt="" />
                </div>
              );
            })}
          </div>
        </div>
      </Layout>
    </>
  );
};
