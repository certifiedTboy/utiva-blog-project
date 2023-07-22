import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userApi } from "../userApi/userApi";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/api/v1/" }),
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (payload) => ({
        url: "auth/login",
        method: "POST",
        body: payload,
        credentials: "include",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          await dispatch(userApi.endpoints.getCurrentUser.initiate(null));
        } catch (error) {}
      },
    }),

    registerUser: builder.mutation({
      query: (payload) => ({
        url: "user/create-user",
        method: "POST",
        body: payload,
      }),
    }),

    verifyUser: builder.mutation({
      query: (payload) => ({
        url: "user/verify-user",
        method: "POST",
        body: payload,
      }),
    }),

    setNewPassword: builder.mutation({
      query: (payload) => ({
        url: "auth/set-password",
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useVerifyUserMutation,
  useSetNewPasswordMutation,
} = authApi;