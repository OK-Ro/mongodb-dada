const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
const Client = require("../models/Client");

const AuthMiddleware = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!token) {
      return res
        .status(400)
        .json({ message: "Access Denied. No token provided." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role === "admin") {
      req.admin = await Admin.findById(decoded.userId);
      if (!req.admin) {
        return res.status(403).json({ message: "Admin not found." });
      }
    } else if (decoded.role === "client") {
      req.client = await Client.findById(decoded.userId);
      if (!req.client) {
        return res.status(403).json({ message: "Client not found." });
      }
    } else {
      return res.status(403).json({ message: "Invalid role." });
    }

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token." });
  }
};

module.exports = AuthMiddleware;
