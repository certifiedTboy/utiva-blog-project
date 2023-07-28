import React, { useEffect } from "react";
import { useGetAllBlogsMutation } from "../../lib/APIS/blogApis/BlogApi";

const UseOptions = (pageNumber) => {
  const blogs = [];
  const [getAllBlogs, { isSuccess, data }] = useGetAllBlogsMutation();

  useEffect(() => {
    console.log("i run");
    const onGetAllBlogs = async () => {
      await getAllBlogs();
    };

    onGetAllBlogs();
  }, []);

  useEffect(() => {
    if (isSuccess) {
      data?.data?.map((blog) => {
        let newBlogData = {
          text: blog.title,
          value: blog.title,
          url: `http://localhost:3000/api/v1/blogs/${blog._id}`,
        };

        return blogs.push(newBlogData);
      });
    }
  }, [isSuccess, data?.data]);

  console.log(blogs);

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
