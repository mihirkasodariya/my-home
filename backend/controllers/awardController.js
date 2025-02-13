const fs = require("fs");
const path = require("path");
const Awards = require("../models/awards");

// Create Awards
const createAwards = async (req, res) => {
  try {
    const imagePath = req.files && req.files[0]?.path;
    const awards = new Awards({
      image: imagePath,
    });

    await awards.save();

    res.status(201).json({
      success: true,
      message: "Awards created successfully",
      awards,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }
};

// Fetch all the awards
const getAwards = async (req, res) => {
  try {
    const awards = await Awards.find();
    res.status(201).json({
      success: true,
      message: "All Awards fetched !",
      awards,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const deleteAwards = async (req, res) => {
  try {
    const awardId = req.params.id;

    // Proceed to delete the amenity if it is not associated with any property
    const deletedAward = await Awards.findByIdAndDelete(awardId);

    if (!deletedAward) {
      return res.status(404).json({
        success: false,
        message: "Award not found",
      });
    }

    // Get the path to the image and delete it from the uploads folder
    const imagePath = path.join(
      __dirname,
      "..",
      "uploads/awards",
      path.basename(deletedAward.image)
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
        console.error("Image file not found:", err);
      }
    });

    const awards = await Awards.find();

    res.status(200).json({
      success: true,
      message: "Award deleted successfully",
      awards,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = { createAwards, getAwards, deleteAwards };
