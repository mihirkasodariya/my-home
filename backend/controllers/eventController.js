const fs = require("fs");
const path = require("path");
const Event = require("../models/events");

// Create Event
const createEvent = async (req, res) => {
  try {
    const { title, description } = req.body;
    const image = [];
    const paths = req.files;

    paths.forEach((path, index) => {
      image[index] = path.path;
    });

    // Create a new event instance
    const newEvent = new Event({
      title,
      description,
      image,
    });

    // Save the event to the database
    await newEvent.save();

    // Send a success response
    res.status(201).json({
      success: true,
      message: "Event created successfully",
      event: newEvent,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

// Get Event
const getEvent = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json({
      success: true,
      message: "Data fetched successfully",
      events,
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

// Get Single Event
const getSingleEvent = async (req, res) => {
  try {
    const { id } = req.params;

    const event = await Event.findById(id);

    // If the event doesn't exist, return 404
    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    // Return the found event data
    res.status(200).json({
      success: true,
      message: "Event fetched successfully",
      event,
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
// Delete Event
const deleteEvent = async (req, res) => {
  try {
    const eventId = req.params.id;

    // Find the event in the database
    const deletedEvent = await Event.findById(eventId);

    // If the event doesn't exist, return 404
    if (!deletedEvent) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    // Prepare paths to delete images
    const imagePaths = [];

    // Check if the event has associated images (assuming it's an array of image URLs)
    if (deletedEvent.image && Array.isArray(deletedEvent.image)) {
      deletedEvent.image.forEach((item) => {
        // Construct the full path of the image to be deleted
        const imagePath = path.join(
          __dirname,
          "..",
          "uploads/events", // Correct folder based on where your images are stored
          path.basename(item)
        );
        imagePaths.push(imagePath);
      });
    }

    // Delete images from the file system
    if (imagePaths.length > 0) {
      imagePaths.forEach((filePath) => {
        if (fs.existsSync(filePath)) {
          // Asynchronous file deletion
          fs.unlink(filePath, (err) => {
            if (err) {
              console.error(`Failed to delete image: ${filePath}`, err);
            } else {
              console.log(`Image deleted: ${filePath}`);
            }
          });
        }
      });
    }

    // Delete the event from the database
    await Event.findByIdAndDelete(eventId);

    // Respond with success message
    res.status(200).json({
      success: true,
      message: "Event and associated images deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message || error,
    });
  }
};

module.exports = { createEvent, getEvent, getSingleEvent, deleteEvent };
