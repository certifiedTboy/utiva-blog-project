import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setUser } from "./redux/UserSlice";

let baseUrl;

if (process.env.NODE_ENV === "development") {
  baseUrl = process.env.REACT_APP_API_DEV_BASE_URL;
} else {
  baseUrl = process.env.REACT_APP_API_PROD_BASE_URL;
}

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
  }),
  endpoints: (builder) => ({
    getCurrentUser: builder.mutation({
      query: () => ({
        url: "/user/me",
        method: "GET",
        credentials: "include",
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data?.data));
        } catch (error) {}
      },
    }),

    getUserProfile: builder.mutation({
      query: (username) => ({
        url: `/user/${username}`,
        method: "GET",
      }),
    }),

    getUserProfileById: builder.mutation({
      query: (userId) => ({
        url: `/user/profile/${userId}`,
        method: "GET",
      }),
    }),

    uploadPicture: builder.mutation({
      query: (formData) => ({
        url: `/user/upload-image`,
        method: "PUT",
        body: formData,
        credentials: "include",
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data));
        } catch (error) {}
      },
    }),

    changeName: builder.mutation({
      query: (userData) => ({
        url: `/user/change-username`,
        method: "PUT",
        body: userData,
        credentials: "include",
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data));
        } catch (error) {}
      },
    }),

    followUser: builder.mutation({
      query: (payload) => ({
        url: `/user/follow-user`,
        method: "POST",
        body: payload,
        credentials: "include",
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data));
        } catch (error) {}
      },
    }),
  }),
});

export const {
  useGetCurrentUserMutation,
  useGetUserProfileMutation,
  useChangeNameMutation,
  useUploadPictureMutation,
  useGetUserProfileByIdMutation,
  useFollowUserMutation,
} = userApi;
