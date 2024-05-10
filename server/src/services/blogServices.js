const Blog = require("../models/blog");
const NotFoundError = require("../lib/errorInstances/NotFoundError");

const createNewBlog = async (title, description, content, userId) => {
  const blogData = { title, description, content, user: userId };

  const blog = new Blog(blogData);
  await blog.save();
  if (blog) {
    return blog;
  }
};

const allBlogs = async (skip, limit) => {
  const blogs = await Blog.find({}, { __v: 0 }).skip(skip).limit(limit);
  const sortedBlogs = blogs.sort((a, b) => a.createdAt - b.createdAt);
  return sortedBlogs;
};

const publishedBlogs = async (skip, limit) => {
  const blogs = await Blog.find({ isPublished: true }, { __v: 0 })
    .skip(skip)
    .limit(limit)
    .populate("user", "username email _id firstName lastName")
    .exec();

  return blogs;
};

const blogsByAUser = async (userId, skip, limit) => {
  const blogs = await Blog.find({ user: userId });
  return blogs;
};

const checkBlogExistByTitle = async (blogTitle) => {
  const blog = await Blog.findOne({ title: blogTitle })
    .populate({
      path: "comments",
      populate: {
        path: "user",
        select: "username email _id firstName lastName profilePicture",
      },
    })
    .populate("user", "username email _id firstName lastName profilePicture")
    .exec();

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

const updateBlogPublishState = async (blogId) => {
  const blog = await checkBlogExistById(blogId);

  if (blog) {
    if (!blog.isPublished) {
      blog.isPublished = true;
      await blog.save();
      return blog;
    } else {
      blog.isPublished = false;
      await blog.save();
      return blog;
    }
  }
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
  checkBlogExistById,
  updateBlogPublishState,
  publishedBlogs,
  blogsByAUser,
};
