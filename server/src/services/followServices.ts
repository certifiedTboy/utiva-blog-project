const { mongoDbTransaction } = require("../helpers/database/dbConfig");
const { checkThatUserExistById } = require("./userServices");
const ServerError = require("../lib/errorInstances/ServerError");

const checkThatUserAlreadyFollowed = async (followerId, userId) => {
  const user = await checkThatUserExistById(followerId);

  if (user) {
    const alreadyFollowedUser = user.following.find(
      (follow) => follow._id.toString() === userId
    );

    return alreadyFollowedUser;
  }
};

const updateUserFollower = async (userId, otherUserId) => {
  try {
    const currentUser = await checkThatUserExistById(userId);
    const otherUser = await checkThatUserExistById(otherUserId);

    if (currentUser && otherUser) {
      const userAlreadyFollowed = await checkThatUserAlreadyFollowed(
        currentUser._id.toString(),
        otherUser._id.toString()
      );

      // update user following
      if (!userAlreadyFollowed) {
        otherUser?.followers.push(currentUser._id);
        currentUser?.following.push(otherUser._id);

        await otherUser.save();
        await currentUser.save();

        return currentUser;
      } else {
        const followingIndex = currentUser.following.findIndex(
          (follow) => follow._id.toString() === otherUser._id.toString()
        );

        const followerIndex = otherUser.followers.findIndex(
          (follower) => follower._id.toString() === currentUser._id.toString()
        );

        if (followingIndex >= 0 && followerIndex >= 0) {
          currentUser.following.splice(followingIndex, 1);
          otherUser.followers.splice(followerIndex, 1);
          await currentUser.save();
          await otherUser.save();
          return currentUser;
        }

        throw new ServerError("failed to follow");
      }
    }
  } catch (error) {
    throw new ServerError("something went wrong");
  }
};

module.exports = { updateUserFollower };
