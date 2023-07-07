const {
  createNewBlog,
  allBlogs,
  updateBlogData,
  removeBlog,
  checkBlogExistByTitle,
} = require("../services/blogServices");

const { updateReactionToBlog } = require("../services/reactionServices");
const {
  addCommentsToBlog,
  updateBlogComment,
  deleteBlogComment,
} = require("../services/commentServices");
const ResponseHandler = require("../lib/generalResponse/ResponseHandler");

const createBlog = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { title, description, content } = req.body;

    const createdBlog = await createNewBlog(
      title,
      description,
      content,
      userId
    );

    if (createdBlog) {
      ResponseHandler.created(res, createdBlog, "blog created successfully");
    }
  } catch (error) {
    next(error);
  }
};

const getAllBlogs = async (req, res, next) => {
  try {
    const blogs = await allBlogs();
    if (blogs) {
      ResponseHandler.ok(res, blogs, "success");
    }
  } catch (error) {
    next(error);
  }
};

const getBlogByTitle = async (req, res, next) => {
  try {
    const { blogTitle } = req.params;

    const blog = await checkBlogExistByTitle(blogTitle);

    if (blog) {
      ResponseHandler.ok(res, blog, "success");
    }
  } catch (error) {
    next(error);
  }
};

const editBlog = async (req, res, next) => {
  try {
    const { blogId } = req.params;
    const { title, description, content } = req.body;
    const blog = await updateBlogData(blogId, title, description, content);

    if (blog) {
      ResponseHandler.ok(res, blog, "success");
    }
  } catch (error) {
    next(error);
  }
};

const deleteBlog = async (req, res, next) => {
  try {
    const { blogId } = req.params;

    const blog = await removeBlog(blogId);

    if (blog) {
      ResponseHandler.ok(res, {}, "blog deleted successfully");
    }
  } catch (error) {
    next(error);
  }
};

const reactToBlog = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { reaction } = req.body;
    const { blogId } = req.params;

    const reactedToBlog = await updateReactionToBlog(userId, blogId, reaction);

    if (reactedToBlog) {
      ResponseHandler.ok(res, reactedToBlog, "success");
    }
  } catch (error) {
    next(error);
  }
};

const commentToBlog = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { text } = req.body;
    const { blogId } = req.params;

    const blogComment = await addCommentsToBlog(blogId, userId, text);

    if (blogComment) {
      ResponseHandler.ok(res, blogComment, "comment addedd successfuly");
    }
  } catch (error) {
    next(error);
  }
};

const editComment = async (req, res, next) => {
  try {
    const { blogId, commentId } = req.params;
    const { text } = req.body;

    const updatedComment = await updateBlogComment(blogId, commentId, text);

    if (updatedComment) {
      ResponseHandler.ok(res, updatedComment, "comment updated successfully");
    }
  } catch (error) {
    next(error);
  }
};

const deleteComment = async (req, res, next) => {
  try {
    const { blogId, commentId } = req.params;
    const blog = await deleteBlogComment(blogId, commentId);

    if (blog) {
      ResponseHandler.ok(res, blog, "success");
    }
  } catch (error) {
    next(error);
  }
};
module.exports = {
  createBlog,
  getAllBlogs,
  getBlogByTitle,
  editBlog,
  deleteBlog,
  reactToBlog,
  commentToBlog,
  editComment,
  deleteComment,
};
