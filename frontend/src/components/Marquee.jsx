import React from "react";
import brand1 from "../assets/img/Ace.png";
import brand2 from "../assets/img/ATS LOGO.png";
import brand3 from "../assets/img/dasnac.png";
import brand4 from "../assets/img/Eldeco La Vida Bella Group Logo.png";
import brand5 from "../assets/img/Eldeco.png";
import brand6 from "../assets/img/fusion.png";
import brand7 from "../assets/img/gaurs.png";
import brand8 from "../assets/img/irish.png";
import brand9 from "../assets/img/M3M.png";
import brand10 from "../assets/img/Mahagun.png";
import brand11 from "../assets/img/prateek.png";
import brand12 from "../assets/img/Prestige Group Logo.png";
import brand13 from "../assets/img/Stellar Group Logo.png";
import brand14 from "../assets/img/Tata.png";

export const Marquee = () => {
  return (
    <div className="lg:p-3">
      <div className="py-1 *:lg:py-3 overflow-hidden">
        <div className="marquee-container">
          <div className="marquee-content">
            {[
              brand1,
              brand2,
              brand3,
              brand4,
              brand5,
              brand6,
              brand7,
              brand8,
              brand9,
              brand10,
              brand11,
              brand12,
              brand13,
              brand14,
            ].map((brand, index) => (
              <div key={index} className="marquee-item">
                <img
                  src={brand}
                  alt={`brandlogo${index + 1}`}
                  className="mx-8"
                />
              </div>
            ))}
          </div>

          {/* Duplicate the images to ensure the loop is seamless */}
          <div className="marquee-content">
            {[
              brand1,
              brand2,
              brand3,
              brand4,
              brand5,
              brand6,
              brand7,
              brand8,
              brand9,
              brand10,
              brand11,
              brand12,
              brand13,
              brand14,
            ].map((brand, index) => (
              <div key={index} className="marquee-item">
                <img
                  src={brand}
                  alt={`brandlogo${index + 1}`}
                  className="max-w-[200px] mx-8"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .marquee-container {
          width: 100%;
          display: flex;
          justify-content: center;
          overflow: hidden;
          position: relative;
        }

        .marquee-content {
          display: flex;
          gap: 70px; /* Adjust the gap between images */
          animation: marquee 20s linear infinite; /* Adjust the duration for scroll speed */
          will-change: transform; /* Help browser optimize the animation */
        }

        @media screen and (max-width: 500px) {
          .marquee-content {
            gap: 5px;
          }

          .marquee-item img {
            width: 100px !important;
          }
        }

        .marquee-item img {
          display: block;
          width: 160px;
          max-width: 200px;
        }

        /* Duplicate animation to make the scroll seamless */
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(
              -50%
            ); /* Move exactly half the width of the container */
          }
        }
      `}</style>
    </div>
  );
};
