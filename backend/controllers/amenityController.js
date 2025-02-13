const fs = require("fs");
const path = require("path");
const Amenity = require("../models/amenity");
const Property = require("../models/property");
      
// Create a Amenity
const createAmenity = async (req, res) => {
  try {
    const imagePath =  req.files && req.files[0]?.path;
    const { type, name } = req.body;

    const amenity = new Amenity({
      type,
      name,
      image: imagePath,
    });

    await amenity.save();

    res.status(201).json({
      success: true,
      message: "Amenity created successfully",
      amenity,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }
};

// Fetch all the amenities
const getAmenity = async (req, res) => {
  try {
    const amenity = await Amenity.find();
    res.status(201).json({
      success: true,
      message: "All amenities fetched !",
      amenity,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Fetch the single amenity
const getSingleAmenity = async (req, res) => {
  try {
    const amenityId = req.params.id;
    const amenity = await Amenity.findById(amenityId);

    if (!amenity) {
      return res
        .status(404)
        .json({ success: false, message: "Amenity not found" });
    }

    res.status(200).json({
      success: true,
      message: "Amenity found successfully",
      amenity,
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

// Update a amenity
const updateAmenity = async (req, res) => {
  try {
    const amenityId = req.params.id;
    const { type, name } = req.body;

    // Fetch the current news document
    const existingAmenity = await Amenity.findById(amenityId);

    if (!existingAmenity) {
      return res.status(404).json({
        success: false,
        message: "Amenity not found",
      });
    }

    let updatedFields = {
      type,
      name,
    };

    // Check if a new image was uploaded
    if (req.files) {
      const imagePath = req.files && req.files[0]?.path;
      updatedFields.image = imagePath;

      // Delete the old image if it exists
      if (existingAmenity.image) {
        const oldImagePath = path.join(__dirname, "..", existingAmenity.image); // Construct the full path
        fs.unlink(oldImagePath, (err) => {
          if (err) {
            console.error(`Error deleting old image: ${err.message}`);
          }
        });
      }
    }

    // Update the news item
    const updatedAmenity = await Amenity.findByIdAndUpdate(
      amenityId,
      updatedFields,
      {
        new: true, // Return the updated document
      }
    );

    // Send success response
    res.status(200).json({
      success: true,
      message: "Record updated successfully",
      amenity: updatedAmenity,
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

const deleteAmenity = async (req, res) => {
  try {
    const amenityId = req.params.id;

    // Check if any property is using the amenity
    const associatedProperty = await Property.findOne({
      amenities: amenityId,
    });

    if (associatedProperty) {
      return res.status(400).json({
        success: false,
        message: "Amenity cannot be deleted as it is associated with a property.",
      });
    }

    // Proceed to delete the amenity if it is not associated with any property
    const deletedAmenity = await Amenity.findByIdAndDelete(amenityId);

    if (!deletedAmenity) {
      return res.status(404).json({
        success: false,
        message: "Amenity not found",
      });
    }

    // Get the path to the image and delete it from the uploads folder
    const imagePath = path.join(
      __dirname,
      "..",
      "uploads/amenities",
      path.basename(deletedAmenity.image)
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

    const amenities = await Amenity.find();

    res.status(200).json({
      success: true,
      message: "Amenity deleted successfully",
      amenities,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  createAmenity,
  getAmenity,
  getSingleAmenity,
  updateAmenity,
  deleteAmenity,
};
