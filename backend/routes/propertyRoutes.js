const express = require("express");
const upload = require("../middleware/uploadMiddleware");
const {
  getProperty,
  getSingleProperty,
  createProperty,
  deleteProperty,
  searchProperty,
  getTotalProperties,
  recentProperty,
  updateProperty,
} = require("../controllers/propertyController");

const router = express.Router();

router.route("/search").get(searchProperty);
router.get("/total-properties", getTotalProperties);  
router.get("/recent-properties", recentProperty);  

router.route("/").get(getProperty).post(upload, createProperty);

router.route("/:id").get(getSingleProperty).delete(deleteProperty).patch(upload, updateProperty);


module.exports = router;
