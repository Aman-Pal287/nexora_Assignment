import axios from "../../api/axiosconfig";

// ✅ POST /api/checkout → mock receipt
export const asyncCheckout = (cartItems, setReceipt, navigate) => async () => {
  try {
    const payload = { cartItems };
    const { data } = await axios.post("/checkout", payload);

    // save receipt in local state or redirect
    setReceipt(data.receipt);

    // optional: navigate to receipt page after delay
    setTimeout(() => {
      navigate("/");
    }, 5000);
  } catch (error) {
    console.log("❌ Checkout failed:", error.message);
  }
};
