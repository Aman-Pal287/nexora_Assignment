import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncCheckout } from "../store/actions/checkoutAction";
import { useNavigate, Link } from "react-router-dom";
import { asyncLoadCart } from "../store/actions/cartAction";

export default function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cart, totals } = useSelector((state) => state.cartReducer);
  const [receipt, setReceipt] = useState(null);

  useEffect(() => {
    dispatch(asyncLoadCart());
  }, [dispatch]);

  const handleCheckout = () => {
    if (cart.length === 0) return alert("Cart is empty!");
    const formatted = cart.map((item) => ({
      productId: item.productId._id || item.productId,
      quantity: item.quantity,
    }));
    dispatch(asyncCheckout(formatted, setReceipt, navigate));
  };

  if (receipt) {
    return (
      <div
        style={{
          padding: "2rem",
          maxWidth: "700px",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <h1>Checkout Successful</h1>
        <h3>Receipt ID: {receipt.id}</h3>
        <p>Date: {new Date(receipt.timestamp).toLocaleString()}</p>
        <hr style={{ margin: "20px 0" }} />
        <ul style={{ listStyle: "none", padding: 0 }}>
          {receipt.items.map((i) => (
            <li
              key={i.title}
              style={{
                borderBottom: "1px solid #eee",
                padding: "10px 0",
                textAlign: "left",
              }}
            >
              <strong>{i.title}</strong> × {i.quantity} — ₹{i.lineTotal}
            </li>
          ))}
        </ul>
        <h2>Total: ₹{receipt.total}</h2>
        <p style={{ color: "gray" }}>
          Thank you for shopping with Vibe Commerce 💫
        </p>
        <Link to="/">
          <button
            style={{
              marginTop: "20px",
              padding: "10px 20px",
              border: "none",
              background: "#111",
              color: "#fff",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Back to Products
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "2rem",
        maxWidth: "700px",
        margin: "0 auto",
      }}
    >
      <h1>🧾 Checkout</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginTop: "20px",
            }}
          >
            <thead>
              <tr>
                <th style={{ textAlign: "left" }}>Product</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item._id}>
                  <td>{item.productId?.title || "Unknown"}</td>
                  <td>{item.quantity}</td>
                  <td>₹{item.productId?.price?.amount || 0}</td>
                  <td>
                    ₹{(item.productId?.price?.amount || 0) * item.quantity}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div
            style={{
              textAlign: "right",
              marginTop: "20px",
            }}
          >
            <h3>Total Items: {totals.itemCount}</h3>
            <h3>Total Quantity: {totals.totalQuantity}</h3>
            <h2>Grand Total: ₹{totals.totalAmount}</h2>
            <button
              onClick={handleCheckout}
              style={{
                marginTop: "15px",
                padding: "10px 20px",
                background: "#111",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Place Order ✅
            </button>
          </div>
        </>
      )}
    </div>
  );
}
