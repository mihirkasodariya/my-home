import React from "react";
import { Layout } from "../../components/Layout";
import "./SingleProject.css";
import { useParams } from "react-router-dom";
import { useFetchData } from "../../hooks/useFetchData";
import { PropertyCard } from "../../components/PropertyCard";
import { CircularProgress } from "@mui/material";

export const SingleProject = () => {
  const { id } = useParams();
  const apiUrl = `${process.env.BASE_URL}/api/v1/property`;
  const { data, loading, error, refetch } = useFetchData(apiUrl);
  const properties = data.properties || [];

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const capitalizeWords = (str) => {
    return str
      .split(" ") // Split the string into words
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize the first letter of each word
      .join(" "); // Join the words back together
  };

  return (
    <Layout>
      <div className="projectbanner flex justify-center items-center">
        <div className="grid sm:grid-cols-12">
          <div className="col-span-12 text-center lg:mt-20">
            <h1 className="font-dmsans font-medium text-white text-3xl lg:text-4xl capitalize">
              {id.replace("-", " ")}
            </h1>
          </div>
        </div>
      </div>

      <div className="grid sm:grid-cols-12 max-w-[1280px] mx-auto my-10">
        {loading && (
          <div className="col-span-12 items-center flex justify-center">
            <CircularProgress size="30px" />
          </div>
        )}
        {error && (
          <div className="col-span-12 flex items-center justify-center">
            <p>Something went wrong: {error}</p>
          </div>
        )}
        {properties &&
          properties
            .filter(
              (property) =>
                property.category.name == capitalizeWords(id.replace("-", " "))
            )
            .map((property) => {
              return (
                <div className="col-span-12 lg:col-span-3 m-3">
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
                </div>
              );
            })}
      </div>
    </Layout>
  );
};
