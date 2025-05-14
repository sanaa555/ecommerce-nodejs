const router = require("express").Router();
const cartController = require("../controllers/cartController");
const { verifyTokenAndAuthorization } = require("../middleware/verifyToken");

router.post("/", cartController.createCart);

router.put("/:id", cartController.updateCart);

router.delete("/:id", cartController.deleteCart);

router.get("/:userId", cartController.getUserCart);

router.get("/", cartController.getAllCarts);

module.exports = router;
