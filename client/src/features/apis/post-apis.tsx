import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = import.meta.env.VITE_APP_API_BASE_URL;

export const postApis = createApi({
  reducerPath: "pstApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
  }),

  endpoints: (builder) => ({
    createPost: builder.mutation({
      query: (payload) => ({
        url: "/posts",
        method: "POST",
        body: payload,
        credentials: "include",
      }),
    }),

    getAllPosts: builder.mutation({
      query: (payload) => ({
        url: "/posts",
        method: "GET",
        credentials: "include",
      }),
    }),

    getPublishedPosts: builder.mutation({
      query: () => ({
        url: `/posts/published`,
        method: "GET",
        credentials: "include",
      }),
    }),

    getPostDetails: builder.mutation({
      query: (payload) => ({
        url: `/posts/${payload}`,
        method: "GET",
        body: payload,
      }),
    }),

    addCommentToPost: builder.mutation({
      query: (payload) => ({
        url: `/posts/${payload.postId}/comments`,
        method: "POST",
        body: payload,
        credentials: "include",
      }),
    }),

    reactToPosts: builder.mutation({
      query: (payload) => ({
        url: `/posts/${payload.postId}/reactions`,
        method: "POST",
        body: payload,
        credentials: "include",
      }),
    }),

    updatePost: builder.mutation({
      query: (payload) => ({
        url: `/posts/${payload.id}`,
        method: "PATCH",
        body: payload,
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useCreatePostMutation,
  useGetAllPostsMutation,
  useGetPostDetailsMutation,
  useAddCommentToPostMutation,
  useReactToPostsMutation,
  useGetPublishedPostsMutation,
  useUpdatePostMutation,
} = postApis;
