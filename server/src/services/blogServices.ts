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
  const cursor = await Blog.aggregate([
    {
      $match: {
        isPublished: {
          $eq: true,
        },
      },
    },
    {
      $count: "title",
    },
  ]);

  const blogs = await Blog.find({ isPublished: true }, { __v: 0 })
    .skip(skip)
    .limit(limit)
    .populate("user", "username email _id firstName lastName profilePicture")
    .populate({
      path: "reactions",
      populate: {
        path: "user",
        select: "_id",
      },
    })
    .exec();

  const total = cursor[0].title;

  const pages = Math.abs(total / 5);

  return { blogs, total, pages };
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
    .populate("reactions")
    .populate("user", "username email _id firstName lastName profilePicture")
    .exec();

  if (!blog) {
    throw new NotFoundError("blog does not exist");
  }

  return blog;
};

const checkBlogExistById = async (blogId) => {
  const blog = await Blog.findById(blogId).populate({
    path: "comments",
    populate: {
      path: "user",
      select: "username email _id firstName lastName profilePicture",
    },
  });

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

const checkBlogExistByIdForReaction = async (blogId) => {
  const blog = await Blog.findById(blogId).populate({
    path: "reactions",
    populate: {
      path: "user",
      select: "_id",
    },
  });

  if (!blog) {
    throw new NotFoundError("blog does not exist");
  }

  return blog;
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
  checkBlogExistByIdForReaction,
};
