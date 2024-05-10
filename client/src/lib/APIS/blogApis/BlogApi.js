import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setBlog } from "./redux/BlogSlice";

let baseUrl;

if (process.env.NODE_ENV === "development") {
  baseUrl = process.env.REACT_APP_API_DEV_BASE_URL;
} else {
  baseUrl = process.env.REACT_APP_API_PROD_BASE_URL;
}

export const blogApi = createApi({
  reducerPath: "blogApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
  }),
  endpoints: (builder) => ({
    getAllBlogs: builder.mutation({
      query: (pageNum) => ({
        url: `blogs/published-blogs?page=${pageNum}&limit=5`,
        method: "GET",
      }),
    }),

    createNewBlog: builder.mutation({
      query: (blogData) => ({
        url: "/blogs/create",
        method: "POST",
        body: blogData,
        credentials: "include",
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setBlog(data));
        } catch (error) {}
      },
    }),
    publishBlog: builder.mutation({
      query: (payload) => ({
        url: `/blogs/${payload}/publish`,
        method: "PUT",
        body: payload,
        credentials: "include",
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setBlog(data));
        } catch (error) {}
      },
    }),
    updatedBlog: builder.mutation({
      query: ({ blogData, blogId }) => ({
        url: `/blogs/${blogId}/edit`,
        method: "PUT",
        body: blogData,
        credentials: "include",
      }),
    }),

    checkBlogAlreadyCreated: builder.mutation({
      query: (blogId) => ({
        url: `/blogs/${blogId}/user-blog-by-id`,
        method: "GET",
        credentials: "include",
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setBlog(data));
        } catch (error) {}
      },
    }),

    getBlogByUser: builder.mutation({
      query: (userId) => ({
        url: `/blogs/blogs-by-user/${userId}`,
        method: "GET",
      }),
    }),
    reactToBlog: builder.mutation({
      query: (blogId) => ({
        url: `/blogs/${blogId}/react`,
        method: "POST",
        body: { reaction: "like" },
        credentials: "include",
      }),
    }),

    getBlogByTitle: builder.mutation({
      query: (title) => ({
        url: `/blogs/${title}`,
        method: "GET",
      }),
    }),
    deleteBlog: builder.mutation({
      query: (blogId) => ({
        url: `/blogs/${blogId}/delete`,
        method: "DELETE",
        credentials: "include",
      }),
    }),
    commentToBlog: builder.mutation({
      query: ({ commentData, blogId }) => ({
        url: `/blogs/${blogId}/comments`,
        method: "POST",
        body: commentData,
        credentials: "include",
      }),
    }),

    getBlogComments: builder.mutation({
      query: (blogId) => ({
        url: `/blogs/${blogId}/comments`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetAllBlogsMutation,
  useCreateNewBlogMutation,
  useGetBlogByTitleMutation,
  useGetBlogByUserMutation,
  useReactToBlogMutation,
  useCheckBlogAlreadyCreatedMutation,
  usePublishBlogMutation,
  useUpdatedBlogMutation,
  useDeleteBlogMutation,
  useCommentToBlogMutation,
  useGetBlogCommentsMutation,
} = blogApi;
