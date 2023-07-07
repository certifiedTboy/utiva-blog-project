const { checkBlogExistById } = require("./blogServices");

const addCommentsToBlog = async (blogId, userId, text) => {
  const blog = await checkBlogExistById(blogId);
  const commentData = {
    text,
    userId,
  };
  if (blog) {
    blog.comments.push(commentData);
    await blog.save();
    return blog;
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

module.exports = { addCommentsToBlog, updateBlogComment, deleteBlogComment };
