import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "user details auth",
  initialState: {
    auth: false,
    premium: false,
  },
  reducers: {
    authUser: (state, action) => {
      Object.assign(state, action.payload);
      state.auth = true;
    },
    updateUser: (state, action) => {
      Object.assign(state, action.payload);
    },
    logoutUser: (state, action) => {
      return { auth: false, premium: false };
    },
  },
});

export default authSlice;
export const { authUser, updateUser, logoutUser } = authSlice.actions;
