const productModel = require("../models/product.model");

async function getProducts(req, res) {
  const products = await productModel.find().lean();

  return res.status(200).json({ data: products });
}

module.exports = { getProducts };
