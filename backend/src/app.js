const express = require("express");
const cors = require("cors");
const productRoutes = require("./routes/product.route");
const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json({ message: "Product Service is up and running" });
});

app.use("/api/products", productRoutes);

module.exports = app;
