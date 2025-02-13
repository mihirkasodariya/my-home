const express = require("express");
const upload = require("../middleware/uploadMiddleware"); // Adjust the path if needed

const {
  getAmenity,
  createAmenity,
  deleteAmenity,
  getSingleAmenity,
  updateAmenity,
} = require("../controllers/amenityController");

const router = express.Router();

// Route to get all amenities and create a new amenity
router
  .route("/")
  .get(getAmenity)
  .post(upload, createAmenity); // Use upload middleware for both image and pdf

// Route to get, delete, or update a specific amenity by ID
router
  .route("/:id")
  .get(getSingleAmenity)
  .delete(deleteAmenity)
  .patch(upload, updateAmenity); // Use upload middleware for both image and pdf on update

module.exports = router;
