import React, { useEffect, useState } from "react";
import { useGetAllBlogsMutation } from "../../lib/APIS/blogApis/BlogApi";

const UseOptions = () => {
  const [blogs, setBlogs] = useState([]);
  const [getAllBlogs, { isSuccess, data }] = useGetAllBlogsMutation();

  useEffect(() => {
    const onGetAllBlogs = async () => {
      console.log("i run");
      await getAllBlogs();
    };

    const timer = setTimeout(() => {
      onGetAllBlogs();
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (isSuccess) {
      const blogData = data?.data?.map((blog) => {
        let newBlogData = {
          text: blog.title,
          value: blog.title,
          url: `https://utivablog-project-server.onrender.com/api/v1/blogs/${blog._id}`,
        };

        return newBlogData;
      });

      return setBlogs(blogData);
    }
  }, [isSuccess, data?.data]);

  const toolbar = {
    inline: { inDropdown: true },
    list: { inDropdown: true },
    textAlign: { inDropdown: true },
    link: { inDropdown: true },
    history: { inDropdown: true },
  };

  const mention = {
    separator: " ",
    trigger: "@",
    suggestions: blogs,
  };

  const hashtag = {
    separator: " ",
    trigger: "#",
  };

  return { toolbar, mention, hashtag };
};

export default UseOptions;
