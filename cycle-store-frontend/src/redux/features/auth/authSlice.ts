import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export type TTokenUser = {
  email: string;
  role: string;
  iat: number;
  exp: number;
};

type TAuthState = {
  user: null | TTokenUser;
  token: null | object;
};

const initialState: TAuthState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setUser, logout } = authSlice.actions;

export const useCurrentUser = (state: RootState) => state.auth.user;
export const userCurrentToken = (state: RootState) => state.auth.token;

export default authSlice.reducer;
