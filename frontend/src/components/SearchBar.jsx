import React, { useState } from "react";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import HomeIcon from "@mui/icons-material/Home";
import Slider from "@mui/material/Slider";
import { useNavigate } from "react-router-dom";

export const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [property, setProperty] = useState(false);
  const [bhk, setBhk] = useState(false);
  const [selectedValue, setSelectedValue] = useState("Sale");
  const [bhkValue, setBhkValue] = useState("4 BHK");
  const navigate = useNavigate();

  const options = ["Sale", "Purchase"];
  const bhkOptions = ["2 BHK", "3 BHK", "4 BHK"]; // Add BHK options here

  const handleBhkClick = (value) => {
    setBhkValue(value);
    setBhk(false);
  };

  const handleOptionClick = (value) => {
    setSelectedValue(value);
    setProperty(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if(!searchQuery){
      return alert("Please enter name or location");
     }
    try {
      navigate(`/search/${searchQuery}`);
    } catch (error) {
      console.log(error);
    }
  };

  const [value, setValue] = useState([60, 1400]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <form onSubmit={handleSearch} className="w-[90%] lg:w-[80%]">
      <div className="grid sm:grid-cols-12">
        <div
          className="col-span-12 lg:col-span-10 bg-white h-[300] w-[100%] rounded-[13.27px]"
          style={{ boxShadow: "0px 16.39px 33.56px 0px #0000001A" }}
        >
          <div className="grid sm:grid-cols-12 p-5 items-center gap-5">
            <div className="col-span-6 lg:col-span-2 md:col-span-3">
              <button
                id="dropdownDefaultButton"
                data-dropdown-toggle="dropdown"
                className="text-black bg-[#F4F4F4] font-medium text-sm px-5 w-full py-1 lg:py-2.5 text-center justify-between lg:justify-start inline-flex items-center rounded-[17.56px]"
                type="button"
                onClick={() => setProperty(!property)}
              >
                <HomeOutlinedIcon
                  sx={{ color: "#03002E", marginRight: "8px" }}
                />{" "}
                {selectedValue}{" "}
                <svg
                  className="w-2.5 h-2.5 ms-3 flex-end"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>

              {/* <!-- Dropdown menu --> */}
              <div
                id="dropdown"
                className={
                  property
                    ? "absolute mt-3 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
                    : "hidden"
                }
              >
                <ul
                  className="py-2 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="dropdownDefaultButton"
                >
                  {options.map((option) => (
                    <li key={option}>
                      <a
                        onClick={() => handleOptionClick(option)}
                        className={`block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white ${
                          selectedValue === option
                            ? "bg-gray-200 dark:bg-gray-500"
                            : ""
                        }`}
                      >
                        {option}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="block lg:hidden col-span-6 lg:col-span-2 md:col-span-3">
              <button
                id="dropdownBhkButton"
                data-dropdown-toggle="dropdownBhk"
                className="text-black w-full bg-[#F4F4F4] font-medium text-sm px-5 py-1 lg:py-2.5 text-center inline-flex justify-between lg:justify-start items-center rounded-[17.56px]"
                type="button"
                onClick={() => setBhk(!bhk)}
              >
                <HomeIcon sx={{ color: "#03002E", paddingRight: "5px" }} />{" "}
                {bhkValue}{" "}
                <svg
                  className="w-2.5 h-2.5 ms-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>

              {/* BHK Dropdown Menu */}
              <div
                id="dropdownBhk"
                className={
                  bhk
                    ? "absolute mt-3 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
                    : "hidden"
                }
              >
                <ul
                  className="py-2 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="dropdownBhkButton"
                >
                  {bhkOptions.map((option) => (
                    <li key={option}>
                      <a
                        onClick={() => handleBhkClick(option)}
                        className={`block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white ${
                          bhkValue === option
                            ? "bg-gray-200 dark:bg-gray-500"
                            : ""
                        }`}
                      >
                        {option}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="col-span-12 lg:col-span-6 md:col-span-6">
              <div className="lg:mx-4 mx-0">
                <input
                  type="text"
                  placeholder="Your desired location, project, city goes here"
                  className="bg-[#F4F4F4] rounded-[17.56px] p-2 lg:p-3 w-full outline-none"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  required
                />
              </div>
            </div>
            {/* BHK Dropdown */}
            <div className="hidden lg:block col-span-6 lg:col-span-2 md:col-span-3">
              <button
                id="dropdownBhkButton"
                data-dropdown-toggle="dropdownBhk"
                className="text-black w-full bg-[#F4F4F4] font-medium text-sm px-5 py-2.5 text-center inline-flex justify-between lg:justify-start items-center rounded-[17.56px]"
                type="button"
                onClick={() => setBhk(!bhk)}
              >
                <HomeIcon sx={{ color: "#03002E", paddingRight: "5px" }} />{" "}
                {bhkValue}{" "}
                <svg
                  className="w-2.5 h-2.5 ms-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>

              {/* BHK Dropdown Menu */}
              <div
                id="dropdownBhk"
                className={
                  bhk
                    ? "absolute mt-3 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
                    : "hidden"
                }
              >
                <ul
                  className="py-2 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="dropdownBhkButton"
                >
                  {bhkOptions.map((option) => (
                    <li key={option}>
                      <a
                        onClick={() => handleBhkClick(option)}
                        className={`block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white ${
                          bhkValue === option
                            ? "bg-gray-200 dark:bg-gray-500"
                            : ""
                        }`}
                      >
                        {option}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="hidden lg:block col-span-12 lg:col-span-2 md:col-span-12">
              <div>
                <button
                  onClick={handleSearch}
                  type="submit"
                  className="text-white bg-[#03002E]  w-full rounded-[8.59px] py-2 px-10"
                  style={{ boxShadow: "0px 5.46px 13.27px 0px #03002E80" }}
                >
                  Search
                </button>
              </div>
            </div>
            <div className="col-span-2 lg:col-span-2">
              <button className="bg-[#f4f4f4] w-full py-2 text-xs px-2 lg:text-lg rounded-2xl text-[#03002e] font-medium">
                Price (₹)
              </button>
            </div>
            <div className="col-span-10 lg:col-span-6 flex justify-center mx-8 items-center">
              <Slider
                value={value}
                onChange={handleChange}
                valueLabelDisplay="auto"
                min={60} // Minimum value in lakhs (60 lakhs)
                max={1400} // Maximum value in lakhs (14 crores = 1400 lakhs)
                sx={{ color: "#03002e" }}
                valueLabelFormat={(value) => {
                  if (value < 100)
                    return `₹${value} Lac`; // If less than 100, show in Lac
                  else return `₹${(value / 100).toFixed(2)} Cr`; // Otherwise, show in Cr (crore)
                }}
                marks={[
                  { value: 60, label: "₹ 60 Lac" }, // Minimum value: 60 Lac
                  { value: 1400, label: "₹ 14 Cr" }, // Maximum value: 14 Cr
                ]}
              />
            </div>
            <div className="hidden lg:block col-span-12 lg:col-span-4">
              <div className="grid sm:grid-cols-12 gap-3">
                <div className="col-span-6 lg:col-span-6">
                  <p className="text-xs text-center text-gray-700 font-roboto font-medium">
                    Price Range From:
                  </p>
                  <p className="text-md text-center  font-roboto font-medium">
                    {value[0] < 100
                      ? `₹ ${value[0]} Lac`
                      : `₹ ${(value[0] / 100).toFixed(2)} Cr`}
                  </p>
                </div>
                <div className="col-span-6 lg:col-span-6">
                  <p className="text-xs text-center text-gray-700 font-roboto font-medium">
                    Price Range To:
                  </p>
                  <p className="text-md text-center  font-roboto font-medium">
                    {value[1] < 100
                      ? `₹ ${value[1]} Lac`
                      : `₹ ${(value[1] / 100).toFixed(2)} Cr`}
                  </p>
                </div>
              </div>
            </div>
            <div className="block lg:hidden col-span-12 lg:col-span-2 md:col-span-12">
              <div>
                <button
                  onClick={handleSearch}
                  type="submit"
                  className="text-white text-sm lg:text-lg bg-[#03002E]  w-full rounded-[8.59px] py-[4px] lg:py-2 px-10"
                  style={{ boxShadow: "0px 5.46px 13.27px 0px #03002E80" }}
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
