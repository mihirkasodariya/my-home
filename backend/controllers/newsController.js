const fs = require("fs");
const path = require("path");
const News = require("../models/news");

//Create a News
const createNews = async (req, res) => {
  try {
    const imagePath = req.files && req.files[0]?.path;
    const { title, url } = req.body;

    const news = new News({
      title,
      url,
      image: imagePath,
    });

    await news.save();
    res
      .status(201)
      .json({ success: true, message: "News created successfully", news });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ success: false, message: "Internal Server Error", error: err });
  }
};

// Get all News
const getNews = async (req, res) => {
  try {
    const news = await News.find();
    res
      .status(200)
      .json({ success: true, message: "Data fetched successfully!", news });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err,
    });
  }
};

// Get single News
const getSingleNews = async (req, res) => {
  try {
    const newsId = req.params.id;
    const news = await News.findById(newsId);
    if (!news) {
      return res
        .status(404)
        .json({ success: false, message: "News not found" });
    }

    res.status(200).json({
      success: true,
      message: "News found successfully",
      news,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      err,
    });
  }
};

// Update a News
const updateNews = async (req, res) => {
  try {
    const newsId = req.params.id;
    const { title, url } = req.body;

    // Fetch the current news document
    const existingNews = await News.findById(newsId);
    if (!existingNews) {
      return res.status(404).json({
        success: false,
        message: "News not found",
      });
    }

    let updatedFields = {
      title,
      url,
    };

    // Check if a new image was uploaded
    if (req.files) {
      const imagePath = req.files && req.files[0]?.path;
      updatedFields.image = imagePath;

      // Delete the old image if it exists
      if (existingNews.image) {
        const oldImagePath = path.join(__dirname, "..", existingNews.image);

        fs.unlink(oldImagePath, (err) => {
          if (err) {
            console.error(`Error deleting old image: ${err.message}`);
          }
        });
      }
    }

    // Update the news item
    const updatedNews = await News.findByIdAndUpdate(newsId, updatedFields, {
      new: true, // Return the updated document
    });

    // Send success response
    res.status(200).json({
      success: true,
      message: "Record updated successfully",
      news: updatedNews,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err,
    });
  }
};

// Delete a news
const deleteNews = async (req, res) => {
  try {
    const newsId = req.params.id;
    const deletedNews = await News.findByIdAndDelete(newsId);

    if (!deletedNews) {
      return res.status(404).json({
        success: false,
        message: "News not found",
      });
    }

    // Get the path to the image and delete it from the uploads folder
    const imagePath = path.join(
      __dirname,
      "..",
      "uploads/news",
      path.basename(deletedNews.image)
    );

    // Check if the image file exists before deleting it
    fs.access(imagePath, fs.constants.F_OK, (err) => {
      if (!err) {
        // If file exists, delete it
        fs.unlink(imagePath, (err) => {
          if (err) {
            console.error("Failed to delete image file:", err);
          } else {
            console.log("Image file deleted:", imagePath);
          }
        });
      } else {
        console.log(err);
      }
    });

    const news = await News.find();
    res.status(200).json({
      success: true,
      message: "News deleted successfully",
      news,
    });
  } catch (err) {
    console.log(err);
    res.status(200).json({
      success: false,
      message: "Internal Server Error",
      error: err,
    });
  }
};

// Count number of Property Enquiry
const getTotalNews = async (req, res) => {
  try {
    const totalNews = await News.countDocuments({}); // Assuming you are using MongoDB
    res.status(200).json({ success: true, totalNews });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

module.exports = {
  createNews,
  getNews,
  getSingleNews,
  updateNews,
  deleteNews,
  getTotalNews
};
