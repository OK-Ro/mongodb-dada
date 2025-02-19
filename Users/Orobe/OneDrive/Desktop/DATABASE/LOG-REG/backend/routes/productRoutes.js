const express = require("express");
const { addProduct, getProduct } = require("../controllers/poductController");
const AuthMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/", AuthMiddleware, addProduct);
router.get("/", AuthMiddleware, getProduct);

module.exports = router;
