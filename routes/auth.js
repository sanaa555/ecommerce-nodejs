const router = require("express").Router();
const authController = require("../controllers/authController");
const { body } = require("express-validator");

router.post(
  "/register",
  [
    body("username").notEmpty().trim().isLength({ min: 3 }),
    body("email").isEmail().normalizeEmail(),
    body("password").isLength({ min: 6 }),
    body("role").optional().isIn(["user", "seller", "Admin"]),
  ],
  authController.register
);

router.post("/login", authController.login);



module.exports = router;
