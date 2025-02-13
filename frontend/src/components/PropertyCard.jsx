import React, { useState } from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import HomeIcon from "@mui/icons-material/Home";
import SquareFootIcon from "@mui/icons-material/SquareFoot";
import { Button } from "@mui/material";
import CallIcon from "@mui/icons-material/Call";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import DoneIcon from "@mui/icons-material/Done";
import { Link } from "react-router-dom";
import { PropertyEnquiryForm } from "./PropertyEnquiryForm";

export const PropertyCard = ({
  id,
  name,
  image,
  location,
  builder,
  unit,
  size,
  price,
}) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };

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

  return (
    <div className="border relative p-2 hover:shadow-2xl bg-white">
      <div className="flex justify-center">
        <img
          src={`${process.env.BASE_URL}/${image}`}
          alt=""
          className="h-[230px] w-[100%]"
        />
      </div>
      <div className="mt-3 font-roboto text-sm flex justify-between">
        <p className="font-semibold ps-3 text-sm">
          {name} <br />{" "}
          <span className="text-gray-700 font-normal text-xs">
            By {builder}
          </span>
        </p>
        <p className="font-semibold text-[#EB664E] text-lg">
          ₹{toINRCr(price)}*
        </p>
      </div>
      <div className="flex items-center mt-3">
        <LocationOnIcon
          sx={{
            color: "darkblue",
            fontSize: "18px",
            paddingBottom: "3px",
          }}
        />
        <p className="text-xs">{location}</p>
      </div>
      <div className="flex gap-3 justify-between mt-5 font-roboto">
        <div className="flex gap-1 items-center">
          <HomeIcon sx={{ color: "darkblue", fontSize: "18px" }} />
          <p className="text-xs">{unit} BHK</p>
        </div>
        <div className="flex gap-1 items-center">
          <SquareFootIcon sx={{ color: "darkblue", fontSize: "18px" }} />
          <p className="text-xs">{size} sq.ft</p>
        </div>
        <div className="flex gap-1 items-center">
          <CurrencyRupeeIcon sx={{ color: "darkblue", fontSize: "18px" }} />
          <p className="text-xs">{Math.trunc(price / size)} / sq.ft.</p>
        </div>
      </div>

      <div className="mt-5 flex gap-3">
        <div className="flex-1">
          <Link to={`/project/${id}`}>
            <Button
              fullWidth
              variant="outlined"
              sx={{
                backgroundColor: "#03002e",
                color: "#fff",
                textTransform: "none",
              }}
            >
              View Details
            </Button>
          </Link>
        </div>
        <div className="flex-1">
          <Button
            onClick={handleOpen}
            fullWidth
            variant="contained"
            color="success"
            startIcon={<CallIcon />}
            sx={{ color: "#fff", textTransform: "none" }}
          >
            Enquiry
          </Button>
        </div>
      </div>

      <PropertyEnquiryForm id={id} handleClose={handleClose} open={open} />

      <div className="absolute top-[20px]">
        <Button
          endIcon={<DoneIcon />}
          size="small"
          variant="contained"
          color="success"
          sx={{ borderRadius: "0px", height: "25px" }}
        >
          RERA
        </Button>
      </div>
    </div>
  );
};
