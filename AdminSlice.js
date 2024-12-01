import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
  name: "admin",
  initialState: {},
  reducers: {
    authAdmin(state, action) {
      return action.payload;
    },
    logout(state, action) {
      return {};
    },
  },
});

const { reducer, actions } = adminSlice;

export const { authAdmin, logout } = actions;

export default reducer;
