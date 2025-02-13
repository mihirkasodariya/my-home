const express = require("express");
const {
  createPropertyEnquiry,
  getPropertyEnquiry,
  getTotalPropertyEnquiry,
} = require("../controllers/propertyEnquiryController");

const router = express.Router();

router.route("/").post(createPropertyEnquiry).get(getPropertyEnquiry);

router.route("/total-enquiry").get(getTotalPropertyEnquiry);

module.exports = router;
