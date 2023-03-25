import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  cart: [],
  cartUpdated: false,
};

const authSlice = createSlice({
  name: "productSlice",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setCart: (state, action) => {
      state.cart = action.payload;
      state.cartUpdated = false;
    },
    updateCart: (state) => {
      state.cartUpdated = true;
    },
  },
});

export const { setProducts, setCart, updateCart } = authSlice.actions;
export default authSlice.reducer;
