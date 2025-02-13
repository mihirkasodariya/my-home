const express = require("express");
const upload = require("../middleware/uploadMiddleware"); // Import the upload middleware
const {
  getBrochure,
  getSingleBrochure,
  createBrochure,
  deleteBrochure,
  updateBrochure,
} = require("../controllers/brochureController");

const router = express.Router();

// Use upload middleware and createBrochure function as the callback
router.route("/").get(getBrochure).post(upload, createBrochure);

router
  .route("/:id")
  .get(getSingleBrochure)
  .delete(deleteBrochure)
  .patch(upload, updateBrochure);

module.exports = router;
