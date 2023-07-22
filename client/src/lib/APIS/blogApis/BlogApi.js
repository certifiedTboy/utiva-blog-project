import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const blogApi = createApi({
  reducerPath: "blogApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/api/v1/" }),
  endpoints: (builder) => ({
    getAllBlogs: builder.query({
      query: () => `blogs?page=1&limit=5`,
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

export const { useGetAllBlogsQuery, useCreateNewBlogMutation } = blogApi;
