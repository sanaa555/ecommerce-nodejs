
const router = require("express").Router();
const stripeController = require("../controllers/stripeController");
const { verifyToken } = require("./verifyToken");

router.post("/payment", verifyToken, stripeController.processPayment);

module.exports = router;