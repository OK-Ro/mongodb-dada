const Product = require("../models/Product");

exports.addProduct = async (req, res) => {
  try {
    const { name, description, price, category, quantity, image } = req.body;

    if (!req.admin) {
      return res.status(403).json({ error: "Access Denied. Admins permited." });
    }

    if (!name || !description || !price || !category || !quantity || !image) {
      return res.status(400).json({ error: "All fields required" });
    }

    const existingProduct = await Product.findOne({ name });
    if (existingProduct) {
      return res.status(401).json({ error: "Product already exists" });
    }

    // Create and save the new product
    const product = new Product({
      name,
      description,
      price,
      category,
      quantity,
      image,
      ratings: { average: 0, count: 0 },
      reviews: [],
      createdBy: req.admin._id,
    });

    await product.save();

    // Send success response
    res.status(201).json({
      message: "Product created successfully",
      product,
      createdBy: req.admin.surName,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const product = await Product.find();
    if (product.length === 0)
      return res.status(404).json({ message: "No products found" });
    res.status(200).json({ message: "Products fetched successfully", product });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    console.log("Product ID:", req.params.id);

    if (!product)
      return res.status(400).json({ message: "product does not exist" });

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!req.admin) {
      return res.status(403).json({ error: "Access Denied. Admins permited." });
    }

    res.status(200).json({
      message: "product updated",
      updatedProduct,
      updatedBy: req.admin.surName,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product)
      return res.status(400).json({ message: "product does not exist" });

    res.status(200).json({
      message: "Product deleted successfully",
      deletedBy: req.admin.surName,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
