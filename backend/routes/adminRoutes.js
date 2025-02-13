const express = require("express");
const { loginAdmin, logoutAdmin } = require("../controllers/adminController");
const adminAuth = require("../middleware/adminAuth");

const router = express.Router();
console.log('jnkn')
router.post("/login", loginAdmin);
router.post("/logout", adminAuth, logoutAdmin);

module.exports = router;
