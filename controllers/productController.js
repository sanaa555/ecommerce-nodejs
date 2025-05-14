const Product = require("../models/Product");

exports.createProduct = async (req, res) => {
  try {
    const { title, desc, price, categories, size, color, seller } = req.body;

    const newProduct = new Product({
      title,
      desc,
      img,
      price,
      categories,
      size,
      color,
      seller: req.user.id,
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("Product has been deleted");
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.searchProducts = async (req, res) => {
  try {
    const query = req.query.q;
    const products = await Product.find({
      title: { $regex: query, $options: "i" },
    });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
};
