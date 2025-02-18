const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  quantity: { type: Number, required: true },
});

module.exports = mongoose.model("Product", ProductSchema);
