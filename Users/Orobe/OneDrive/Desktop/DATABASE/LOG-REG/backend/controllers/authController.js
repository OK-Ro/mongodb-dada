const { default: mongoose } = require("mongoose");
const Post = require("../models/Post");

exports.createPost = async (req, res) => {
  try {
    const { title, content, author, imageUrl } = req.body;

    if (!title || !content || !author) {
      return res
        .status(400)
        .json({ error: "Title, content, and author are required." });
    }
    const newPost = new Post({
      title,
      content,
      author,
      imageUrl,
    });

    await newPost.save();

    res.status(200).json({
      message: `${author} your post was created sucessfull`,
      post: newPost,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    if (!posts) return res.status(400).json({ error: "No Posts found" });
    res.status(200).json({ posts });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getPost = async (req, res) => {
  try {
    const postId = new mongoose.Types.ObjectId(req.params.id);

    const post = await Post.findById(postId);
    if (!post) return res.status(400).json({ error: "Post Not Found" });

    res.status(200).json({ message: `${post.title}`, post });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updatePost = async (req, res) => {
  const postId = new mongoose.Types.ObjectId(req.params.id);

  const post = await Post.findByIdAndUpdate(postId, { ...req.body, new: true });
  if (!post) return res.status(400).json({ error: "Post with ID Not Found" });

  res.status(200).json({ message: "Post was updated SUCCESFULLY" });
  try {
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const postId = new mongoose.Types.ObjectId(req.params.id);

    const deletedPost = await Post.findByIdAndDelete(postId);

    if (!deletedPost) {
      return res.status(400).json({ message: "No posts found to delete" });
    }

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteAll = async (req, res) => {
  try {
    const deletePosts = await Post.deleteMany();

    if (deletePosts.deletedCount === 0) {
      return res.status(400).json({ message: "No posts found to delete" });
    }

    res.status(200).json({ message: "All posts deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
