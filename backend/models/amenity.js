const mongoose = require("mongoose");

const amenitySchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["society_amenity", "flat_amenity", "location_advantages"],
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const Amenity = mongoose.model("Amenity", amenitySchema);

module.exports = Amenity;
