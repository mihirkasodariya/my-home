import React from "react";
import { Layout } from "../../components/Layout";

import "./Services.css";

import HomeWorkIcon from "@mui/icons-material/HomeWork";

import { Link } from "react-router-dom";
import ApartmentIcon from "@mui/icons-material/Apartment";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import PhoneCallbackIcon from "@mui/icons-material/PhoneCallback";
import StorefrontIcon from "@mui/icons-material/Storefront";
import { NavigationBar } from "../../components/NavigationBar";

export const Services = () => {
  return (
    <Layout>
      <div className="bg-[#a79d900c]">
        {/* Service Hero  */}
        <div className="servicebanner flex items-center justify-center">
          <div className="grid sm:grid-cols-12">
            <div className="col-span-12 text-center mt-10 lg:mt-20">
              <h1 className="font-dmsans font-medium text-white text-3xl lg:text-4xl">
                Services
              </h1>
            </div>
          </div>
        </div>

        <NavigationBar />

        {/* Our Services  */}
        <div className="my-5 max-w-[1280px] mx-auto">
          <h1 className="font-roboto py-3 lg:py-8 text-2xl lg:text-4xl font-medium text-center">
            Our Services
          </h1>

          <div className="grid sm:grid-cols-12">
            <div className="col-span-12 md:col-span-6 lg:col-span-4 m-5">
              <div className="service-info-1 border flex flex-col gap-2 rounded-xl">
                <i>
                  <ApartmentIcon
                    sx={{ fontSize: { xs: "30px", lg: "50px" } }}
                  />
                </i>
                <h3>RESIDENTIAL</h3>
                <p className="px-5 text-center text-sm lg:text-md">
                  These services focus on buying and selling homes, condos,
                  apartments, and other residential properties. They cater to
                  individuals and families for a place to live.
                </p>
                <Link to="/contact" className="read-more">
                  Contact us
                </Link>
              </div>
            </div>
            <div className="col-span-12 md:col-span-6 lg:col-span-4 m-5">
              <div className="service-info-1 border flex flex-col gap-2 rounded-xl">
                <i>
                  <StorefrontIcon
                    sx={{ fontSize: { xs: "30px", lg: "50px" } }}
                  />
                </i>
                <h3>COMMERCIAL</h3>
                <p className="px-5 text-center text-sm lg:text-md">
                  Commercial real estate services deal with buying and selling
                  commercial properties like office buildings, retail spaces,
                  industrial warehouses, and land for development.
                  <br />
                </p>
                <Link to="/contact" className="read-more">
                  Contact us
                </Link>
              </div>
            </div>
            <div className="col-span-12 md:col-span-6 lg:col-span-4 m-5">
              <div className="service-info-1 border flex flex-col gap-2 rounded-xl">
                <i>
                  <HomeWorkIcon sx={{ fontSize: { xs: "30px", lg: "50px" } }} />
                </i>
                <h3>HOME RENTAL</h3>
                <p className="px-5 text-center text-sm lg:text-md">
                  Home rental services streamline the rental process, ensuring a
                  convenient and secure experience for both property owners and
                  renters.
                  <br />
                </p>
                <Link to="/contact" className="read-more">
                  Contact us
                </Link>
              </div>
            </div>
            <div className="col-span-12 md:col-span-6 lg:col-span-4 m-5">
              <div className="service-info-1 border flex flex-col gap-2 rounded-xl">
                <i>
                  <CreditScoreIcon
                    sx={{ fontSize: { xs: "30px", lg: "50px" } }}
                  />
                </i>
                <h3>HOME LOAN</h3>
                <p className="px-5 text-center text-sm lg:text-md">
                  We offer a comprehensive suite of loan services to make your
                  home buying journey seamless. In addition to helping you find
                  the perfect property, expert home loan services.
                </p>
                <Link to="/contact" className="read-more">
                  Contact us
                </Link>
              </div>
            </div>
            <div className="col-span-12 md:col-span-6 lg:col-span-4 m-5">
              <div className="service-info-1 border flex flex-col gap-2 rounded-xl">
                <i>
                  <AutoGraphIcon
                    sx={{ fontSize: { xs: "30px", lg: "50px" } }}
                  />
                </i>
                <h3>INVESTMENT</h3>
                <p className="px-5 text-center text-sm lg:text-md">
                  Investment-focused services assist clients in buying and
                  selling properties for investment purposes, such as rental
                  properties, vacation rentals, and fix-and-flip opportunities.
                </p>
                <Link to="/contact" className="read-more">
                  Contact us
                </Link>
              </div>
            </div>
            <div className="col-span-12 md:col-span-6 lg:col-span-4 m-5">
              <div className="service-info-1 border flex flex-col gap-2 rounded-xl">
                <i>
                  <PhoneCallbackIcon
                    sx={{ fontSize: { xs: "30px", lg: "50px" } }}
                  />
                </i>
                <h3>CONSULTATION</h3>
                <p className="px-5 text-center text-sm lg:text-md">
                  These services offer expert advice to buyers and sellers,
                  helping them make informed decisions, understand market
                  trends, and strategize for successful transactions.
                </p>
                <Link to="/contact" className="read-more">
                  Contact us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
