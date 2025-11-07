require("dotenv").config();
const mongoose = require("mongoose");
const axios = require("axios");
const Product = require("./models/product.model");

// MongoDB connect function
async function connectDB() {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected for seeding");
  } catch (err) {
    console.error("MongoDB connection failed:", err);
    process.exit(1);
  }
}

async function seedProducts() {
  await connectDB();

  try {
    console.log("Fetching products from Fake Store API...");
    const { data } = await axios.get(
      "https://fakestoreapi.com/products?limit=20"
    );

    const formatted = data.map((item) => ({
      title: item.title,
      imageUrl: item.image,
      description: item.description,
      price: {
        amount: Math.round(item.price * 83), // convert USD → INR (approx)
        currency: "INR",
      },
    }));

    // Clear old data
    await Product.deleteMany({});
    console.log("🧹 Old products cleared");

    // Insert new
    const inserted = await Product.insertMany(formatted);
    console.log(
      `Successfully inserted ${inserted.length} products from Fake Store API!`
    );
  } catch (error) {
    console.error("Error seeding products:", error);
  } finally {
    mongoose.connection.close();
    console.log("MongoDB connection closed");
  }
}

seedProducts();
