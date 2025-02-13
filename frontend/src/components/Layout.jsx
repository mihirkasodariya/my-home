import React, { useState } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import googlereview from "../assets/img/Google review button.jpeg";
import whatsappfloat from "../assets/img/whatsapp float.png";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import GoogleIcon from "@mui/icons-material/Google";

export const Layout = ({ children }) => {
  const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Navbar mobileMenu={mobileMenu} setMobileMenu={setMobileMenu} />

      {/* Main Content */}
      <div className="flex-1">
        <main>{children}</main>
      </div>

      {/* Footer */}
      <Footer />

      {/* Google Review Button */}
      <div className="hidden lg:block fixed bottom-10 right-10 z-50">
        <a
          href="https://www.google.com/search?q=grow+infinity+realtors&rlz=1C1ONGR_enIN1124IN1124&oq=grow+infinity+realtors&gs_lcrp=EgZjaHJvbWUqDwgAECMYJxjjAhiABBiKBTIPCAAQIxgnGOMCGIAEGIoFMhUIARAuGCcYrwEYxwEYgAQYigUYjgUyBwgCEAAYgAQyCggDEAAYgAQYogQyCggEEAAYgAQYogQyBggFEEUYPDIGCAYQRRg8MgYIBxBFGDzSAQg3NjY2ajBqN6gCALACAA&sourceid=chrome&ie=UTF-8#lrd=0x2f7b6f8aa4bbbca1:0xcd4a6a4f021202d4,3,,,,"
          target="_blank"
        >
          <img
            src={googlereview}
            alt="Google Review Button"
            className="w-[120px] lg:w-[150px] cursor-pointer "
          />
        </a>
      </div>
      <div className="hidden lg:block fixed bottom-10 left-9 z-50">
        <a
          href="https://wa.me/+918750238581?text=Hello!%20I%20would%20like%20to%20inquire%20about%20your%20services"
          target="_blank"
        >
          <img
            src={whatsappfloat}
            alt="Whatsapp Button"
            className="w-[45px] h-[45px] lg:w-[70px] lg:h-[70px] cursor-pointer "
          />
        </a>
      </div>

      <div className="block lg:hidden fixed bottom-0 w-full z-50">
        <div className="bg-gradient-to-r from-[#042651] to-[#076bcd] text-white">
          <div className="flex item-center justify-between w-[100%]">
            <div className="p-2 flex-1 border border-blue-950">
              <a
                href="https://wa.me/+918750238581?text=Hello!%20I%20would%20like%20to%20inquire%20about%20your%20services"
                target="_blank"
              >
                <div className="flex justify-center items-center gap-3">
                  <WhatsAppIcon />
                  <p className="text-sm">Whatsapp</p>
                </div>
              </a>
            </div>
            <div className="p-2 flex-1 border border-blue-800">
              <a
                href="https://www.google.com/search?q=grow+infinity+realtors&rlz=1C1ONGR_enIN1124IN1124&oq=grow+infinity+realtors&gs_lcrp=EgZjaHJvbWUqDwgAECMYJxjjAhiABBiKBTIPCAAQIxgnGOMCGIAEGIoFMhUIARAuGCcYrwEYxwEYgAQYigUYjgUyBwgCEAAYgAQyCggDEAAYgAQYogQyCggEEAAYgAQYogQyBggFEEUYPDIGCAYQRRg8MgYIBxBFGDzSAQg3NjY2ajBqN6gCALACAA&sourceid=chrome&ie=UTF-8#lrd=0x2f7b6f8aa4bbbca1:0xcd4a6a4f021202d4,3,,,,"
                target="_blank"
              >
                <div className="flex justify-center items-center gap-3">
                  <GoogleIcon />
                  <p className="text-sm">Submit Google Review</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
