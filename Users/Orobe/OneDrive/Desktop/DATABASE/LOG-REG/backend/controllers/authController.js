const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { firstName, surName, email, password, role } = req.body;

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: "Email is already in use" });
    }

    // Validate that all required fields are present
    if (!firstName || !surName || !email || !password || !role) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Hash the password
    const hashPassword = await bcrypt.hash(password, 10);

    // Create new user
    user = new User({
      firstName,
      surName,
      email,
      password: hashPassword,
      role,
    });

    // Save the user to the database
    await user.save();

    // Send success response
    res.status(200).json({
      message: "User created successfully",
      user,
    });
  } catch (error) {
    // Handle unexpected errors
    console.error(error);
    res.status(500).json({ error: "An error occurred, please try again" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
