import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
};

const authSlice = createSlice({
  name: "productSlice",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
  },
});

export const { setProducts } = authSlice.actions;
export default authSlice.reducer;
