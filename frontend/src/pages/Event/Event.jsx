import React from "react";
import "./Event.css";
import { Layout } from "../../components/Layout";
import { NavigationBar } from "../../components/NavigationBar";
import { Link } from "react-router-dom";
import { useFetchData } from "../../hooks/useFetchData";
import { CircularProgress } from "@mui/material";

export const Event = () => {
  const apiUrl = `${process.env.BASE_URL}/api/v1/events`;
  const { data, loading, error, refetch } = useFetchData(apiUrl);
  const events = data.events;

  return (
    <Layout>
      <div className="eventbanner flex justify-center items-center">
        <div className="grid sm:grid-cols-12">
          <div className="col-span-12 text-center mt-10 lg:mt-20">
            <h1 className="font-dmsans font-medium text-white text-3xl lg:text-4xl capitalize">
              Events
            </h1>
          </div>
        </div>
      </div>

      <NavigationBar />

      <div className="my-10">
        <h1 className="font-roboto text-3xl lg:text-4xl font-bold lg:font-medium text-center py-3 lg:py-8">
          Events
        </h1>
        <div className="grid sm:grid-cols-12 max-w-[1280px] mx-auto mt-3 lg:mt-8">
          {loading && (
            <div className="col-span-12 flex justify-center">
              <CircularProgress size="30px" />
            </div>
          )}
          {
            error && (
              <div className="col-span-12 flex justify-center">
                <p>Error: {error}</p>
              </div>
            )
          }
          {events &&
            events.map((event) => {
              const imageUrl =
                `${process.env.BASE_URL}/${event.image[0]}`.replace(/\\/g, "/");
              return (
                <div
                  className="col-span-12 md:col-span-6 lg:col-span-4 m-5"
                  key={event._id}
                >
                  <div
                    className="card bg-cover bg-center"
                    style={{
                      backgroundImage: `url(${imageUrl})`,
                    }}
                  >
                    <div className="content">
                      <h2 className="title">{event.title}</h2>
                      <p className="copy">{event.description}</p>
                      <p className="copy-1 text-lg">
                        Posted On:{" "}
                        {new Date(event.createdAt).toLocaleDateString()}
                      </p>
                      <Link to={`/event/${event._id}`}>
                        <button className="btn">View Trips</button>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </Layout>
  );
};
