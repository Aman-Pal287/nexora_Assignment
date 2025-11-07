import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
  totals: {
    itemCount: 0,
    totalQuantity: 0,
    totalAmount: 0,
  },
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    loadCart: (state, action) => {
      state.cart = action.payload.cart.items || [];
      state.totals = action.payload.totals || state.totals;
    },
  },
});

export const { loadCart } = cartSlice.actions;
export default cartSlice.reducer;
