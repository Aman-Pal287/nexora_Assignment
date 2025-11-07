const express = require("express");
const productController = require("../controllers/product.controller");
const router = express.Router();

/* GET /api/products */
router.get("/", productController.getProducts);

module.exports = router;
