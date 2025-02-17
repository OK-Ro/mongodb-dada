const jwt = require("jsonwebtoken");

const AuthMiddleware = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!token)
      return res
        .status(400)
        .json({ error: "Access denied, token not provided" });
    const decoded = jwt.sign(token, process.env.JWT_SECRET);
    req.user = decoded;

    next();
  } catch (error) {
    res.status(500).json({ error: "Invalid token" });
  }
};
module.exports = AuthMiddleware;
