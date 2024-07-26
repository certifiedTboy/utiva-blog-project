import React, { useState, useEffect, Fragment } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useGetAllBlogsMutation } from "../../../lib/APIS/blogApis/BlogApi";
import BlogCard from "./BlogCard";
import LoadingPlaceHolder from "./LoadingPlaceHolder";
import DataError from "../../Error/DataError";

const AllBlogs = () => {
  const [pageNum, setPageNum] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [totalBlogs, setTotalBlogs] = useState(0);

  const [getAllBlogs, { data, isError, error, isLoading, isSuccess }] =
    useGetAllBlogsMutation();

  useEffect(() => {
    // update blog state on request success
    if (isSuccess) {
      setBlogs([...blogs, ...data?.data?.blogs]);
      setTotalBlogs(data?.data?.total);
    }

    // check if 0 data is returned from db to update hasMore
    if (data?.data?.blogs?.length > 0) {
      setHasMore(true);
    } else {
      setHasMore(false);
    }
  }, [isSuccess]);

  const changePageNum = () => {
    if (hasMore) {
      setPageNum(pageNum + 1);
    }
  };

  useEffect(() => {
    getAllBlogs(pageNum);
  }, [pageNum]);

  const errorMessage = error?.data?.message || "something went wrong";

  return (
    <Fragment>
      <InfiniteScroll
        dataLength={totalBlogs}
        next={changePageNum}
        hasMore={hasMore}
        loader={<LoadingPlaceHolder />}
        style={{ overflow: "hidden" }}
        endMessage={<p></p>}
      >
        {blogs.map((blog) => (
          <BlogCard
            title={blog.title}
            description={blog.description}
            key={blog._id}
            createdAt={blog.createdAt}
            userNameData={blog.user}
          />
        ))}
      </InfiniteScroll>
      {isLoading && <LoadingPlaceHolder />}

      {isError && <DataError errorMessage={errorMessage} path={"/blogs"} />}
    </Fragment>
  );
};

export default AllBlogs;
