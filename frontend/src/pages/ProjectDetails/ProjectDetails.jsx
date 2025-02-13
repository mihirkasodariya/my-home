import React, { useState } from "react";
import { Layout } from "../../components/Layout";
import EastIcon from "@mui/icons-material/East";
import { useParams } from "react-router-dom";
import { useFetchData } from "../../hooks/useFetchData";

import "./ProjectDetails.css";
import { Link } from "react-router-dom";
import { Card } from "../../components/Card";
import { Marquee } from "../../components/Marquee";
import { Button } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import CurrencyRupeeOutlinedIcon from "@mui/icons-material/CurrencyRupeeOutlined";
import ChairOutlinedIcon from "@mui/icons-material/ChairOutlined";
import SpaceDashboardOutlinedIcon from "@mui/icons-material/SpaceDashboardOutlined";
import { Calculator } from "../../components/Calculator";
import comingsoon from "../../assets/img/comingsoon.jpg";
import { RecentProperty } from "../../components/RecentProperty";
import { ContactForm } from "../../components/ContactForm";
import Carousel from "../../components/Carousel";

export const ProjectDetails = () => {
  const { id } = useParams();
  const apiUrl = `${process.env.BASE_URL}/api/v1/property/${id}`;
  const { data, loading, error, refetch } = useFetchData(apiUrl);
  const property = data.property;

  const images = [];

  if (property) {
    property.image.forEach((item) => {
      let realImage = `${process.env.BASE_URL}/${item}`;
      images.push(realImage);
    });
  }

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  function toINRCr(amount) {
    // Convert the amount to Crores
    let crAmount = amount / 10000000;
    // If the decimal part is 0, return without decimals
    if (crAmount % 1 === 0) {
      return crAmount.toFixed(0) + " Cr";
    } else {
      return crAmount.toFixed(1) + " Cr";
    }
  }

  const handleNext = () => {
    setIsFading(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      setIsFading(false);
    }, 500); // Fade duration in ms
  };

  const handlePrevious = () => {
    setIsFading(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? images.length - 1 : prevIndex - 1
      );
      setIsFading(false);
    }, 500);
  };
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  const fullDescription = property?.description || "";

  // Truncate description only if it has content
  const truncatedDescription =
    fullDescription.length > 200
      ? fullDescription.slice(0, 200) + "..."
      : fullDescription; // If less than 200 characters, no truncation

  const handleAnchorClick = (e) => {
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute("href").substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Layout>
      {/* Project Details Hero */}
      <div className="detailsbanner flex items-center justify-center">
        <div className="grid sm:grid-cols-12">
          <div className="col-span-12 text-center lg:mt-20">
            <h1 className="ffont-dmsans font-medium text-white text-3xl lg:text-4xl">
              Property Details
            </h1>
          </div>
        </div>
      </div>

      <div className="bg-gray-100 lg:p-3" style={{ scrollBehavior: "smooth" }}>
        <div className="container mx-auto">
          <div className="flex flex-col lg:grid sm:grid-cols-12 gap-6 max-w-[1280px] mt-3 lg:mt-8 mx-auto">
            <div className="col-span-12 lg:col-span-9 bg-white px-3 lg:px-12 py-4 lg:py-8">
              <Carousel galleryImages={images} />
              <div className="flex flex-col lg:flex-row gap-8 justify-between lg:items-center m-3">
                <div className="font-roboto mt-6 flex justify-between">
                  <div>
                    <h1 className="font-medium text-2xl lg:text-4xl">
                      {property?.name}
                    </h1>
                    <p className="text-md mt-3">{property?.location}</p>
                  </div>
                  <div className="block lg:hidden">
                    <h5 className="font-roboto font-semibold text-[#EB664E] text-2xl lg:text-4xl">
                      ₹{toINRCr(property?.price)}*
                    </h5>
                  </div>
                </div>
                <div className="flex gap-5">
                  <Button
                    startIcon={<DownloadIcon />}
                    variant="outlined"
                    size="small"
                    color="error"
                    sx={{ textTransform: "none" }}
                  >
                    Download PDF
                  </Button>
                  <a
                    href={`https://wa.me/+918750238581?text=Hi I am interested in ${property?.name}, Please share the details.`}
                    target="_blank"
                  >
                    <Button
                      startIcon={<WhatsAppIcon />}
                      variant="outlined"
                      size="small"
                      color="success"
                      sx={{ textTransform: "none" }}
                    >
                      WhatsApp Message
                    </Button>
                  </a>
                </div>
                <div className="hidden justify-end  lg:flex">
                  <h5 className="font-roboto font-semibold text-[#EB664E] text-2xl lg:text-4xl">
                    ₹{toINRCr(property?.price)}*
                  </h5>
                </div>
              </div>
              <div className="hidden gap-10 lg:grid sm:grid-cols-12 justify-center lg:justify-start py-5 ps-2">
                <div className="col-span-3">
                  <div className="flex items-center gap-2">
                    <HomeOutlinedIcon sx={{ color: "#5BC0EB" }} />
                    <p className="font-roboto text-sm lg:text-lg">
                      {property?.unit} BHK
                    </p>
                  </div>
                </div>
                <div className="col-span-3">
                  <div className="flex items-center gap-2">
                    <ChairOutlinedIcon sx={{ color: "#5BC0EB" }} />
                    <p className="font-roboto text-sm lg:text-lg">
                      {property?.furnishType}
                    </p>
                  </div>
                </div>
                <div className="col-span-3">
                  <div className="flex items-center gap-2">
                    <SpaceDashboardOutlinedIcon sx={{ color: "#5BC0EB" }} />
                    <p className="font-roboto text-sm lg:text-lg">
                      {property?.size} sqft
                    </p>
                  </div>
                </div>
                <div className="col-span-3">
                  <div className="flex items-center gap-2">
                    <CurrencyRupeeOutlinedIcon sx={{ color: "#5BC0EB" }} />
                    <p className="font-roboto text-sm lg:text-lg">
                      {Math.trunc(property?.price / property?.size)} per sqft
                    </p>
                  </div>
                </div>
              </div>
              <div
                className="flex items-center  justify-between lg:grid sm:grid-cols-12 mx-3 mt-8"
                style={{ borderBottom: "3px solid lightgray" }}
              >
                <div className="col-span-3">
                  <h3 className="py-2">
                    <a href="#description" onClick={handleAnchorClick}>
                      <p className="text-xs lg:text-lg font-semibold">
                        Description
                      </p>
                    </a>
                  </h3>
                </div>
                <div className="col-span-3">
                  <h3 className="py-2">
                    <a href="#amenities" onClick={handleAnchorClick}>
                      <p className="text-xs lg:text-lg font-semibold">
                        Amenities
                      </p>
                    </a>
                  </h3>
                </div>
                <div className="col-span-3">
                  <h3 className="py-2">
                    <a href="#location" onClick={handleAnchorClick}>
                      <p className="text-xs lg:text-lg font-semibold">
                        Location
                      </p>
                    </a>
                  </h3>
                </div>
                <div className="col-span-3">
                  <h3 className="py-2">
                    <a href="#youtube" onClick={handleAnchorClick}>
                      <p className="text-xs lg:text-lg font-semibold">
                        Virtual Tour
                      </p>
                    </a>
                  </h3>
                </div>
              </div>
              <div className="grid sm:grid-cols-12 lg:mx-3 mt-8 gap-8">
                <div className="col-span-12" id="description">
                  <h3 className="text-xl font-poppins font-semibold">
                    Description
                  </h3>
                  <div className="mt-4 text-md lg:leading-9">
                    {/* Container for description text with transition */}
                    <div
                      className={`overflow-hidden transition-all duration-500 ease-in-out`}
                      style={{
                        maxHeight: isExpanded ? "9999px" : "200px", // Use a large value for expanded state
                      }}
                    >
                      <p>
                        {isExpanded ? fullDescription : truncatedDescription}
                      </p>
                    </div>

                    <Button
                      variant="contained"
                      color="secondary"
                      size="small"
                      sx={{
                        borderRadius: "24px",
                        textTransform: "none",
                        display: "inline-block",
                        marginTop: "10px",
                        backgroundColor: "#5BC0EB",
                      }}
                      onClick={toggleDescription}
                    >
                      {isExpanded ? "Read Less" : "Read More"}
                    </Button>
                  </div>
                </div>

                <div className="col-span-12" id="amenities">
                  <h3 className="text-xl font-poppins font-semibold pb-5">
                    Amenities
                  </h3>

                  <div className="border-2 border-gray p-3 rounded-lg">
                    <h3 className="text-lg lg:text-xl text-center font-roboto font-medium ">
                      Society Amenities
                    </h3>
                    <div className="flex flex-wrap lg:grid sm:grid-cols-12 mt-5 lg:gap-5">
                      {property &&
                        property.amenities
                          .filter((item) => item.type == "society_amenity")
                          .map((item) => {
                            return (
                              <div
                                className="col-span-6 md:col-span-6 lg:col-span-3"
                                key={item._id}
                              >
                                <div className="flex items-center gap-3 p-3 lg:p-5">
                                  <img
                                    src={`${process.env.BASE_URL}/${item.image}`}
                                    alt={item.name}
                                    className="h-[30px] w-[30px]"
                                  />
                                  <p>{item.name}</p>
                                </div>
                              </div>
                            );
                          })}
                    </div>
                  </div>
                </div>

                <div className="col-span-12">
                  <div className="border-2 border-gray p-3 rounded-lg">
                    <h3 className="text-lg  lg:text-xl text-center font-roboto font-medium ">
                      Flat Amenities
                    </h3>
                    <div className="flex flex-wrap lg:grid sm:grid-cols-12 mt-5 lg:gap-5">
                      {property &&
                        property.amenities
                          .filter((item) => item.type == "flat_amenity")
                          .map((item) => {
                            return (
                              <div
                                className="col-span-6 md:col-span-6 lg:col-span-3"
                                key={item._id}
                              >
                                <div className="flex items-center gap-3 p-3 lg:p-5">
                                  <img
                                    src={`${process.env.BASE_URL}/${item.image}`}
                                    alt={item.name}
                                    className="h-[30px] w-[30px]"
                                  />
                                  <p>{item.name}</p>
                                </div>
                              </div>
                            );
                          })}
                    </div>
                  </div>
                </div>

                <div className="col-span-12" id="location">
                  <h3 className="text-xl font-poppins font-semibold pb-5">
                    Location
                  </h3>

                  <div className="border-2 border-gray p-3 rounded-lg">
                    <h3 className="text-lg lg:text-xl text-center font-roboto font-medium">
                      Location Advantages
                    </h3>
                    <div className="flex flex-wrap lg:grid sm:grid-cols-12 mt-5 lg:gap-5">
                      {property &&
                        property.amenities
                          .filter((item) => item.type == "location_advantages")
                          .map((item) => {
                            return (
                              <div
                                className="col-span-6 md:col-span-6 lg:col-span-3"
                                key={item._id}
                              >
                                <div className="flex items-center gap-3 p-3 lg:p-5">
                                  <img
                                    src={`${process.env.BASE_URL}/${item.image}`}
                                    alt={item.name}
                                    className="h-[30px] w-[30px]"
                                  />
                                  <p>{item.name}</p>
                                </div>
                              </div>
                            );
                          })}
                    </div>
                  </div>
                </div>

                <div className="col-span-12" id="youtube">
                  <h3 className="text-xl font-poppins font-semibold ">
                    Virtual Tour
                  </h3>
                  <div className="flex items-center justify-center my-3">
                    <img
                      src={comingsoon}
                      alt=""
                      className="h-[200px] lg:h-[450px] w-[100%]"
                    />
                  </div>
                </div>

                <div className="col-span-12">
                  <h3 className="text-xl font-poppins font-semibold">
                    Address
                  </h3>
                  <p className="py-3 text-md">{property?.address}</p>
                </div>

                <div className="col-span-12">
                  <Calculator />
                </div>
              </div>
            </div>
            <div className="col-span-12 lg:col-span-3 bg-gray-100 w-auto px-5">
              <div className="flex flex-col gap-5 sticky top-0">
                <ContactForm />
                <RecentProperty />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Projects  */}
      <div className="bg-gray-100 p-3">
        <h1 className="text-center text-black lg:text-4xl text-2xl font-bold py-8 lg:font-medium">
          New Launches
        </h1>
        <Card category="New Launches" />
        <div className="flex justify-center my-3">
          <Link to={"/property/new-launches"}>
            <Button
              size="large"
              variant="contained"
              endIcon={<EastIcon />}
              sx={{
                backgroundColor: "#03002e",
                color: "white",
                textTransform: "none",
              }}
            >
              View all
            </Button>
          </Link>
        </div>
      </div>

      <Marquee />
    </Layout>
  );
};
