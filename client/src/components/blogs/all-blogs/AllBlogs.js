import React, { useState, useEffect, useCallback } from "react";
import { useGetAllBlogsMutation } from "../../../lib/APIS/blogApis/BlogApi";
import BlogCard from "./BlogCard";
import LoadingPlaceHolder from "./LoadingPlaceHolder";
import DataError from "../../Error/DataError";

const AllBlogs = () => {
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [updatedBlogs, setUpdatedBlogs] = useState([]);

  const [getAllBlogs, { data, isError, error, isLoading, isSuccess }] =
    useGetAllBlogsMutation();

  const onScroll = useCallback(
    // onscroll even observer
    // checks if current value of scroll up event + client height is greater than scrollHeight

    () => {
      const scrollTop = document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      //Page Number increase if it returns true on every scroll up event
      if (scrollTop + clientHeight >= scrollHeight) {
        setPage(page + 1);
      }
    },
    [page]
  );

  window.addEventListener("scroll", onScroll);

  useEffect(() => {
    // remove scroll event fron onscroll method is hasMore is true
    if (hasMore) {
      return () => window.removeEventListener("scroll", onScroll);
    }
  }, [onScroll, hasMore]);

  useEffect(() => {
    // update blog state on request success
    if (isSuccess) {
      setBlogs(data?.data);
    }

    // check if 0 data is returned from db to update hasMore
    if (data?.data.length === 0) {
      return setHasMore(true);
    }
  }, [isSuccess, data]);

  useEffect(() => {
    // fetch blogs from db in batches has page number increases
    const onLoadBlogs = async () => {
      await getAllBlogs(page);
    };
    onLoadBlogs();
  }, [page]);

  useEffect(() => {
    // use spread operator to update recently fetched blogs with previous ones
    return setUpdatedBlogs((prevBlogs) => {
      return [...prevBlogs, ...blogs];
    });
  }, [blogs]);

  const blogContent =
    updatedBlogs.length > 0 &&
    updatedBlogs.map((blog) => {
      return (
        <BlogCard
          title={blog.title}
          description={blog.description}
          blogId={blog._id}
          createdAt={blog.createdAt}
          userId={blog.user.userId}
        />
      );
    });

  const errorMessage = error?.data?.message || "something went wrong";

  return (
    <div>
      {blogContent}
      {isLoading && !hasMore && !isError && <LoadingPlaceHolder />}
      {isError && <DataError errorMessage={errorMessage} path={"/blogs"} />}
    </div>
  );
};

export default AllBlogs;
