const express = require("express");
const cartController = require("../controllers/cart.controller");

const router = express.Router();

/* GET /api/cart */
router.get("/", cartController.getCart);

/* POST /api/cart */
router.post("/", cartController.addItemToCart);

/* DELETE /api/cart/:id */
router.delete("/:id", cartController.removeItemFromCart);

/* PATCH /api/cart/decrement/:id */
router.patch("/decrement/:id", cartController.decrementItemInCart);

module.exports = router;
