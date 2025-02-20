const express = require("express");
const {
  addProduct,
  getProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/poductController");
const AuthMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/", AuthMiddleware, addProduct);
router.get("/", AuthMiddleware, getProduct);
router.put("/:id", AuthMiddleware, updateProduct);
router.delete("/:id", AuthMiddleware, deleteProduct);

module.exports = router;
