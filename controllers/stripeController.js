require('dotenv').config();

const Stripe = require("stripe");
const Order = require("../models/Order");

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

exports.processPayment = async (req, res) => {
  try {
    const { tokenId, amount, orderId } = req.body;
    if (!tokenId || !amount || !orderId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const charge = await stripe.charges.create({
      source: tokenId,
      amount: amount * 100, 
      currency: "usd",
    });

    await Order.findByIdAndUpdate(orderId, {
      paymentStatus: "paid",
      paymentId: charge.id,
      paymentMethod: "online",
    });

    res.status(200).json({ message: "Payment successful", charge });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};