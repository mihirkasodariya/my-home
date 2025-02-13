const Contact = require("../models/contact");

// Submit a Enquiry
const createContact = async (req, res) => {
  const { name, email, phone, message } = req.body;
  const contact = new Contact({ name, email, phone, message });
  try {
    await contact.save();
    res.status(201).json({
      success: true,
      message: "Contact Form submitted successfully",
      contact,
    });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ success: "false", message: "Internal Server Error" });
  }
};

// Fetch all Enquiries
const getContacts = async (req, res) => {
  try {
    const contact = await Contact.find();
    res.status(200).json({
      success: true,
      message: "All contact fetched!",
      contact,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Delet a Query
const deleteContacts = async (req, res) => {
  try {
    const contactId = req.params.id;

    const deletedContact = await Contact.findByIdAndDelete(contactId);

    if (!deletedContact) {
      return res.status(404).json({
        success: false,
        message: "Contact not found",
      });
    }

    const contact = await Contact.find();

    res.status(200).json({
      success: true,
      message: "Contact deleted successfully",
      contact,
    });
  } catch (err) {
    console.log(err);
    res.status(200).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  createContact,
  getContacts,
  deleteContacts,
};
