require("dotenv").config();

const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.log(err);
  }
};


module.exports = connectDb;
