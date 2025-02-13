import React from "react";
import { Layout } from "../../components/Layout";
import "./Search.css";
import { PropertyCard } from "../../components/PropertyCard";
import { useParams } from "react-router-dom";
import { useFetchData } from "../../hooks/useFetchData";
import { CircularProgress } from "@mui/material";

export const Search = () => {
  const { id } = useParams();
  const apiUrl = `${process.env.BASE_URL}/api/v1/property/search?query=${id}`;

  const { data, loading, error, refetch } = useFetchData(apiUrl);

  const properties = data?.properties;

  return (
    <Layout>
      {/* Search Hero */}
      <div className="searchbanner flex items-center justify-center">
        <div className="grid sm:grid-cols-12">
          <div className="col-span-12 text-center mt-10 lg:mt-20 flex justify-center items-center">
            <h1 className="font-dmsans text-3xl lg:text-4xl font-medium text-white">
              Search Properties
            </h1>
          </div>
        </div>
      </div>
      <div className="flex my-8 justify-center">
        <h3 className="text-3xl">
          {properties && properties.length > 0 ? (
            <>
              Search results for{" "}
              <span className="font-bold capitalize">{id}</span>
            </>
          ) : (
            <div className="flex flex-col justify-around items-center text-center space-y-4 h-[30vh]">
              <h4 className="text-2xl font-medium text-gray-600">
                No results found for{" "}
                <span className="font-bold capitalize">{id}</span>
              </h4>
              <p className="text-lg text-center text-gray-500">
                We couldn't find any properties that match your search. Try
                using different keywords or filters.
              </p>
            </div>
          )}
        </h3>
      </div>

      <div className="grid sm:grid-cols-12 mx-16">
        {loading && (
          <div className="col-span-12 flex items-center justify-center">
            <CircularProgress size="30px" />
          </div>
        )}
        {properties &&
          properties.length > 0 &&
          properties.map((property) => {
            return (
              <div
                className="col-span-3 flex justify-center m-3"
                key={property._id}
              >
                <PropertyCard
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
