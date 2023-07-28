import React, { Fragment, useState, useRef, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import { useSelector, useDispatch } from "react-redux";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import {
  useCheckBlogAlreadyCreatedMutation,
  useCreateNewBlogMutation,
  usePublishBlogMutation,
  useUpdatedBlogMutation,
} from "../../lib/APIS/blogApis/BlogApi";
import UseOptions from "./UseOptions";
import { clearBlog } from "../../lib/APIS/blogApis/redux/BlogSlice";
import PreviewModal from "./PreviewModal";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./PostBuilder.css";

const PostBuilder = () => {
  const [showModal, setShowModal] = useState(false);
  const [isSaved, setIsSaved] = useState(true);
  const [isPublished, setIsPublished] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [title, setTitle] = useState("");
  const contentRef = useRef("");
  const [description, setDescription] = useState("");
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const { toolbar, mention, hashtag } = UseOptions();

  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { blog } = useSelector((state) => state.blogState);

  const { blogId } = params;

  const [
    checkBlogAlreadyCreated,
    { isSuccess: isAlreadyCreated, isError: notCreated },
  ] = useCheckBlogAlreadyCreatedMutation();

  const [
    createNewBlog,
    { isSuccess: createdSuccess, isLoading: createLoading },
  ] = useCreateNewBlogMutation();

  const [publishBlog, { isSuccess: publishSuccess, data: publishResponse }] =
    usePublishBlogMutation();

  const [updateBlog, { isSuccess: updateSuccess }] = useUpdatedBlogMutation();

  //blog input handlers
  const titleChangeHandler = (event) => {
    setErrorMessage("");
    setIsSaved(false);
    setTitle(event.target.value);
  };

  const descriptionChangeHandler = (event) => {
    setErrorMessage("");
    setIsSaved(false);
    setDescription(event.target.value);
  };

  //Toggle preview modal
  const onShowModal = () => {
    if (showModal) {
      setShowModal(false);
    } else {
      setShowModal(true);
    }
  };

  // Check blog existence for edit
  useEffect(() => {
    const onCheckBlogExist = async () => {
      await checkBlogAlreadyCreated(blogId);
    };

    if (blogId) {
      onCheckBlogExist();
    }
  }, [blogId]);

  // Create blog handler
  const saveBlogAs = async (event) => {
    if (title.trim().length > 50 || description.trim().length > 150) {
      return setErrorMessage(
        "Title or Description cannot be longer than 50 and 150 characters respectively"
      );
    }

    if (title === "" || description === "" || contentRef.current.value === "") {
      return setErrorMessage("Blog inputs can't be empty");
    }

    const blogData = {
      title,
      description,
      content: contentRef.current.value,
    };

    await createNewBlog(blogData);
  };

  // Update blog handler
  const saveBlog = async () => {
    if (
      title.value === "" ||
      description.value === "" ||
      contentRef.current.value === ""
    ) {
      return setErrorMessage("Blog inputs can't be empty");
    }
    const blogData = {
      title,
      description,
      content: contentRef.current.value,
    };

    await updateBlog({ blogData, blogId: blog?.data?._id });
  };

  // publish created blog
  const onPublishBlog = async () => {
    await publishBlog(blog?.data?._id);
  };

  useEffect(() => {
    if (updateSuccess || createdSuccess) {
      return setIsSaved(true);
    }
  }, [updateSuccess, createdSuccess]);

  useEffect(() => {
    if (publishSuccess) {
      if (publishResponse?.data?.isPublished) {
        return setIsPublished(true);
      } else {
        return setIsPublished(false);
      }
    }
  }, [publishSuccess]);

  useEffect(() => {
    //   if blog does not exist
    //   navigate to create fresh article

    if (notCreated) {
      return navigate("/blog/create-blog");
    }

    // clear data content if user navigates to create blog
    if (location.pathname === "/blog/create-blog") {
      dispatch(clearBlog());
      setTitle("");
      setDescription("");
      const contentBlock = htmlToDraft("");
      const contentState = ContentState.createFromBlockArray(
        contentBlock.contentBlocks
      );
      return setEditorState(() => EditorState.createWithContent(contentState));
    }
  }, [location.pathname]);

  useEffect(() => {
    // update article state with existing blog
    if (blog?.data) {
      setTitle(blog?.data?.title);
      setDescription(blog?.data?.description);
      blog?.data?.isPublished ? setIsPublished(true) : setIsPublished(false);
      const contentBlock = htmlToDraft(blog?.data?.content);
      const contentState = ContentState.createFromBlockArray(
        contentBlock.contentBlocks
      );
      return setEditorState(() => EditorState.createWithContent(contentState));
    }
  }, [blog]);

  return (
    <Fragment>
      {showModal && (
        <PreviewModal
          title={title}
          content={contentRef.current.value}
          description={description}
          onShowModal={onShowModal}
        />
      )}

      <div className="container-fluid mt-5">
        <div className="row">
          <div className="col-md-2 col-sm-1 col-12"></div>
          <div className="col-md-8 col-12 col-sm-10">
            For better experience writing your blogs view{" "}
            <a href="/write-article/hints" target="_blank">
              Hints
            </a>
            <header className="App-header">Write Article</header>
            {errorMessage && (
              <div class="alert alert-danger text-center" role="alert">
                {errorMessage}
              </div>
            )}
            <div className="mb-3">
              <p className="d-inline preview-text">
                <strong> Article preview </strong>
              </p>

              {blog?.data && (
                <button
                  onClick={onPublishBlog}
                  type="submit"
                  className={`ml-2 d-inline publish-btn float-right ${
                    isPublished ? "btn-success" : "btn-secondary"
                  }`}>
                  {isPublished ? "Unpublish" : "Publish"}
                </button>
              )}

              {blog?.data && (
                <button
                  type="submit"
                  className={`ml-2 d-inline float-right save-btn ${
                    isSaved ? "btn-warning" : "btn-danger"
                  }`}
                  onClick={saveBlog}>
                  {isSaved ? "Saved" : "Save"}
                  <svg
                    className="ml-2"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-folder-check"
                    viewBox="0 0 16 16">
                    <path d="m.5 3 .04.87a1.99 1.99 0 0 0-.342 1.311l.637 7A2 2 0 0 0 2.826 14H9v-1H2.826a1 1 0 0 1-.995-.91l-.637-7A1 1 0 0 1 2.19 4h11.62a1 1 0 0 1 .996 1.09L14.54 8h1.005l.256-2.819A2 2 0 0 0 13.81 3H9.828a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 6.172 1H2.5a2 2 0 0 0-2 2zm5.672-1a1 1 0 0 1 .707.293L7.586 3H2.19c-.24 0-.47.042-.683.12L1.5 2.98a1 1 0 0 1 1-.98h3.672z" />
                    <path d="M15.854 10.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.707 0l-1.5-1.5a.5.5 0 0 1 .707-.708l1.146 1.147 2.646-2.647a.5.5 0 0 1 .708 0z" />
                  </svg>
                </button>
              )}
              {!blog && (
                <button
                  type="submit"
                  className={`ml-2 d-inline float-right saveas-btn ${
                    isSaved ? "btn-warning" : "btn-danger"
                  }`}
                  onClick={saveBlogAs}>
                  {createLoading ? "please wait" : "Create Blog"}
                  <svg
                    className="ml-2"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-folder-check"
                    viewBox="0 0 16 16">
                    <path d="m.5 3 .04.87a1.99 1.99 0 0 0-.342 1.311l.637 7A2 2 0 0 0 2.826 14H9v-1H2.826a1 1 0 0 1-.995-.91l-.637-7A1 1 0 0 1 2.19 4h11.62a1 1 0 0 1 .996 1.09L14.54 8h1.005l.256-2.819A2 2 0 0 0 13.81 3H9.828a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 6.172 1H2.5a2 2 0 0 0-2 2zm5.672-1a1 1 0 0 1 .707.293L7.586 3H2.19c-.24 0-.47.042-.683.12L1.5 2.98a1 1 0 0 1 1-.98h3.672z" />
                    <path d="M15.854 10.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.707 0l-1.5-1.5a.5.5 0 0 1 .707-.708l1.146 1.147 2.646-2.647a.5.5 0 0 1 .708 0z" />
                  </svg>
                </button>
              )}

              <button
                type="submit"
                className="d-inline float-right preview-btn"
                onClick={onShowModal}>
                Preview
                <svg
                  className="ml-2"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-zoom-in"
                  viewBox="0 0 16 16">
                  <path
                    fill-rule="evenodd"
                    d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"
                  />
                  <path d="M10.344 11.742c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1 6.538 6.538 0 0 1-1.398 1.4z" />
                  <path
                    fill-rule="evenodd"
                    d="M6.5 3a.5.5 0 0 1 .5.5V6h2.5a.5.5 0 0 1 0 1H7v2.5a.5.5 0 0 1-1 0V7H3.5a.5.5 0 0 1 0-1H6V3.5a.5.5 0 0 1 .5-.5z"
                  />
                </svg>
              </button>
            </div>
            <div>
              <div className="form-group title-container">
                <input
                  value={title}
                  onChange={titleChangeHandler}
                  placeholder="Title"
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <input
                  value={description}
                  onChange={descriptionChangeHandler}
                  placeholder="Description"
                  className="form-control"
                />
              </div>
            </div>
            <textarea
              className="text-output"
              disabled
              ref={contentRef}
              value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
            />
            <Editor
              editorState={editorState}
              onEditorStateChange={setEditorState}
              wrapperClassName="wrapper-class"
              editorClassName="editor-class"
              toolbarClassName="toolbar-class"
              toolbar={toolbar}
              mention={mention}
              hashtag={hashtag}
            />
          </div>
          <div className="col-md-2 col-sm-1 col-12"></div>
        </div>
      </div>
    </Fragment>
  );
};

export default PostBuilder;
