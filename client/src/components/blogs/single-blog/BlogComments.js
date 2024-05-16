import { useState, useEffect, Fragment } from "react";
import Moment from "react-moment";
import { useSelector } from "react-redux";
import {
  useCommentToBlogMutation,
  useGetBlogCommentsMutation,
} from "../../../lib/APIS/blogApis/BlogApi";

let BASE_URL;

if (process.env.NODE_ENV === "development") {
  BASE_URL = process.env.REACT_APP_DEV_IMAGE_URL;
} else {
  BASE_URL = process.env.REACT_APP_PROD_IMAGE_URL;
}

const BlogComments = ({ blogId }) => {
  const [text, setText] = useState("");

  const [getBlogComments, { data }] = useGetBlogCommentsMutation();

  const [commentToBlog, { isSuccess: commentSuccess }] =
    useCommentToBlogMutation();

  const { user: currentUser } = useSelector((state) => state.userState);

  const commentChangeHandler = (event) => {
    setText(event.target.value);
  };

  const onCommentToBlog = async (event) => {
    event.preventDefault();
    if (!text || text.trim().length === 0) {
      return;
    }
    const commentData = { text };
    await commentToBlog({ commentData, blogId });

    return setText("");
  };

  useEffect(() => {
    const onLoadBlogBlogComments = async () => {
      await getBlogComments(blogId);
    };

    onLoadBlogBlogComments();
  }, [commentSuccess]);

  return (
    <Fragment>
      <div className="comments-list-wrap">
        {data?.data && (
          <h3 className="comment-count-title">
            {data?.data?.length}{" "}
            {data?.data?.length <= 1 ? "comment" : "Comments"}
          </h3>
        )}
        <div className="comment-list">
          {data?.data &&
            data?.data?.map((comment) => {
              return (
                <div className="single-comment-body" key={comment._id}>
                  {" "}
                  <div className="comment-text-body">
                    <h4>
                      <span className="author mr-2">
                        <img
                          className="user_image"
                          src={
                            comment.user.profilePicture.split(":")[0] ===
                              "https" ||
                            comment.user.profilePicture.split(":")[0] === "http"
                              ? comment.user.profilePicture
                              : `${BASE_URL}/${comment.user.profilePicture}`
                          }
                        />
                      </span>
                      {comment?.user?.firstName} {comment?.user?.lastName}
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
    </Fragment>
  );
};

export default BlogComments;
