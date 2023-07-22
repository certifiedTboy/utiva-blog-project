import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { blogApi } from "../lib/APIS/blogApis/BlogApi";
import { authApi } from "../lib/APIS/authApis/authApis";
import { userApi } from "../lib/APIS/userApi/userApi";
import UserSlice from "../lib/APIS/userApi/redux/UserSlice";

export const store = configureStore({
  reducer: {
    [blogApi.reducerPath]: blogApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    userState: UserSlice,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      blogApi.middleware,
      authApi.middleware,
      userApi.middleware
    ),
});

setupListeners(store.dispatch);
