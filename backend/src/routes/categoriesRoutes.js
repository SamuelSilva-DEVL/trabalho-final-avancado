const express = require("express");
const router = express.Router();
const categoriesController = require('../controllers/categoriesController');


router.get("/categorias", categoriesController.getCategories);
router.get("/categorias/:id", categoriesController.getCategoriesById);
router.post("/adicionar_categorias", categoriesController.createCategory);
router.put("/categorias/att/:id", categoriesController.updateCategory);
router.delete("/categorias/del/:id", categoriesController.deleteCategories);

module.exports = router;
