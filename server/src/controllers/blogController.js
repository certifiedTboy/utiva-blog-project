const {
  createNewBlog,
  allBlogs,
  updateBlogData,
  removeBlog,
  checkBlogExistByTitle,
} = require("../services/blogServices");
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

    console.log(blogId);

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
module.exports = {
  createBlog,
  getAllBlogs,
  getBlogByTitle,
  editBlog,
  deleteBlog,
};
