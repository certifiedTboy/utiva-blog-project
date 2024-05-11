import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import {
  useReactToBlogMutation,
  useGetBlogByTitleMutation,
} from "../../../lib/APIS/blogApis/BlogApi";

const Reaction = ({ blogId }) => {
  // const reactionRef = useRef("");
  const params = useParams();

  const { blogTitle } = params;

  const { user } = useSelector((state) => state.userState);

  const [reactToBlog, { isSuccess }] = useReactToBlogMutation();

  const [getBlogByTitle, { data }] = useGetBlogByTitleMutation();

  const onReactToBlog = async (event) => {
    // const reaction = reactionRef.current.value;
    // const reactionData = { reaction };

    await reactToBlog(blogId);
  };

  useEffect(() => {
    const onLoadBlogByTitle = async () => {
      await getBlogByTitle(blogTitle);
    };

    onLoadBlogByTitle();
  }, [isSuccess, blogTitle]);

  return (
    <div>
      {user && (
        <button
          type="submit"
          class="btn-primary position-relative"
          value="like"
          // ref={reactionRef}
          onClick={onReactToBlog}
        >
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="19"
              height="19"
              fill="white"
              class="bi bi-heart-fill"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
              />
            </svg>
          </span>
          <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            {data?.data?.reactions.length}
          </span>
        </button>
      )}
      {!user && (
        <button type="button" class="btn-primary position-relative" disabled>
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="19"
              height="19"
              fill="white"
              class="bi bi-heart-fill"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
              />
            </svg>
          </span>
          <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            {data?.data?.reactions.length}
          </span>
        </button>
      )}
    </div>
  );
};

export default Reaction;
