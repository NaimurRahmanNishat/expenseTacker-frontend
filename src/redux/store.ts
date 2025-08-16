// src/redux/store.ts (or src/redux/extra.ts)
import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./features/auth/authApi";
import authReducer from "./features/auth/authSlice";
import expenseApi from "./features/expense/expenseApi";

// 👉 Configure the store
const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    auth: authReducer,
    [expenseApi.reducerPath]: expenseApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat( authApi.middleware, expenseApi.middleware ),
});

// ✅ Infer types for state and dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// ✅ Export the store
export default store;