const express = require("express");
const router = express.Router();
const productController = require('../controllers/productController');


router.get("/produtos", productController.getProducts);
router.get("/produtos/:id", productController.getProductsById);
router.post("/adicionar_produtos", productController.createProduct);
router.put("/produtos/att/:id", productController.updateProduct);
router.delete("/produtos/del/:id", productController.deleteProducts);

module.exports = router;
