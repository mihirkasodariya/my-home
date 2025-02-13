const fs = require("fs");
const path = require("path");
const Property = require("../models/property");
const Category = require("../models/category");
const Amenity = require("../models/amenity");

// Get all Properties
const getProperty = async (req, res) => {
  try {
    const properties = await Property.find()
      .populate("category", "name")
      .populate("amenities", "name type");

    res.status(200).json({
      success: true,
      message: "Property successfully fetched!",
      properties,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      messsage: "Internal Server Error",
      error,
    });
  }
};

// Get Single Property
const getSingleProperty = async (req, res) => {
  try {
    const propertyId = req.params.id;
    const property = await Property.findById(propertyId)
      .populate("category", "name")
      .populate("amenities", "name type image");

    if (!property) {
      res.status(404).json({
        success: false,
        message: "Property not found!",
      });
    }

    res.status(200).json({
      success: true,
      message: "Property successfully found!",
      property,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error,
    });
  }
};

// Create a property
const createProperty = async (req, res) => {
  try {
    const {
      category,
      name,
      builder,
      unit,
      size,
      price,
      location,
      description,
      address,
      furnishType,
      amenities,
    } = req.body;

    const image = [];
    const paths = req.files;

    paths.forEach((path, index) => {
      image[index] = path.path;
    });

    // const propertyImages = req.files.propertyImages.map((file) => file.path);
    // const brochure = req.files.brochure[0].path;

    const newProperty = new Property({
      category,
      name,
      builder,
      unit,
      size,
      price,
      location,
      description,
      address,
      furnishType,
      amenities,
      image,
    });

    await newProperty.save();

    res.status(201).json({
      success: true,
      message: "Property created successfully",
      property: newProperty,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// Update a Property
const updateProperty = async (req, res) => {
  try {
    const propertyId = req.params.id;

    const {
      category,
      name,
      builder,
      unit,
      size,
      price,
      location,
      description,
      address,
      furnishType,
      amenities,
    } = req.body;

    // Find the property by ID
    const property = await Property.findById(propertyId);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    const newImages = [];
    const newPaths = req.files;

    if (newPaths && newPaths.length > 0) {
      // Delete old images
      if (property.image && property.image.length > 0) {
        property.image.forEach((ele) => {
          const imagePath = path.join(__dirname, "../", ele);
          if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
          }
        });
      }

      // Save new images
      newPaths.forEach((path, index) => {
        newImages[index] = path.path;
      });
    }

    // Update the property fields
    property.category = category || property.category;
    property.name = name || property.name;
    property.builder = builder || property.builder;
    property.unit = unit || property.unit;
    property.size = size || property.size;
    property.price = price || property.price;
    property.location = location || property.location;
    property.description = description || property.description;
    property.address = address || property.address;
    property.furnishType = furnishType || property.furnishType;
    property.amenities = amenities || property.amenities;
    if (newImages.length > 0) {
      property.image = newImages;
    }

    // Save the updated property
    await property.save();

    res.status(200).json({
      success: true,
      message: "Property updated successfully",
      property,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// Delete a property
const deleteProperty = async (req, res) => {
  try {
    const propertyId = req.params.id;

    // Find the property by ID
    const property = await Property.findById(propertyId);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    // Delete the brochure if it exists
    // const brochurePath = path.join(__dirname, "../", property.brochure);
    // if (property.brochure && fs.existsSync(brochurePath)) {
    //   fs.unlinkSync(brochurePath);
    // }

    // Delete property images if they exist
    if (property.image && property.image.length > 0) {
      property.image.forEach((ele) => {
        const imagePath = path.join(__dirname, "../", ele);
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }
      });
    }

    // Delete the property from the database
    await Property.findByIdAndDelete(propertyId);

    // Return success response
    return res.status(200).json({
      success: true,
      message: "Property and associated files deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// Search Property
const searchProperty = async (req, res) => {
  console.log("Search Property Request:", req.query);
  try {
    const { query } = req.query;
    if (!query) {
      return res.status(400).json({
        success: false,
        message: "Query parameter is required",
      });
    }

    // Use a regular expression for case-insensitive search
    const searchRegex = new RegExp(query, "i");

    const properties = await Property.find({
      $or: [
        { name: searchRegex },
        { location: searchRegex },
        { address: searchRegex },
        { city: searchRegex },
        { state: searchRegex },
      ],
    })
      .populate("category", "name")
      .populate("amenities", "name type");

    if (properties.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No properties found matching your search.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Properties successfully fetched!",
      properties,
    });
  } catch (error) {
    console.log("Error in searchProperty:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error,
    });
  }
};

// Count number of Property
const getTotalProperties = async (req, res) => {
  try {
    const totalProperties = await Property.countDocuments({}); // Assuming you are using MongoDB
    res.status(200).json({ success: true, totalProperties });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

// Recent Property - Fetch latest 5 properties based on createdAt
const recentProperty = async (req, res) => {
  try {
    const recentProperties = await Property.find()
      .sort({ createdAt: -1 }) // Sort by createdAt in descending order (latest first)
      .limit(6); // Limit to 5 properties

    if (recentProperties.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No recent properties found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Recent properties fetched successfully!",
      properties: recentProperties,
    });
  } catch (error) {
    console.log("Error in recentProperty:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error,
    });
  }
};

module.exports = {
  getProperty,
  getSingleProperty,
  createProperty,
  updateProperty,
  deleteProperty,
  searchProperty,
  getTotalProperties,
  recentProperty,
};
