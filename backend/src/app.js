const express = require("express");
const cors = require("cors");
const productRoutes = require("./routes/product.route");
const cartRoutes = require("./routes/cart.routes");
const checkoutRoutes = require("./routes/checkout.route");
const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json({ message: "Product Service is up and running" });
});

app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/checkout", checkoutRoutes);

module.exports = app;
