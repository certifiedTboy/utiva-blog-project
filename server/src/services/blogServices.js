const Blog = require("../models/blog");
const NotFoundError = require("../lib/errorInstances/NotFoundError");

const createNewBlog = async (title, description, content, userId) => {
  const blogData = { title, description, content, user: { userId } };

  const blog = new Blog(blogData);
  await blog.save();
  if (blog) {
    return blog;
  }
};

const allBlogs = async () => {
  const blogs = await Blog.find({});

  return blogs;
};

const checkBlogExistByTitle = async (blogTitle) => {
  const blog = await Blog.findOne({ title: blogTitle });

  if (!blog) {
    throw new NotFoundError("blog does not exist");
  }

  return blog;
};

const checkBlogExistById = async (blogId) => {
  const blog = await Blog.findById(blogId);

  if (!blog) {
    throw new NotFoundError("blog does not exist");
  }

  return blog;
};

const updateBlogData = async (blogId, title, description, content) => {
  const blogData = {
    title,
    description,
    content,
  };
  const updatedBlog = await Blog.findByIdAndUpdate(blogId, blogData);

  if (updatedBlog) {
    return updatedBlog;
  }
};

const removeBlog = async (blogId) => {
  const deletedBlog = await Blog.findByIdAndRemove(blogId);

  if (deletedBlog) {
    return deletedBlog;
  }
};

module.exports = {
  createNewBlog,
  allBlogs,
  checkBlogExistByTitle,
  updateBlogData,
  removeBlog,
};
