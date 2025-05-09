
const router = require("express").Router();
const cartController = require("../controllers/cartController");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");

router.post("/", verifyToken, cartController.createCart);
router.put("/:id", verifyTokenAndAuthorization, cartController.updateCart);
router.delete("/:id", verifyTokenAndAuthorization, cartController.deleteCart);
router.get("/find/:userId", verifyTokenAndAuthorization, cartController.getUserCart);
router.get("/", verifyTokenAndAdmin, cartController.getAllCarts);

module.exports = router;