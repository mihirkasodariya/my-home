const mongoose = require("mongoose");

const brochureSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  pdf: {
    type: String,
    required: true,
  },
});

const Brochure = mongoose.model("Brochure", brochureSchema);

module.exports = Brochure;
