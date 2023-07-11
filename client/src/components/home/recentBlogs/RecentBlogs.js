import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

import BlogCard from "../../blogs/all-blogs/BlogCard";
import { useGetAllBlogsQuery } from "../../../lib/APIS/blogApis/BlogApi";
import DataError from "../../Error/DataError";
import Loader from "../../UI/loader/Loader";
import "./RecentBlogs.css";

const RecentTopic = () => {
  const { data, isError, error, isLoading } = useGetAllBlogsQuery();

  const [recordsPerPage] = useState(3);
  const [recentBlogs, setRecentBlogs] = useState([]);

  const indexOfLastRecord = 1 * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

  useEffect(() => {
    if (data) {
      setRecentBlogs(data.data.slice(indexOfFirstRecord, indexOfLastRecord));
    }
  }, [indexOfFirstRecord, indexOfLastRecord, data]);

  const loadingData = <Loader />;

  return (
    <div className="latest-news pt-150 pb-150 mt-5 " id="blogs">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 offset-lg-2 text-center">
            <div className="section-title">
              <h3>
                <span className="orange-text">Recent</span> Blogs
              </h3>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-12 text-center">
            {isLoading && loadingData}
            {isError && <DataError errorMessage={error.data.message} />}
          </div>
          {!isLoading &&
            data &&
            recentBlogs.map((blog) => {
              return (
                <div className="col-lg-4 col-md-6" key={blog.id}>
                  <BlogCard
                    title={blog.title}
                    description={blog.description}
                    blogId={blog._id}
                    createdAt={blog.createdAt}
                  />
                </div>
              );
            })}
        </div>
        <div className="row">
          {!isLoading && !isError && (
            <div className="col-12 text-center">
              <NavLink to="/blogs" className="boxed-btn">
                View More
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecentTopic;
