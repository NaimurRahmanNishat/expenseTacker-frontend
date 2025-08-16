// src/redux/features/auth/authSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface User {
  _id: string;
  username: string;
  email: string;
  role?: string;
  createdAt: string;
  updatedAt: string;
}

interface AuthState {
  user: User | null;
}

const loadUserFromLocalStorage = (): AuthState => {
  try {
    const storedUser = localStorage.getItem("user");
    return storedUser ? { user: JSON.parse(storedUser) } : { user: null };
  } catch {
    return { user: null };
  }
};

const initialState: AuthState = loadUserFromLocalStorage();

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ user: User }>) => {
      state.user = action.payload.user;
      localStorage.setItem("user", JSON.stringify(state.user));
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;