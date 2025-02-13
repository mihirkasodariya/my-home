const express = require("express");
const router = express.Router();

const {
  createCategory,
  getCategory,
  deleteCategory,
} = require("../controllers/categoryController");

router.route("/").get(getCategory).post(createCategory);

router.route("/:id").delete(deleteCategory);

module.exports = router;
