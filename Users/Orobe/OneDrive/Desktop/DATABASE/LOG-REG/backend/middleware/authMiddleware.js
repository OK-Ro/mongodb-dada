const jwt = require("jsonwebtoken");

const AuthMiddleware = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!token)
      return res.status(400).json({ error: "Access denied Invalid token" });
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(500).json({ error: "Invalid Token" });
  }
};

module.exports = AuthMiddleware;
