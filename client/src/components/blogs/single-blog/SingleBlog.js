import React, { useState, useEffect } from "react";
import { Interweave } from "interweave";
import Moment from "react-moment";
import { NavLink, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  useGetBlogByTitleMutation,
  useCommentToBlogMutation,
} from "../../../lib/APIS/blogApis/BlogApi";
import { useFollowUserMutation } from "../../../lib/APIS/userApi/userApi";
import { transform } from "./Transform";
import RelatedPosts from "./RelatedPosts";
import KeyWords from "./KeyWords";
import "./SingleBlog.css";
import Reaction from "./Reaction";

const SingleBlog = () => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [text, setText] = useState("");

  let BASE_URL;

  if (process.env.NODE_ENV === "development") {
    BASE_URL = process.env.REACT_APP_DEV_IMAGE_URL;
  } else {
    BASE_URL = process.env.REACT_APP_PROD_IMAGE_URL;
  }

  const [getBlogByTitle, { data, isSuccess: success, isError, error }] =
    useGetBlogByTitleMutation();

  const [followUser, { isSuccess: followSuccess, data: followData }] =
    useFollowUserMutation();

  const [commentToBlog, { isSuccess: commentSuccess, isError: commentError }] =
    useCommentToBlogMutation();

  const { user: currentUser } = useSelector((state) => state.userState);

  const params = useParams();

  const { blogTitle } = params;

  const commentChangeHandler = (event) => {
    setText(event.target.value);
  };

  useEffect(() => {
    const onGetBlogByTitle = async () => {
      await getBlogByTitle(blogTitle);
    };

    onGetBlogByTitle();
  }, [blogTitle, commentSuccess]);

  useEffect(() => {
    if (currentUser) {
      setIsFollowing(
        currentUser?.followers.find((fData) => fData._id === currentUser._id)
      );
    }
  }, []);

  const followUserHandler = async () => {
    const followData = { otherUserId: currentUser._id };
    await followUser(followData);
  };

  const onCommentToBlog = async (event) => {
    event.preventDefault();
    if (!text || text.trim().length === 0) {
      return;
    }
    const commentData = { text };
    await commentToBlog({ commentData, blogId: data?.data?._id });

    return setText("");
  };

  return (
    <div className="mt-150 mb-150 mt-5">
      <div className="container">
        <div className="row">
          <div className="col-md-8">
            <div className="single-article-section">
              <div className="single-article-text">
                <h2>{data?.data?.title}</h2>
                <p className="blog-meta d-inline mr-2">
                  <span className="author">
                    <img
                      className="user_image"
                      src={
                        data?.data?.user?.profilePicture.split(":")[0] ===
                          "https" ||
                        data?.data?.user?.profilePicture.split(":")[0] ===
                          "http"
                          ? data?.data?.user?.profilePicture
                          : `${BASE_URL}/${data?.data?.user?.profilePicture}`
                      }
                    />
                    <i className="fas fa-user ml-2"></i>
                    <NavLink to={`/w-d/${data?.data?.user?.username}`}>
                      {" "}
                      <strong>
                        {" "}
                        <a href="">
                          {" "}
                          {data?.data?.user?.firstName}{" "}
                          {data?.data?.user?.lastName}{" "}
                        </a>
                      </strong>
                    </NavLink>
                  </span>

                  <span className="date">
                    <i className="fas fa-calendar ml-2"></i>{" "}
                    <Moment className="meta-own" fromNow>
                      {data?.data?.createdAt}
                    </Moment>
                  </span>
                </p>
                <div className="mb-4">
                  <button type="button" class="btn-primary mr-2">
                    following{" "}
                    <span className={`badge text-bg-secondary`}>
                      {currentUser?.following.length}
                    </span>
                  </button>

                  <button type="button" class="btn-primary">
                    followers{" "}
                    <span className="badge text-bg-secondary">
                      {currentUser?.followers.length}
                    </span>
                  </button>

                  {currentUser && data?.data?.user._id !== currentUser._id && (
                    <button
                      type="submit"
                      className="btn-success d-inline ml-2"
                      onClick={followUserHandler}
                    >
                      {isFollowing ? "unfollow" : "follow"}
                    </button>
                  )}
                </div>

                {data?.data?.content && (
                  <div className="code_pre">
                    <Interweave
                      content={data?.data?.content}
                      transform={transform}
                    />
                  </div>
                )}
              </div>
              {data?.data && <Reaction blogId={data?.data?._id} />}

              <div className="comments-list-wrap">
                {data?.data && (
                  <h3 className="comment-count-title">
                    {data?.data?.comments?.length} Comments
                  </h3>
                )}
                <div className="comment-list">
                  {data?.data?.comments &&
                    data?.data?.comments?.map((comment) => {
                      return (
                        <div className="single-comment-body" key={comment._id}>
                          {" "}
                          <div className="comment-text-body">
                            <h4>
                              <span className="author mr-2">
                                <img
                                  className="user_image"
                                  src={
                                    comment.user.profilePicture.split(
                                      ":"
                                    )[0] === "https" ||
                                    comment.user.profilePicture.split(
                                      ":"
                                    )[0] === "http"
                                      ? comment.user.profilePicture
                                      : `${BASE_URL}/${comment.user.profilePicture}`
                                  }
                                />
                              </span>
                              {comment?.user?.firstName}{" "}
                              {comment?.user?.lastName}
                              <span className="comment-date">
                                <Moment className="meta-own" fromNow>
                                  {comment?.createdAt}
                                </Moment>
                              </span>{" "}
                            </h4>
                            <p>{comment.text}</p>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>

              {currentUser && (
                <div className="comment-template">
                  <h4>Leave a comment</h4>

                  <form onSubmit={onCommentToBlog}>
                    <p>
                      <textarea
                        onChange={commentChangeHandler}
                        name="comment"
                        id="comment"
                        cols="30"
                        rows="3"
                        placeholder="Your Message"
                        value={text}
                      ></textarea>
                    </p>
                    <p>
                      <input type="submit" value="Submit" />
                    </p>
                  </form>
                </div>
              )}
            </div>
          </div>
          <div className="col-md-4 d-none d-sm-none d-md-block">
            <div className="sidebar-section">
              <div className="recent-posts">
                <h4>Recent Posts</h4>
                {data && <RelatedPosts userId={data?.data?.user._id} />}
              </div>

              <div className="tag-section">
                <h4>Keywords</h4>
                {data && (
                  <KeyWords
                    title={data?.data?.title}
                    description={data?.data?.description}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleBlog;
