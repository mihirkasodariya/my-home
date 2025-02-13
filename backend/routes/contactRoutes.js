const express = require("express");
const router = express.Router();

const {
  createContact,
  getContacts,
  deleteContacts,
} = require("../controllers/contactController");

router.route("/").get(getContacts).post(createContact);

router.route("/:id").delete(deleteContacts);

module.exports = router;
