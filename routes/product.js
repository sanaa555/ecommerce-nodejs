
const router = require("express").Router();
const productController = require("../controllers/productController");
const { verifyToken, verifyTokenAndSeller } = require("./verifyToken");
const { upload } = require("../middleware/upload");

router.post("/", verifyTokenAndSeller, upload.single("img"), productController.createProduct);
router.put("/:id", verifyTokenAndSeller, upload.single("img"), productController.updateProduct);
router.delete("/:id", verifyTokenAndSeller, productController.deleteProduct);
router.get("/find/:id", productController.getProduct);
router.get("/", productController.getAllProducts);
router.get("/search", verifyToken, productController.searchProducts);
router.get("/seller/:sellerId", verifyTokenAndSeller, productController.getSellerProducts);

module.exports = router;