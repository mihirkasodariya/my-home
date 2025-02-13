import React from "react";
import VerifyTick from "../assets/img/tick.png";
import PiggyBank from "../assets/img/piggybank.png";
import Wrench from "../assets/img/Wrench.png";

import "./Choose.css";
import Trust from "../assets/img/TRUST.svg";
import Finance from "../assets/img/FINANCE.svg";
import CustomerSupport from "../assets/img/customer-support.png";
export const Choose = () => {
  return (
    <>
      {/* Why choose us?  */}
      <div className="my-10 max-w-[1280px] mx-auto ">
        <h1 className="text-2xl lg:text-4xl font-bold pt-6 font-roboto lg:font-medium text-black text-center">
          Why Choose us?
        </h1>

        <div className="grid sm:grid-cols-12 my-3 lg:my-10 gap-8">
          <div className="col-span-12 md:col-span-6 lg:col-span-4 mx-5">
            <div className="service-info-2 df-box">
              <div className="number">01</div>
              <div className="icon">
                <img
                  src={Trust}
                  style={{ width: "70px" }}
                  className="laticon-apartment"
                  alt=""
                />
                {/* <!-- <i className="flaticon-apartment"></i> --> */}
              </div>
              <div className="detail">
                <h5 className="text-2xl font-semibold">
                  <a href="#">Trusted By Thousands</a>
                </h5>
                <p>
                  With a proven track record of excellence, our real estate
                  services have earned the trust of thousands of satisfied
                  clients.
                </p>
              </div>
            </div>
          </div>
          <div className="col-span-12 md:col-span-6 lg:col-span-4 mx-5">
            <div className="service-info-2 df-box">
              <div className="number">02</div>
              <div className="icon">
                <img
                  src={Finance}
                  style={{ width: "70px" }}
                  className="laticon-apartment"
                  alt=""
                />
                {/* <!-- <i className="flaticon-apartment"></i> --> */}
              </div>
              <div className="detail">
                <h5 className="text-2xl font-semibold">
                  <a href="#">Financing Made Easy</a>
                </h5>
                <p>
                  Our simplified financing solution make securing your dream
                  home a breeze. Say goodbye to complexity and hello to easy,
                  hassale-free financing options.
                </p>
              </div>
            </div>
          </div>
          <div className="col-span-12 md:col-span-6 lg:col-span-4 mx-5">
            <div className="service-info-2 df-box">
              <div className="number">03</div>
              <div className="icon">
                <img
                  src={CustomerSupport}
                  style={{ width: "70px" }}
                  className="laticon-apartment"
                  alt=""
                />
                {/* <!-- <i className="flaticon-apartment"></i> --> */}
              </div>
              <div className="detail">
                <h5 className="text-2xl font-semibold">
                  <a href="#">Support 24/7</a>
                </h5>
                <p>
                  Our dedicated team is here for you 24/7, ensuring you have
                  support you need, whether you have questions about propertied,
                  transactions, or market trends.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
