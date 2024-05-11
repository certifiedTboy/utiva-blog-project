const {
  checkBlogExistByIdForReaction,
  checkBlogExistById,
} = require("./blogServices");
const Reaction = require("../models/reaction");
const NotFoundError = require("../lib/errorInstances/NotFoundError");

const updateReactionToBlog = async (userId, blogId, reaction) => {
  const blog = await checkBlogExistById(blogId);

  if (!blog) {
    throw new NotFoundError("blog does not exist");
  }

  const userAlreadyReactedToBlog = await checkThatUserAlreadyReactToBlog(
    blogId,
    userId
  );

  if (!userAlreadyReactedToBlog) {
    const reactionData = {
      reaction,
      user: userId,
    };
    const newReaction = await Reaction.create(reactionData);
    if (newReaction) {
      blog.reactions.push(newReaction._id);
      await blog.save();
      return blog;
    }

    return blog;
  } else {
    const deletedReaction = await Reaction.findOneAndDelete({
      _id: userAlreadyReactedToBlog._id,
    });

    if (deletedReaction) {
      return blog;
    }

    return blog;
  }
};

const checkThatUserAlreadyReactToBlog = async (blogId, userId) => {
  const foundBlog = await checkBlogExistByIdForReaction(blogId);

  const userAlreadyReacted = foundBlog.reactions.find(
    (reaction) => reaction.user._id.toString() === userId
  );

  return userAlreadyReacted;
};

module.exports = { updateReactionToBlog };
