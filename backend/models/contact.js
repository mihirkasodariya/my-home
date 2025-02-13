const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: false },
    phone: { type: String, required: true },
    message: { type: String, required: false },
  },
  { timestamps: true }
);

const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;
