
# Vibe Commerce — Mock E‑Com Cart

**Project type:** Full‑stack mock e‑commerce cart (React frontend + Node/Express backend + MongoDB)  
**What this delivers:** Products listing, cart management (add / decrement / remove / totals), and mock checkout (receipt with total & timestamp). Responsive UI and polished frontend design.

---

## Contents
```

├─ backend/
│  ├─ src/
│  │  ├─ config/
│  │  │  └─ db.config.js
│  │  ├─ controllers/
│  │  │  ├─ product.controller.js
│  │  │  ├─ cart.controller.js
│  │  │  └─ checkout.controller.js
│  │  ├─ models/
│  │  │  ├─ product.model.js
│  │  │  └─ cart.model.js
│  │  ├─ routes/
│  │  │  ├─ product.route.js
│  │  │  ├─ cart.route.js
│  │  │  └─ checkout.route.js
│  │  ├─ seedProducts.js
│  │  └─ app.js
│  ├─ .env
│  ├─ package.json
│  └─ server.js
├─ frontend/
│  ├─ src/
│  │  ├─ api/
│  │  │  └─ axiosconfig.jsx
│  │  ├─ components/
│  │  │  ├─ Navbar.jsx
│  │  ├─ pages/
│  │  │  ├─ Product.jsx
│  │  │  ├─ Cart.jsx
│  │  │  └─ Checkout.jsx
│  │  ├─ store/
│  │  │  ├─ actions/
│  │  │  │  ├─ productAction.jsx
│  │  │  │  ├─ cartAction.jsx
│  │  │  │  └─ checkoutAction.jsx
│  │  │  └─ reducers/
│  │  │     ├─ productSlice.jsx
│  │  │     └─ cartSlice.jsx
│  │  ├─ App.jsx
│  │  └─ main.jsx
│  ├─ package.json
│  └─ index.css
└─ README.md
```

---

## Quick demo (what to show)
1. Start backend and seed products (or show DB with sample products).  
2. Open frontend, browse products, add items to cart.  
3. Update quantities (➕/➖), remove items.  
4. Proceed to Checkout → Place Order → show receipt modal/screen.

---

## Backend — Setup & run

1. Create `.env` in `backend/`:
```
MONGO_URI=mongodb://127.0.0.1:27017/vibe_cart
PORT=4000
```

2. Install dependencies and run:
```bash
cd backend
npm install
# seed products (fetches from fakestoreapi)
npm run seed    # if script added: "seed": "node src/seedProducts.js"
# start server
npm run dev     # or: node server.js
```

### APIs
- `GET /api/products`  
  Response: `{ data: [ { _id, title, description, imageUrl, price: { amount, currency } }, ... ] }`

- `GET /api/cart`  
  Response: `{ cart: { items: [ { _id, productId: { ...product }, quantity } ] }, totals: { itemCount, totalQuantity, totalAmount } }`

- `POST /api/cart` — body `{ productId, qty }`  
  Adds item or increments quantity.

- `PATCH /api/cart/decrement/:id`  
  Decrements quantity for productId; removes item if quantity reaches 0.

- `DELETE /api/cart/:id`  
  Removes the item with given productId.

- `POST /api/checkout` — body `{ cartItems: [{ productId, quantity }] }`  
  Returns `{ receipt: { id, items, total, currency, timestamp, message } }` and clears server cart.

---

## Frontend — Setup & run

1. In `frontend/`:
```bash
cd frontend
npm install
npm run dev
```

2. App runs (Vite) at `http://localhost:5173/` (or the dev server URL).

### Key frontend pieces
- `src/api/axiosconfig.jsx` — axios instance with `baseURL: http://localhost:4000/api`.
- Redux store: `store/store.jsx` with `productReducer` and `cartReducer`.
- Actions in `store/actions/*` call backend and dispatch reducers (pattern: async function that dispatches).
- Pages:
  - `Product.jsx` — product grid, Add to Cart.
  - `Cart.jsx` — cart list, qty controls, remove, totals.
  - `Checkout.jsx` — order summary, Place Order, receipt view.

---

## Screenshots & Demo
Add 3 screenshots to `/screenshots`:
- `products.png` — Product grid
- `cart.png` — Cart page with items
- `receipt.png` — Receipt / Checkout success

Record a 1–2 minute unlisted Loom or YouTube video demonstrating:
- Product listing → add to cart
- Update qty, remove item
- Checkout flow + receipt

Add video link and screenshots to README before submission.

---

## Testing
- Backend tests: Jest + Supertest can be added to `backend/tests/` (example `product.test.js` included earlier).
- For CI use `mongodb-memory-server` in tests to avoid needing a real DB.

---

## Notes & Improvements (Bonus)
- Replace JSON-file persistence with MongoDB (seed script already supports FakeStore API).
- Add input validation (`express-validator`) and robust error handling.
- Add authentication and user-specific carts.
- Add product search, filtering, pagination.
- Add E2E tests (Cypress) for critical flows.

---

## Useful commands summary

```bash
# backend
cd backend
npm install
npm run seed    # optional: seed from Fake Store API
npm run dev     # or npm start

# frontend
cd frontend
npm install
npm run dev
```

---

## Author / Submission
Prepared for Vibe Commerce internship assignment — includes backend APIs, frontend React + Redux implementation, responsive design, and demo guidance.

