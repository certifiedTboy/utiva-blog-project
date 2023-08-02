import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setBlog } from "./redux/BlogSlice";

export const blogApi = createApi({
  reducerPath: "blogApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://utivablog-project-server.onrender.com/api/v1/",
  }),
  endpoints: (builder) => ({
    getAllBlogs: builder.mutation({
      query: (pageNum) => ({
        url: `blogs/published-blogs?page=${pageNum}&limit=3`,
        method: "GET",
      }),
    }),

    createNewBlog: builder.mutation({
      query: (blogData) => ({
        url: "/blogs/create-blog",
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
        url: `/blogs/publish-blog/${payload}`,
        method: "POST",
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
        url: `/blogs/edit-blog/${blogId}`,
        method: "PUT",
        body: blogData,
        credentials: "include",
      }),
    }),

    checkBlogAlreadyCreated: builder.mutation({
      query: (blogId) => ({
        url: `/blogs/user-blog-by-id/${blogId}`,
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
        url: `/blogs/react-to-blog/${blogId}`,
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
        url: `/blogs/delete-blog/${blogId}`,
        method: "DELETE",
        credentials: "include",
      }),
    }),
    commentToBlog: builder.mutation({
      query: ({ commentData, blogId }) => ({
        url: `/blogs/add-comment/${blogId}`,
        method: "POST",
        body: commentData,
        credentials: "include",
      }),
    }),

    getBlogComments: builder.mutation({
      query: (blogId) => ({
        url: `/blogs/blog/comments/${blogId}`,
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
