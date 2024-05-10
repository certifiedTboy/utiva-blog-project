const { checkBlogExistById } = require("./blogServices");
const Reaction = require("../models/reaction");

const updateReactionToBlog = async (userId, blogId, reaction) => {
  const blog = await checkBlogExistById(blogId);

  const userAlreadyReactedToBlog = await checkThatUserAlreadyReactToBlog(
    blogId,
    userId
  );

  if (!userAlreadyReactedToBlog) {
    const reactionData = {
      userId,
      reaction,
    };
    blog.reactions.push(reactionData);
    await blog.save();
    return blog;
  } else {
    const blogReactionIndex = blog.reactions.findIndex(
      (reaction) => reaction.userId.toString() === userId
    );
    blog.reactions.splice(blogReactionIndex, 1);

    await blog.save();
    return blog;
  }
};

const checkThatUserAlreadyReactToBlog = async (blogId, userId) => {
  const foundBlog = await checkBlogExistById(blogId);

  const userAlreadyReacted = foundBlog.reactions.find(
    (reaction) => reaction.userId.toString() === userId
  );

  return userAlreadyReacted;
};

module.exports = { updateReactionToBlog };
