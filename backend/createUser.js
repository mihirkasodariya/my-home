require("dotenv").config(); // Load environment variables
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const Admin = require("./models/admin"); // Path to your admin model
const connectDb = require("./config/connectDb"); // Path to your database connection

// Function to create admin
const createAdmin = async () => {
  // Connect to MongoDB
  await connectDb();

  // Admin details
  const email = "admin@gmail.com"; // Replace with your email
  const password = "admin123";    // Replace with your password

  try {
    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      console.log("Admin already exists!");
      return;
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new admin
    const newAdmin = new Admin({
      email,
      password: hashedPassword,
    });

    // Save the admin to the database
    await newAdmin.save();

    console.log("Admin created successfully!");
  } catch (err) {
    console.error("Error creating admin:", err);
  } finally {
    // Close the database connection
    mongoose.connection.close();
  }
};

// Run the function
createAdmin();
