import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import {
  useGetBlogByUserMutation,
  usePublishBlogMutation,
  useDeleteBlogMutation,
  useCheckBlogAlreadyCreatedMutation,
} from "../../lib/APIS/blogApis/BlogApi";

import PreviewModal from "../post-builder/PreviewModal";
import classes from "./Profile.module.css";

const BlogByUser = ({ userData }) => {
  const [totalPublishBlogs, setTotalPublishedBlogs] = useState([]);
  const [blogByUser, setBlogByUser] = useState([]);
  const [errorMessage, setErrorMessage] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [showEmailInput, setShowEmailInput] = useState({
    state: false,
    btn_value: "",
  });
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");

  const [recordsPerPage] = useState(4);
  const indexOfLastRecord = 1 * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

  const params = useParams();
  const { username } = params;

  const [getBlogsByUser, { isSuccess, data: blogs }] =
    useGetBlogByUserMutation();

  const [publishBlog, { isSuccess: publishSuccess }] = usePublishBlogMutation();
  const [deleteBlog, { isSuccess: deleteSuccess }] = useDeleteBlogMutation();

  const [
    checkBlogAlreadyCreated,
    { isSuccess: checkBlogSuccess, data: existingBlog },
  ] = useCheckBlogAlreadyCreatedMutation();

  const { user } = useSelector((state) => state.userState);

  // getall Blogs By user
  useEffect(() => {
    const onGetAllBlogs = async () => {
      await getBlogsByUser(userData?.data?._id);
    };

    if (user) {
      onGetAllBlogs();
    }
  }, [user, publishSuccess, deleteSuccess]);

  // show blog preview modal
  const onShowModal = () => {
    if (showModal) {
      return setShowModal(false);
    } else {
      setShowModal(true);
    }
  };

  //publish created blog
  const onPublishBlog = async (event) => {
    event.preventDefault();
    await publishBlog(event.target.value);
  };

  //get blog by blogId
  const onGetBlogById = async (event) => {
    await checkBlogAlreadyCreated(event.target.value);
  };

  // delete blog handler
  const onDeleteBlog = async (event) => {
    if (userEmail.trim() === "") {
      return setErrorMessage("Email input can't be empty");
    }

    // confirm if user email is valid and authentic
    if (userEmail !== user?.data?.email) {
      return setErrorMessage("request failed, invalid user email");
    }

    await deleteBlog(event.target.value);
  };

  // confirm blog delete
  const confirmDeleteHandler = (event) => {
    if (showEmailInput.state) {
      setErrorMessage("");
      return setShowEmailInput({ state: false, btn_value: "" });
    } else {
      setErrorMessage("");
      return setShowEmailInput({ state: true, btn_value: event.target.value });
    }
  };

  // email data handler
  const emailInputHandler = (event) => {
    setErrorMessage("");
    setUserEmail(event.target.value);
  };

  useEffect(() => {
    if (blogs) {
      if (user || user?.data?.username === username) {
        return setBlogByUser(
          blogs?.data?.slice(indexOfFirstRecord, indexOfLastRecord)
        );
      }

      if (!user || user?.data?.username !== username) {
        const publishedBlogs = blogs?.data?.filter((blog) => blog.isPublished);
        console.log(publishedBlogs);
        setTotalPublishedBlogs(publishedBlogs);
        return setBlogByUser(
          publishedBlogs.slice(indexOfFirstRecord, indexOfLastRecord)
        );
      }
    }
  }, [blogs?.data, isSuccess, user]);

  useEffect(() => {
    if (checkBlogSuccess) {
      setTitle(existingBlog?.data?.title);
      setDescription(existingBlog?.data?.description);
      setContent(existingBlog?.data?.content);
      return onShowModal();
    }
  }, [checkBlogSuccess, existingBlog]);

  return (
    <>
      {showModal && (
        <PreviewModal
          title={title}
          description={description}
          content={content}
          onShowModal={onShowModal}
        />
      )}

      {errorMessage && (
        <>
          <div class="alert alert-danger text-center" role="alert">
            {errorMessage}
          </div>
        </>
      )}
      <div className="ml-2 mr-2">
        <div className="row">
          <div className="col-12">
            <div>
              <p>Blogs Created</p>
            </div>

            {blogByUser.map((blog) => {
              return (
                <div className="card mb-2" key={blog._id}>
                  <div className="card-header">
                    <NavLink to={`/blogs/${blog.title}`}>{blog.title}</NavLink>
                  </div>
                  <div className={`${classes.card_body} card-body`}>
                    {user && user?.data?.username === username && (
                      <div className={classes.btn_container}>
                        {showEmailInput.btn_value !== blog._id && (
                          <button
                            value={blog._id}
                            className={`mr-1 ${classes.action_btn}`}
                            onClick={onGetBlogById}>
                            View
                          </button>
                        )}
                        {showEmailInput.btn_value !== blog._id && (
                          <button
                            value={blog._id}
                            className={`mr-1 ${classes.action_btn}`}
                            onClick={onPublishBlog}>
                            {blog.isPublished ? "Unpublish" : "Publish"}
                          </button>
                        )}

                        {showEmailInput.btn_value !== blog._id && (
                          <NavLink
                            to={`/blog/edit-blog/${blog._id}`}
                            className="mr-1">
                            Edit
                          </NavLink>
                        )}
                        <button
                          value={blog._id}
                          className={`${classes.delete_btn}`}
                          onClick={confirmDeleteHandler}>
                          {showEmailInput.btn_value === blog._id
                            ? "Cancle"
                            : "Delete"}
                        </button>
                      </div>
                    )}
                    {showEmailInput.btn_value === blog._id && (
                      <div className={classes.input_container}>
                        <input
                          className={`${classes.email_input}`}
                          placeholder="Enter email to confirm"
                          onChange={emailInputHandler}
                        />{" "}
                        <button
                          value={showEmailInput.btn_value}
                          className={`${classes.confirm_btn}`}
                          onClick={onDeleteBlog}>
                          Confirm
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
            {user && user?.data?.username === username && (
              <div>
                {blogByUser && (
                  <a href="#">
                    {blogs?.data?.length - blogByUser.length} more blogs...
                  </a>
                )}
              </div>
            )}

            {user && user?.data?.username !== username && (
              <div>
                {totalPublishBlogs && (
                  <a href="#">
                    {blogByUser.length - totalPublishBlogs} more blogs...
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogByUser;
