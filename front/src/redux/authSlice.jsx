import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  loading: false,
  userLogged: false || window.localStorage.getItem("auth") === "true",
  error: null,
};

// export const LoginWithGoogle = createAsyncThunk("authUser/LoginWithGoogle", async ())

const authSlice = createSlice({
  name: "authUser",
  initialState,
  reducers: {
    setError: (state, action) => {
      state.error = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setUser: (state, action) => {
      console.log(action.payload);
      state.user = action.payload.user;
      state.userLogged = action.payload.userLogged;
      state.error = null;
    },
    logout: (state, action) => {
      state.userLogged = false;
      state.user = null;
      state.loading = false;
      state.error = "Disconnected";
    },
  },
});

export const { setLoading, setUser, setError, logout } = authSlice.actions;
export default authSlice.reducer;
