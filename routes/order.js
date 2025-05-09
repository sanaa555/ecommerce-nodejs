
const router = require("express").Router();
const orderController = require("../controllers/orderController");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");

router.post("/", verifyToken, orderController.createOrder);
router.put("/:id", verifyTokenAndAuthorization, orderController.updateOrder);
router.delete("/:id", verifyTokenAndAdmin, orderController.deleteOrder);
router.get("/find/:userId", verifyTokenAndAuthorization, orderController.getUserOrders);
router.get("/", verifyTokenAndAdmin, orderController.getAllOrders);
router.get("/income", verifyTokenAndAdmin, orderController.getMonthlyIncome);

module.exports = router;