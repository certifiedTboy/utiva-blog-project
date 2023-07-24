import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const blogApi = createApi({
  reducerPath: "blogApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/api/v1/" }),
  endpoints: (builder) => ({
    getAllBlogs: builder.mutation({
      query: (payload) => ({
        url: `blogs?page=${payload}&limit=3`,
        method: "GET",
      }),
    }),

    createNewBlog: builder.mutation({
      query: (payload) => ({
        url: "/blogs",
        method: "POST",
        body: payload,
        credentials: "include",
      }),
    }),
  }),
});

export const { useGetAllBlogsMutation, useCreateNewBlogMutation } = blogApi;
