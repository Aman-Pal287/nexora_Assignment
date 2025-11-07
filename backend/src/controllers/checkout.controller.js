const cartModel = require("../models/cart.model");
const productModel = require("../models/product.model");

async function checkout(req, res) {
  try {
    const { cartItems } = req.body;

    if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
      return res.status(400).json({ error: "cartItems array is required" });
    }

    let totalAmount = 0;
    const detailedItems = [];

    //! iterate all item and calclate total
    for (const item of cartItems) {
      const product = await productModel.findById(item.productId);

      if (!product) {
        return res.status(404).json({
          error: `Product not found: ${item.productId}`,
        });
      }

      const price = product.price.amount;
      const lineTotal = price * item.quantity;
      totalAmount += lineTotal;

      detailedItems.push({
        title: product.title,
        quantity: item.quantity,
        price,
        lineTotal,
      });
    }

    const receipt = {
      id: Math.random().toString(36).substring(2, 10).toUpperCase(),
      items: detailedItems,
      total: totalAmount,
      currency: "INR",
      timestamp: new Date().toISOString(),
      message: "checkout successful",
    };

    //! clear cart after checkout
    const cart = await cartModel.findOne();
    if (cart) {
      cart.items = [];
      await cart.save();
    }

    res.status(200).json({ receipt });
  } catch (error) {
    console.error("Error in checkout:", error);
    res.status(500).json({ error: "Failed to process checkout" });
  }
}

module.exports = { checkout };
