const Cart = require("../models/Cart");

exports.createCart = async (req, res) => {
  try {
    const existingCart = await Cart.findOne({ userID: req.user.id });
    if (existingCart) {
      return res.status(400).json({ message: "User already has a cart" });
    }

    const newCart = new Cart({
      userID: req.user.id,
      products: req.body.products,
    });
    const savedCart = await newCart.save();
    res.status(201).json(savedCart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateCart = async (req, res) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    ).populate("products.productId");
    res.status(200).json(updatedCart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteCart = async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json("Cart has been deleted");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getUserCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userID: req.params.userId }).populate("products.productId");
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAllCarts = async (req, res) => {
  try {
    const carts = await Cart.find().populate("userID", "username");
    res.status(200).json(carts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};