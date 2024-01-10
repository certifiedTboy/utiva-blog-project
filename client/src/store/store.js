import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { blogApi } from "../lib/APIS/blogApis/BlogApi";
import { authApi } from "../lib/APIS/authApis/authApis";
import { userApi } from "../lib/APIS/userApi/userApi";
import UserSlice from "../lib/APIS/userApi/redux/UserSlice";
import BlogSlice from "../lib/APIS/blogApis/redux/BlogSlice";

export const store = configureStore({
  reducer: {
    [blogApi.reducerPath]: blogApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    userState: UserSlice,
    blogState: BlogSlice,
  },

  devTools: process.env.NODE_ENV !== "production",

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      blogApi.middleware,
      authApi.middleware,
      userApi.middleware
    ),
});

setupListeners(store.dispatch);
