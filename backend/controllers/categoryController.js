const Category = require("../models/category");
const Property = require("../models/property");

// Create a Category
const createCategory = async (req, res) => {
  const { name } = req.body;
  const category = new Category({ name });
  try {
    await category.save();
    res.status(201).json({
      success: true,
      message: "Category created successfully",
      category,
    });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ success: "false", message: "Internal Server Error" });
  }
};

//Get Categories
const getCategory = async (req, res) => {
  try {
    const category = await Category.find();
    res.status(200).json({
      success: true,
      message: "All categories fetched!",
      category,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Delete a Category
const deleteCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;

    // Check if any property is associated with this category
    const propertyExists = await Property.findOne({ category: categoryId });

    if (propertyExists) {
      return res.status(400).json({
        success: false,
        message:
          "Category cannot be deleted as properties are associated with it",
      });
    }

    // Proceed with deletion if no associated properties are found
    const deletedCategory = await Category.findByIdAndDelete(categoryId);

    if (!deletedCategory) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    const categories = await Category.find();

    res.status(200).json({
      success: true,
      message: "Category deleted successfully",
      categories,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  createCategory,
  getCategory,
  deleteCategory,
};
