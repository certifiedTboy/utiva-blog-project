import React, { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useGetBlogByUserMutation } from "../../../lib/APIS/blogApis/BlogApi";

const RelatedPosts = ({ userId }) => {
  const [recordsPerPage] = useState(6);
  const [recentBlogs, setRecentBlogs] = useState([]);
  const indexOfLastRecord = 1 * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

  const [getBlogsByUser, { isSuccess, isError, error, data }] =
    useGetBlogByUserMutation();

  useEffect(() => {
    const onLoadBlogByUser = async () => {
      await getBlogsByUser(userId);
    };
    if (userId) {
      onLoadBlogByUser();
    }
  }, [userId]);

  useEffect(() => {
    if (isSuccess) {
      const publishedBlogsByUser = data?.data?.filter(
        (blog) => blog.isPublished
      );

      if (data?.data?.length >= 0) {
        setRecentBlogs(
          publishedBlogsByUser.slice(indexOfFirstRecord, indexOfLastRecord)
        );
      }
    }
  }, [indexOfFirstRecord, indexOfLastRecord, userId, isSuccess]);

  console.log(data);

  return (
    <ul>
      {recentBlogs?.map((blog) => {
        return (
          <li key={blog._id}>
            <NavLink to={`/blogs/${blog.title}`}>{blog.title}</NavLink>
          </li>
        );
      })}
    </ul>
  );
};

export default RelatedPosts;
