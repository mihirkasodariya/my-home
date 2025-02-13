const multer = require("multer");
const path = require("path");

// Set up the storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let uploadPath;

    if (req.originalUrl.includes("/api/v1/news")) {
      uploadPath = "uploads/news/";
    } else if (req.originalUrl.includes("/api/v1/properties")) {
      uploadPath = "uploads/properties/";
    } else if (req.originalUrl.includes("/api/v1/amenities")) {
      uploadPath = "uploads/amenities/";
    } else if (req.originalUrl.includes("/api/v1/brochures")) {
      uploadPath = "uploads/brochures/";
    } else if (req.originalUrl.includes("/api/v1/property")) {
      uploadPath = "uploads/property/";
    } else if (req.originalUrl.includes("/api/v1/events")) {
      uploadPath = "uploads/events/";
    } else if (req.originalUrl.includes("/api/v1/awards")) {
      uploadPath = "uploads/awards/";
    } else if (req.originalUrl.includes("/api/v1/testimonials")) {
      uploadPath = "uploads/testimonials/";
    } else {
      uploadPath = "uploads/";
    }

    cb(null, uploadPath); // Set the destination folder
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // File name
  },
});

// File filter to accept images and PDFs
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png"
    // || file.mimetype === "application/pdf" // Allow PDF
  ) {
    cb(null, true); // Accept the file
  } else {
    cb(
      new Error("Only image types (jpeg, jpg, png) and PDF files are allowed!"),
      false
    ); // Reject other file types
  }
};

// Set up multer middleware to handle both image and PDF
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5, // Limit files to 5MB
  },
  fileFilter: fileFilter,
}).array("image");

module.exports = upload;
