const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
const Client = require("../models/Client");

exports.register = async (req, res) => {
  try {
    const { firstName, surName, email, password, role } = req.body;

    let user;
    if (role === "admin") {
      user = await Admin.findOne({ email });
    } else if (role === "client") {
      user = await Client.findOne({ email });
    }

    if (user) {
      return res.status(400).json({ error: "Email is already in use" });
    }

    // Validate that all required fields are present
    if (!firstName || !surName || !email || !password || !role) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Hash the password
    const hashPassword = await bcrypt.hash(password, 10);

    if (role === "admin") {
      user = new Admin({
        firstName,
        surName,
        email,
        password: hashPassword,
        role,
      });
    } else if (role === "client") {
      user = new Client({
        firstName,
        surName,
        email,
        password: hashPassword,
        role,
      });
    }

    // Save the user to the database
    await user.save();

    // Send success response
    res.status(200).json({
      message: "User created successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({ error: "An error occurred, please try again" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await Admin.findOne({ email });
    if (!user) {
      user = await Client.findOne({ email });
    }

    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Send response
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        surName: user.surName,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "An error occurred, please try again" });
  }
};
