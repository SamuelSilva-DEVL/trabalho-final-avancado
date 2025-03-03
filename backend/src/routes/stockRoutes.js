const express = require("express");
const router = express.Router();
const stockController = require('../controllers/stockController');

router.get('/estoque', stockController.stock)

module.exports = router;