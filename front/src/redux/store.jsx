import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authSlice from "./authSlice.jsx";
import productSlice from "./productSlice.jsx";

const rootReducer = combineReducers({
  authUser: authSlice,
  productSlice: productSlice,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
