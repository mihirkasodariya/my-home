const express = require("express");
const upload = require("../middleware/uploadMiddleware"); // Adjust the path if needed
const {
  getTestimonials,
  createTestimonials,
  deleteTestimonial,
  updateTestimonial,
  getSingleTestimonial,
} = require("../controllers/testimonialController");

const router = express.Router();

// Route to get all amenities and create a new amenity
router.route("/").get(getTestimonials).post(upload, createTestimonials);

// Route to get, delete, or update a specific amenity by ID
router
  .route("/:id")
  .delete(deleteTestimonial)
  .get(getSingleTestimonial)
  .patch(upload, updateTestimonial);

module.exports = router;
