/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

interface TState {
  user: null | {
    _id: string;
    first_name: string;
    last_name: string;
    image: string;
    email: string;
    password: string;
    role: string;
    phone: string;
    verified: boolean;
    provider: string;
  };
  token: null | string;
}

const initialState: TState = {
  user: null,
  token: null,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loggedInUser: (state, action) => {
      const { user, accessToken } = action.payload;
      state.user = user;
      state.token = accessToken;
    },
    loggedOutUser: (state) => {
      state.user = null;
      state.token = null;
    },
    updateUserInfo: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { loggedInUser, loggedOutUser, updateUserInfo } =
  authSlice.actions;
export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectCurrentToken = (state: RootState) => state.auth.token;
export default authSlice.reducer;
