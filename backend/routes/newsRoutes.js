const express = require("express");
const upload = require("../middleware/uploadMiddleware"); // Import the upload middleware
const router = express.Router();

const {
  getNews,
  createNews,
  deleteNews,
  updateNews,
  getSingleNews,
  getTotalNews,
} = require("../controllers/newsController");

// Route to get all news and create a new news post
router.route("/").get(getNews).post(upload, createNews);

router.route("/total-news").get(getTotalNews);

// Route to get, update, or delete specific news by ID
router
  .route("/:id")
  .get(getSingleNews)
  .patch(upload, updateNews)
  .delete(deleteNews);

module.exports = router;
