import axios from "../../api/axiosconfig";
import { loadCart } from "../reducers/cartSlice";

export const asyncLoadCart = () => async (dispatch) => {
  try {
    const { data } = await axios.get("/cart");
    dispatch(loadCart(data));
  } catch (err) {
    console.log("Error loading cart:", err.message);
  }
};

export const asyncAddToCart =
  (productId, qty = 1) =>
  async (dispatch) => {
    try {
      await axios.post("/cart", { productId, qty });
      dispatch(asyncLoadCart());
    } catch (err) {
      console.log("Error adding to cart:", err.message);
    }
  };

export const asyncDecrementItem = (productId) => async (dispatch) => {
  try {
    await axios.patch(`/cart/decrement/${productId}`);
    dispatch(asyncLoadCart());
  } catch (err) {
    console.log("Error decrementing item:", err.message);
  }
};

export const asyncRemoveItem = (productId) => async (dispatch) => {
  try {
    await axios.delete(`/cart/${productId}`);
    dispatch(asyncLoadCart());
  } catch (err) {
    console.log("Error removing item:", err.message);
  }
};
