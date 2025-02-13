const Admin = require("../models/admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find admin by email
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    // Generate a token
    const token = jwt.sign(
      { id: admin._id, email: admin.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h", // token expiry
      }
    );
    res.json({
      success: true,
      message: "Login successful",
      token,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const logoutAdmin = async (req, res) => {
  res.json({ success: true, message: "Logout successful" });
};

module.exports = { loginAdmin, logoutAdmin };

