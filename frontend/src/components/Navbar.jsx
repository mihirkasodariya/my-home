import React, { useState } from "react";
import logo from "../assets/img/logo.png";
import { Link, NavLink } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

export const Navbar = ({ mobileMenu, setMobileMenu }) => {
  document.title = "My Home Realtors";

  // Function to handle link click
  const handleLinkClick = () => {
    setMobileMenu(false);
  };

  return (
    <>
      <nav className="block fixed z-[1000] w-[100%] top-0 lg:hidden bg-white shadow-lg">
        <div className="flex items-center justify-between m-3">
          <div>
            <Link to="/">
              <img src={logo} alt="" width={150} />
            </Link>
          </div>
          <div>
            <IconButton
              sx={{ color: "#1b1364" }}
              size="large"
              aria-label="mobile-menu"
              onClick={() => setMobileMenu(!mobileMenu)}
            >
              <MenuIcon />
            </IconButton>
          </div>
        </div>
      </nav>
      <nav className="hidden lg:block bg-[#FFFFFF80] rounded-[25px] w-[90%] absolute left-[6%] top-[8%] z-10">
        <div className="flex justify-between p-3 items-center">
          <Link to="/">
            <img src={logo} alt="" width={220} />
          </Link>
          <ul className="flex gap-10">
            <li className="font-dmsans font-[12.49px]">
              <NavLink to="/">Home</NavLink>
            </li>
            <li className="font-dmsans font-[12.49px]">
              <NavLink to="/about">About us</NavLink>
            </li>
            <li className="font-dmsans font-[12.49px]">
              <NavLink to="/event">Events</NavLink>
            </li>
            <li className="font-dmsans font-[12.49px]">
              <NavLink to="/services">Services</NavLink>
            </li>
            <li className="font-dmsans font-[12.49px]">
              <NavLink to="/news">News</NavLink>
            </li>
            <li className="font-dmsans font-[12.49px]">
              <NavLink to="/contact">Contact us</NavLink>
            </li>
          </ul>
          <Link
            to="/brochure"
            className="font-dmsans px-10 py-2 bg-[#03002E] text-white rounded-[16.5px] uppercase"
            style={{ boxShadow: "0px 5.46px 13.27px 0px #00000080" }}
          >
            Brochure
          </Link>
        </div>
      </nav>

      <nav
        className={`fixed shadow-lg z-[100] h-screen bg-[#FFFFFF] w-[70%] text-black transform transition-transform duration-300 ease-in-out ${
          mobileMenu ? "translate-x-0" : "translate-x-[-100%]"
        }`}
      >
        <div className="p-4">
          <div className="flex items-center justify-between mx-3">
            <div>
              <Link to="/">
                <img src={logo} alt="" width={150} />
              </Link>
            </div>
            <div>
              <IconButton
                sx={{ color: "#1b1364" }}
                size="large"
                aria-label="mobile-menu"
                onClick={() => setMobileMenu(!mobileMenu)}
              >
                <CloseIcon />
              </IconButton>
            </div>
          </div>
          <ul className="flex flex-col ms-5 mt-10 gap-10">
            <li className="font-dmsans font-[12.49px]">
              <NavLink to="/">Home</NavLink>
            </li>
            <li className="font-dmsans font-[12.49px]">
              <NavLink to="/about">About us</NavLink>
            </li>
            <li className="font-dmsans font-[12.49px]">
              <NavLink to="/event">Events</NavLink>
            </li>
            <li className="font-dmsans font-[12.49px]">
              <NavLink to="/services">Services</NavLink>
            </li>
            <li className="font-dmsans font-[12.49px]">
              <NavLink to="/news">News</NavLink>
            </li>
            <li className="font-dmsans font-[12.49px]">
              <NavLink to="/contact">Contact us</NavLink>
            </li>
            <li className="font-dmsans font-[12.49px]">
              <NavLink to="/brochure" onClick={handleLinkClick}>
                Brochure
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};
