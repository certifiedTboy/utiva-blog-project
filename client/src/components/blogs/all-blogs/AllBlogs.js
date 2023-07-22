import React from "react";
import { useGetAllBlogsQuery } from "../../../lib/APIS/blogApis/BlogApi";
import BlogCard from "./BlogCard";

const AllBlogs = () => {
  const { data, isError, error, isLoading } = useGetAllBlogsQuery();

  return (
    <div>
      {data &&
        data.data.map((blog) => {
          return (
            <BlogCard
              title={blog.title}
              description={blog.description}
              blogId={blog._id}
              createdAt={blog.createdAt}
            />
          );
        })}
    </div>
  );
};

export default AllBlogs;
