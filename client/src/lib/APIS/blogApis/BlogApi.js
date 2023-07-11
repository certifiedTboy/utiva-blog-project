import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const blogApi = createApi({
  reducerPath: "blogApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/api/v1/" }),
  endpoints: (builder) => ({
    getAllBlogs: builder.query({
      query: () => `blogs?page=1&limit=5`,
    }),
  }),
});

export const { useGetAllBlogsQuery } = blogApi;
