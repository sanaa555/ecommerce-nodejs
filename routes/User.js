const router = require("express").Router();
const userController = require("../controllers/userController");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");

router.put("/:id", verifyTokenAndAuthorization, userController.updateUser);
router.delete("/:id", verifyTokenAndAuthorization, userController.deleteUser);
router.get("/find/:id", verifyTokenAndAdmin, userController.getUser);
router.get("/", verifyTokenAndAdmin, userController.getAllUsers);
router.get("/stats", verifyTokenAndAdmin, userController.getUserStats);
router.get("/profile", verifyToken, userController.getUserProfile);

module.exports = router;