const express = require("express");
const {
  getPosts,
  getPost,
  updatePost,
  deletePost,
  createPost,
  deleteAll,
} = require("../controllers/authController");
const router = express.Router();

router.post("/", createPost);
router.get("/", getPosts);
router.get("/:id", getPost);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);
router.delete("/", deleteAll);

module.exports = router;
