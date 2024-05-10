import React, { useState, useEffect, useCallback, Fragment } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useGetAllBlogsMutation } from "../../../lib/APIS/blogApis/BlogApi";
import BlogCard from "./BlogCard";
import LoadingPlaceHolder from "./LoadingPlaceHolder";
import DataError from "../../Error/DataError";

const AllBlogs = () => {
  const [pageNum, setPageNum] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [blogs, setBlogs] = useState([]);

  const [getAllBlogs, { data, isError, error, isLoading, isSuccess }] =
    useGetAllBlogsMutation();

  useEffect(() => {
    getAllBlogs(pageNum);
  }, [pageNum]);

  useEffect(() => {
    // update blog state on request success
    if (isSuccess) {
      setBlogs([...blogs, ...data?.data]);
    }

    // check if 0 data is returned from db to update hasMore
    if (data?.data?.length > 0) {
      setHasMore(true);
    } else {
      setHasMore(false);
    }
  }, [isSuccess]);

  const noBlobMessage = blogs.length === 0 && <h1>No blog created Yet</h1>;

  const errorMessage = error?.data?.message || "something went wrong";

  const changePageNum = () => {
    if (hasMore) {
      setPageNum(pageNum + 1);
    }
  };

  return (
    <Fragment>
      <InfiniteScroll
        dataLength={10000}
        next={changePageNum}
        hasMore={hasMore}
        loader={<LoadingPlaceHolder />}
        style={{ overflow: "hidden" }}
      >
        {blogs.map((blog) => (
          <BlogCard
            title={blog.title}
            description={blog.description}
            blogId={blog._id}
            createdAt={blog.createdAt}
            userNameData={blog.user}
          />
        ))}
      </InfiniteScroll>
      {noBlobMessage}

      {isError && <DataError errorMessage={errorMessage} path={"/blogs"} />}
    </Fragment>
  );
};

export default AllBlogs;
