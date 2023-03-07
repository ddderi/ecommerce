import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  loading: false,
  userLogged: false || window.localStorage.getItem("auth") === "true",
  message: null,
  token: null,
  uid: null,
};

const authSlice = createSlice({
  name: "authUser",
  initialState,
  reducers: {
    setMessage: (state, action) => {
      state.message = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setUser: (state, action) => {
      console.log(action.payload);
      state.user = action.payload.user;
      state.userLogged = action.payload.userLogged;
      state.message = null;
      state.token = action.payload.token;
      state.uid = action.payload.uid;
    },
    logout: (state, action) => {
      state.userLogged = false;
      state.user = null;
      state.loading = false;
      // state.message = "Disconnected";
      state.token = null;
      state.uid = null;
    },
  },
});

export const { setLoading, setUser, setMessage, logout } = authSlice.actions;
export default authSlice.reducer;
