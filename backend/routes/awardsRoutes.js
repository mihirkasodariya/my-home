const express = require("express");
const upload = require("../middleware/uploadMiddleware"); // Adjust the path if needed
const {
  getAwards,
  createAwards,
  deleteAwards,
} = require("../controllers/awardController");

const router = express.Router();

// Route to get all amenities and create a new amenity
router.route("/").get(getAwards).post(upload, createAwards); // Use upload middleware for both image and pdf

// Route to get, delete, or update a specific amenity by ID
router.route("/:id").delete(deleteAwards);

module.exports = router;
