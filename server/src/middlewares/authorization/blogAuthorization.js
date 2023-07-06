const Blog = require("../../models/blog");
const UnprocessableError = require("../../lib/errorInstances/UnprocessableError");

const checkBlogOwnership = async (req, res, next) => {
  try {
    const { blogId } = req.params;

    if (req.user) {
      const blog = await Blog.findById(blogId);

      if (blog.user.userId.toString() !== req.user.id) {
        throw new UnprocessableError("you are not authorized for this action");
      } else {
        next();
      }
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { checkBlogOwnership };
