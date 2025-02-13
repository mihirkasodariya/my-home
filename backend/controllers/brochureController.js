const fs = require("fs");
const path = require("path");
const Brochure = require("../models/brochure");

// Create brochure
const createBrochure = async (req, res) => {
  try {
    const { name, location } = req.body;

    // Retrieve the uploaded image and pdf paths
    const image = req.files["image"] ? req.files["image"][0].path : null;
    const pdf = req.files["pdf"] ? req.files["pdf"][0].path : null;

    const newBrochure = new Brochure({
      name,
      location,
      image,
      pdf,
    });

    await newBrochure.save();

    res.status(201).json({
      success: true,
      message: "Brochure created successfully!",
      brochure: newBrochure,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Fetch all the brochures
const getBrochure = async (req, res) => {
  try {
    const brochure = await Brochure.find();
    res.status(200).json({
      success: true,
      message: "All brochures fetched !",
      brochure,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err,
    });
  }
};

// Fetch a single Brochure
const getSingleBrochure = async (req, res) => {
  try {
    const brochureId = req.params.id;
    const brochure = await Brochure.findById(brochureId);

    if (!brochure) {
      return res
        .status(404)
        .json({ success: false, message: "Brochure not found" });
    }

    res.status(200).json({
      success: true,
      message: "Brochure found!",
      brochure,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Intenal Server Error",
      error,
    });
  }
};

// Delete a brochure
const deleteBrochure = async (req, res) => {
  try {
    const brochureId = req.params.id;
    const deletedBrochure = await Brochure.findByIdAndDelete(brochureId);

    if (!deletedBrochure) {
      return res.status(404).json({
        success: false,
        message: "Brochure not found",
      });
    }

    const imagePath = path.join(
      __dirname,
      "..",
      "uploads/brochures",
      path.basename(deletedBrochure.image)
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

    const pdfPath = path.join(
      __dirname,
      "..",
      "uploads/brochures",
      path.basename(deletedBrochure.pdf)
    );

    // Check if the pdf file exists before deleting it
    fs.access(pdfPath, fs.constants.F_OK, (err) => {
      if (!err) {
        fs.unlink(pdfPath, (err) => {
          if (err) {
            console.error("Failed to delete PDF file:", err);
          } else {
            console.log("PDF file deleted:", pdfPath);
          }
        });
      } else {
        console.log("PDF file not found:", pdfPath);
      }
    });

    const brochure = await Brochure.find();

    res.status(200).json({
      success: true,
      message: "Brochure deleted successfully",
      brochure,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error,
    });
  }
};

// Update Brochure
const updateBrochure = async (req, res) => {
  try {
    const brochureId = req.params.id;
    const { name, location } = req.body;

    // Fetch the current brochure document
    const existingBrochure = await Brochure.findById(brochureId);

    if (!existingBrochure) {
      return res.status(404).json({
        success: false,
        message: "Brochure not found",
      });
    }

    let updatedFields = { name, location };

    // Handle image upload
    if (req.files && req.files.image) {
      const imagePath = req.files.image[0].path;
      updatedFields.image = imagePath;

      if (existingBrochure.image) {
        const oldImagePath = path.join(__dirname, "..", existingBrochure.image);
        fs.unlink(oldImagePath, (err) => {
          if (err) {
            console.error(`Error deleting old image: ${err.message}`);
          }
        });
      }
    }

    // Handle PDF upload
    if (req.files && req.files.pdf) {
      const pdfPath = req.files.pdf[0].path;
      updatedFields.pdf = pdfPath;

      if (existingBrochure.pdf) {
        const oldPdfPath = path.join(__dirname, "..", existingBrochure.pdf);
        fs.unlink(oldPdfPath, (err) => {
          if (err) {
            console.error(`Error deleting old PDF: ${err.message}`);
          }
        });
      }
    }

    // Update the brochure item
    const updatedBrochure = await Brochure.findByIdAndUpdate(
      brochureId,
      updatedFields,
      { new: true }
    );

    // Send success response
    res.status(200).json({
      success: true,
      message: "Brochure updated successfully",
      brochure: updatedBrochure,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error,
    });
  }
};

module.exports = {
  createBrochure,
  getBrochure,
  getSingleBrochure,
  deleteBrochure,
  updateBrochure,
};
