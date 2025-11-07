const cartModel = require("../models/cart.model");
const productModel = require("../models/product.model");

function calculateTotals(cart) {
  const totalQuantity = cart.items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );
  const itemCount = cart.items.length;
  return { itemCount, totalQuantity };
}

async function getCart(req, res) {
  try {
    let cart = await cartModel
      .findOne()
      .populate("items.productId", "title price imageUrl");

    if (!cart) {
      cart = await cartModel.create({ items: [] });
    }

    const totals = calculateTotals(cart);

    const totalAmount = cart.items.reduce((sum, item) => {
      const price = item.productId?.price?.amount || 0;
      return sum + price * item.quantity;
    }, 0);

    res.status(200).json({
      cart,
      totals: { ...totals, totalAmount },
    });
  } catch (error) {
    console.error("Error in getCart:", error);
    res.status(500).json({ error: "Failed to get cart" });
  }
}

async function addItemToCart(req, res) {
  try {
    const { productId, qty } = req.body;

    if (!productId || !qty || qty <= 0) {
      return res.status(400).json({ error: "Invalid productId or qty" });
    }

    const product = await productModel.findById(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    let cart = await cartModel.findOne();
    if (!cart) {
      cart = await cartModel.create({ items: [] });
    }

    const existingItem = cart.items.find(
      (item) => item.productId.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += qty;
    } else {
      cart.items.push({ productId, quantity: qty });
    }

    await cart.save();

    res.status(200).json({ message: "Item added to cart", cart });
  } catch (error) {
    console.error("❌ Error in addItemToCart:", error);
    res.status(500).json({ error: "Failed to add item to cart" });
  }
}

async function removeItemFromCart(req, res) {
  try {
    const productId = req.params.id;

    let cart = await cartModel.findOne();
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    const before = cart.items.length;
    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId
    );

    if (cart.items.length === before) {
      return res.status(404).json({ error: "Item not found in cart" });
    }

    await cart.save();

    res.status(200).json({ message: "Item removed from cart", cart });
  } catch (error) {
    console.error("Error in removeItemFromCart:", error);
    res.status(500).json({ error: "Failed to remove item from cart" });
  }
}

async function decrementItemInCart(req, res) {
  try {
    const productId = req.params.id;

    let cart = await cartModel.findOne();
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    const item = cart.items.find((i) => i.productId.toString() === productId);

    if (!item) {
      return res.status(404).json({ error: "Item not found in cart" });
    }

    if (item.quantity > 1) {
      item.quantity -= 1;
    } else {
      cart.items = cart.items.filter(
        (i) => i.productId.toString() !== productId
      );
    }

    await cart.save();

    res.status(200).json({
      message: "Item quantity updated successfully",
      cart,
    });
  } catch (error) {
    console.error("Error in decrementItemInCart:", error);
    res.status(500).json({ error: "Failed to decrement item quantity" });
  }
}

module.exports = {
  getCart,
  addItemToCart,
  removeItemFromCart,
  decrementItemInCart,
};
