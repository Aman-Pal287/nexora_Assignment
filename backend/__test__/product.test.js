/**
 * @fileoverview Jest test for GET /api/products route.
 */

const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../src/app");
const productModel = require("../src/models/product.model");

// Mock database URI for testing (you can use your .env.test too)
const MONGO_URI = "mongodb://127.0.0.1:27017/vibe_test_db";

beforeAll(async () => {
  // connect to in-memory MongoDB (or local test db)
  await mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // Insert mock products for testing
  await productModel.insertMany([
    {
      title: "Vibe T-Shirt",
      description: "Cool cotton tee",
      price: { amount: 499, currency: "INR" },
    },
    {
      title: "Vibe Hoodie",
      description: "Winter wear",
      price: { amount: 999, currency: "INR" },
    },
  ]);
});

afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.connection.close();
});

describe("GET /api/products", () => {
  it("should return 200 and a list of products", async () => {
    const res = await request(app).get("/api/products");

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("data");
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBeGreaterThan(0);

    // Check one of the products structure
    const product = res.body.data[0];
    expect(product).toHaveProperty("title");
    expect(product).toHaveProperty("price");
    expect(product.price).toHaveProperty("amount");
    expect(product.price).toHaveProperty("currency");
  });
});
