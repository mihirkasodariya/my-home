import React from "react";
import gallery1 from "../assets/img/gallery1.png";
import { useFetchData } from "../hooks/useFetchData";
import { Link } from "react-router-dom";

export const RecentProperty = () => {
  const apiUrl = `${process.env.BASE_URL}/api/v1/property/recent-properties`;
  const { data, loading, error, refetch } = useFetchData(apiUrl);
  const properties = data.properties;

  return (
    <div className="bg-white p-5">
      <h1 className="text-xl text-center font-medium">Recent Property</h1>
      <div className="grid sm:grid-cols-12 gap-6 mt-5">
        {properties &&
          properties.map((property) => {
            return (
              <div className="col-span-12" key={property._id}>
                <Link to={`/project/${property._id}`}>
                  <div className="flex gap-3">
                    <img
                      src={`${process.env.BASE_URL}/${property.image[0]}`}
                      alt=""
                      className="h-[40px] w-[40px] rounded"
                    />
                    <div className="flex flex-col items-center justify-center">
                      <h1 className="text-sm font-medium">{property.name}</h1>
                      <p className="text-xs">
                        Posted on:{" "}
                        {new Date(property.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
      </div>
    </div>
  );
};
