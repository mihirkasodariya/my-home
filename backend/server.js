// Use Environment Variables
require("dotenv").config();

// Importing Libraries
const express = require("express");
const cors = require("cors");
const connectDb = require("./config/connectDb");
const app = express();

// Router
const contactRoutes = require("./routes/contactRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const amenityRoutes = require("./routes/amenityRoutes");
const newsRoutes = require("./routes/newsRoutes");
const eventRoutes = require("./routes/eventRoutes");
const adminRoutes = require("./routes/adminRoutes");
const brochureRoutes = require("./routes/brochureRoutes");
const propertyRoutes = require("./routes/propertyRoutes");
const propertyEnquiryRoutes = require("./routes/propertyEnquiryRoutes");
const awardsRoutes = require("./routes/awardsRoutes");
const testimonialRoutes = require("./routes/testimonialRoutes");

// Middleware
const corsOptions = {
  origin: 'http://localhost:5173', // Allow only the frontend domain
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'], // Adjust allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow these headers
};
app.use(cors(corsOptions));
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use(express.urlencoded({ extended: true }));

// Database Connection
connectDb();

// API Routes
app.use("/api/v1/contact", contactRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/amenities", amenityRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/news", newsRoutes);
app.use("/api/v1/events", eventRoutes);
app.use("/api/v1/brochures", brochureRoutes);
app.use("/api/v1/property", propertyRoutes);
app.use("/api/v1/property-enquiry", propertyEnquiryRoutes);
app.use("/api/v1/awards", awardsRoutes);
app.use("/api/v1/testimonials", testimonialRoutes);


app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
