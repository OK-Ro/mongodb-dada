const Task = require("../models/Task");
const User = require("../models/User");

exports.createTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title) return res.status(400).json({ error: "Title is required" });

    const newTask = new Task({ title, description, user: req.user.userId });

    await newTask.save();
    const user = await User.findById(req.user.userId);
    res.status(200).json({
      message: `${user.name}, your task was created successfully`,
      task: newTask,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTask = async (req, res) => {
  try {
    const task = await Task.findOne({ user: req.user.userId });
    if (!task) {
      res.status(200).json({ message: "task not found" });
    }

    res.status(200).json({
      message: "Task retrieved successfully",
      task,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.updateTask = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.deleteTask = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
