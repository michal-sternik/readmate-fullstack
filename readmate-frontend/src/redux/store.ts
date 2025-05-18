import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import searchInputReducer from "./exploreSlice";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    user: userReducer,
    searchInput: searchInputReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
