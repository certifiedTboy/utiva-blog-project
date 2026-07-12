import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { userApis } from "../apis/user-apis";
import { authApis } from "../apis/auth-apis";

export const store = configureStore({
  reducer: {
    [authApis.reducerPath]: authApis.reducer,
    [userApis.reducerPath]: userApis.reducer,
  },

  devTools: import.meta.env.NODE_ENV !== "production",

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApis.middleware, authApis.middleware),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
