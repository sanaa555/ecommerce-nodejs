const router = require("express").Router();
const productController = require("../controllers/productController");
const { verifyTokenAndAdmin } = require("../middleware/verifyToken");

router.post("/", verifyTokenAndAdmin, productController.createProduct);

router.put("/:id", verifyTokenAndAdmin,  productController.updateProduct);

router.delete("/:id", verifyTokenAndAdmin, productController.deleteProduct);

router.get("/:id", productController.getProduct);

router.get("/", productController.getAllProducts);

router.get("/search", productController.searchProducts);

module.exports = router;
