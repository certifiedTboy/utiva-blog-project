const { checkBlogExistById } = require("./blogServices");
const { checkThatUserExistById } = require("./userServices");
const Comment = require("../models/comment");

const addCommentsToBlog = async (blogId, userId, text) => {
  const blog = await checkBlogExistById(blogId);

  if (blog) {
    const commentData = {
      text,
      user: userId,
    };

    const comment = await Comment.create(commentData);
    if (comment) {
      blog.comments.push(comment._id);
      await blog.save();
      return blog;
    }
  }
};

const blogComments = async (blogId) => {
  const blog = await checkBlogExistById(blogId);

  if (blog) {
    return blog.comments;
  }
};

const updateBlogComment = async (commentId, text) => {
  const updatedComment = await Comment.findByIdAndUpdate(commentId, { text });

  if (updatedComment) {
    return updatedComment;
  }
};

const deleteBlogComment = async (commentId) => {
  const removedComment = await Comment.findOneAndDelete(commentId);
  if (removedComment) {
    return removedComment;
  }
};

module.exports = {
  addCommentsToBlog,
  updateBlogComment,
  deleteBlogComment,
  blogComments,
};
