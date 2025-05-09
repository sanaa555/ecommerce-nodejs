
const router = require("express").Router();
const authController = require("../controllers/authController");
const { body } = require("express-validator");

router.post(
  "/register",
  [
    body("username").notEmpty().trim().isLength({ min: 3 }),
    body("email").isEmail().normalizeEmail(),
    body("password").isLength({ min: 6 }),
    body("role").optional().isIn(["user", "seller","Admin"]),
  ],
  authController.register
);

router.post("/login", authController.login);
router.post("/forgot-password", authController.forgotPassword);
router.post("/reset-password/:token", authController.resetPassword);

module.exports = router;