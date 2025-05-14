const router = require("express").Router();
const orderController = require("../controllers/orderController");
const { verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("../middleware/verifyToken");

router.post("/", orderController.createOrder);

router.put("/:id", orderController.updateOrder);

router.delete("/:id", orderController.deleteOrder);

router.get("/:userId", orderController.getUserOrders);

router.get("/", verifyTokenAndAdmin, orderController.getAllOrders);

router.get("/income", verifyTokenAndAdmin, orderController.getMonthlyIncome);

module.exports = router;
