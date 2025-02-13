const mongoose = require("mongoose");

const testimonialSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  review: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const Testimonials = mongoose.model("Testimonials", testimonialSchema);
module.exports = Testimonials;