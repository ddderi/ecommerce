import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  loading: false,
  userLogged: false || window.localStorage.getItem("auth") === "true",
  message: null,
  linkInfo: false,
  redirectRegister: false,
  token: null,
  uid: null,
  messageError: null,
};

const authSlice = createSlice({
  name: "authUser",
  initialState,
  reducers: {
    setRedirectRegister: (state, action) => {
      state.redirectRegister = action.payload;
    },
    setLinkInfo: (state, action) => {
      state.linkInfo = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.userLogged = action.payload.userLogged;
      state.message = null;
      state.token = action.payload.token;
      state.uid = action.payload.uid;
    },
    logout: (state) => {
      state.userLogged = false;
      state.user = null;
      state.loading = false;
      // state.message = "Disconnected";
      state.token = null;
      state.uid = null;
    },
    setMessage: (state, action) => {
      state.message = action.payload;
    },
    setMessageError: (state, action) => {
      state.messageError = action.payload;
    },
    cancelMessage: (state) => {
      state.messageError = null;
    },
  },
});

export const {
  setLoading,
  setUser,
  logout,
  setLinkInfo,
  setRedirectRegister,
  setMessage,
  setMessageError,
  cancelMessage,
} = authSlice.actions;
export default authSlice.reducer;
