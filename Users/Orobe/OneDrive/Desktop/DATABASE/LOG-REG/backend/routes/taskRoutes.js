const express = require("express");
const {
  createTask,
  getTask,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");
const AuthMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", AuthMiddleware, createTask);
router.get("/:id", AuthMiddleware, getTask);
router.put("/:id", AuthMiddleware, updateTask);
router.delete("/:id", AuthMiddleware, deleteTask);

module.exports = router;
