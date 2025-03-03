const express = require("express");
const router = express.Router();
const productController = require('../controllers/productController');


router.get("/produtos", productController.getProducts);
router.get("/produtos/:id", productController.getProductsById);

module.exports = router;
