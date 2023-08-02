const { checkBlogExistById } = require("./blogServices");
const { checkThatUserExistById } = require("./userServices");

const addCommentsToBlog = async (blogId, userId, text) => {
  const blog = await checkBlogExistById(blogId);
  const user = await checkThatUserExistById(userId);

  if (blog || blog) {
    const commentData = {
      text,
      user: {
        userId,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    };

    blog.comments.push(commentData);
    await blog.save();
    return blog;
  }
};

const blogComments = async (blogId) => {
  const blog = await checkBlogExistById(blogId);

  if (blog) {
    return blog.comments;
  }
};

const updateBlogComment = async (blogId, commentId, text) => {
  const blog = await checkBlogExistById(blogId);

  if (blog) {
    const commentToUpdate = blog.comments.find(
      (comment) => comment._id.toString() === commentId
    );
    commentToUpdate.text = text;

    await blog.save();

    return blog;
  }
};

const deleteBlogComment = async (blogId, commentId) => {
  const blog = await checkBlogExistById(blogId);
  if (blog) {
    const blogCommentIndex = blog.comments.findIndex(
      (comment) => comment._id.toString() === commentId
    );
    blog.comments.splice(blogCommentIndex, 1);

    await blog.save();

    return blog;
  }
};

module.exports = {
  addCommentsToBlog,
  updateBlogComment,
  deleteBlogComment,
  blogComments,
};
