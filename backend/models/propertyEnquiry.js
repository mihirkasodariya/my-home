const mongoose = require("mongoose");
const Property = require("../models/property");

const propertyEnquirySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    mobile: {
      type: Number,
      required: true,
    },
    property: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
      required: true,
    },
    reason: {
      type: String,
      enum: ["investment", "business"],
      required: true,
    },
    dealer: {
      type: String,
      enum: ["yes", "no"],
      required: true,
    },
  },
  { timestamps: true }
);

const propertyEnquiry = mongoose.model(
  "propertyEnquiry",
  propertyEnquirySchema
);

module.exports = propertyEnquiry;
