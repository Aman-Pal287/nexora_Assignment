import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  asyncLoadCart,
  asyncAddToCart,
  asyncDecrementItem,
  asyncRemoveItem,
} from "../store/actions/cartAction";
import { Link } from "react-router-dom";

export default function Cart() {
  const dispatch = useDispatch();
  const { cart, totals } = useSelector((state) => state.cartReducer);

  useEffect(() => {
    dispatch(asyncLoadCart());
  }, [dispatch]);

  if (!cart || cart.length === 0) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h2>Your cart is empty 🛒</h2>
        <Link to="/">Go Shopping</Link>
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h1>🛒 Your Cart</h1>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "1rem",
        }}
      >
        <thead>
          <tr>
            <th style={{ textAlign: "left" }}>Product</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Total</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item) => (
            <tr key={item._id}>
              <td>{item.productId?.title || "Unknown Product"}</td>
              <td>
                <button
                  onClick={() =>
                    dispatch(
                      asyncDecrementItem(item.productId?._id || item.productId)
                    )
                  }
                  style={{ marginRight: "5px" }}
                >
                  ➖
                </button>
                {item.quantity}
                <button
                  onClick={() =>
                    dispatch(
                      asyncAddToCart(item.productId?._id || item.productId, 1)
                    )
                  }
                  style={{ marginLeft: "5px" }}
                >
                  ➕
                </button>
              </td>
              <td>₹{item.productId?.price?.amount || 0}</td>
              <td>₹{(item.productId?.price?.amount || 0) * item.quantity}</td>
              <td>
                <button
                  onClick={() =>
                    dispatch(
                      asyncRemoveItem(item.productId?._id || item.productId)
                    )
                  }
                  style={{
                    background: "red",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    padding: "4px 8px",
                    cursor: "pointer",
                  }}
                >
                  ❌
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: "2rem", textAlign: "right" }}>
        <h3>Total Items: {totals.itemCount}</h3>
        <h3>Total Quantity: {totals.totalQuantity}</h3>
        <h2>Grand Total: ₹{totals.totalAmount}</h2>

        <Link to="/checkout">
          <button
            style={{
              marginTop: "10px",
              padding: "10px 20px",
              background: "#111",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Proceed to Checkout ➡️
          </button>
        </Link>
      </div>
    </div>
  );
}
