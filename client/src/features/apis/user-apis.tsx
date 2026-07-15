import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = import.meta.env.VITE_APP_API_BASE_URL;

export const userApis = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
    // prepareHeaders: async (headers) => {
    //   const token = localStorage.getItem("token");

    //   if (token) {
    //     headers.set("Authorization", `Bearer ${token}`);
    //     headers.set("x-client-type", "web");
    //   }
    //   return headers;
    // },
  }),

  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (payload) => ({
        url: "/users",
        method: "POST",
        body: payload,
      }),
    }),

    verifyUserAccount: builder.mutation({
      query: (payload) => ({
        url: "/users/verify",
        method: "PATCH",
        body: payload,
      }),
    }),

    getUserProfile: builder.mutation({
      query: () => ({
        url: "/users/profile",
        method: "GET",
        credentials: "include",
      }),
    }),

    getAllUsers: builder.mutation({
      query: () => ({
        url: "/users",
        method: "GET",
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useCreateUserMutation,
  useVerifyUserAccountMutation,
  useGetUserProfileMutation,
  useGetAllUsersMutation,
} = userApis;
