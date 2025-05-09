const Product = require("../models/Product");
const User = require("../models/User");
const fs = require("fs");
const path = require("path");

exports.createProduct = async (req, res) => {
  try {
    let imgPath = "";
    if (req.file) {
      imgPath = `/uploads/${req.file.filename}`;
    } else {
      return res.status(400).json({ message: "Product image is required" });
    }

    const newProduct = new Product({
      title: req.body.title,
      desc: req.body.desc,
      img: imgPath,
      categories: req.body.categories || [],
      size: req.body.size,
      color: req.body.color,
      price: req.body.price,
      seller: req.user.id,
    });

    const savedProduct = await newProduct.save();
    await User.findByIdAndUpdate(req.user.id, { $push: { products: savedProduct._id } });
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product || product.seller.toString() !== req.user.id) {
      return res.status(403).json("You are only allowed to update your own products");
    }

    let updateData = { ...req.body };
    if (req.file) {
      if (product.img) {
        const oldImagePath = path.join(__dirname, "..", product.img);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      updateData.img = `/uploads/${req.file.filename}`;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product || product.seller.toString() !== req.user.id) {
      return res.status(403).json("You are only allowed to delete your own products");
    }

    if (product.img) {
      const imagePath = path.join(__dirname, "..", product.img);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await Product.findByIdAndDelete(req.params.id);
    await User.findByIdAndUpdate(req.user.id, { $pull: { products: req.params.id } });
    res.status(200).json("Product has been deleted");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("seller", "username");
    if (!product) return res.status(404).json("Product not found");
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAllProducts = async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  try {
    let products;
    if (qNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(1).populate("seller", "username");
    } else if (qCategory) {
      products = await Product.find({
        categories: { $in: [qCategory] },
      }).populate("seller", "username");
    } else {
      products = await Product.find().populate("seller", "username");
    }
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.searchProducts = async (req, res) => {
  try {
    const { query } = req.query;
    const products = await Product.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { "seller.username": { $regex: query, $options: "i" } },
      ],
    }).populate("seller", "username");
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getSellerProducts = async (req, res) => {
  try {
    const products = await Product.find({ seller: req.params.sellerId }).populate("seller", "username");
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
