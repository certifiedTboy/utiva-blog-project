const { checkThatUserExistById } = require("./userServices");
const ServerError = require("../lib/errorInstances/ServerError");

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
        const followerData = {
          username: currentUser.username,
          userId: currentUser._id,
        };

        const followingData = {
          username: otherUser.username,
          userId: otherUser._id,
        };
        otherUser?.followers.push(followerData);
        currentUser.following.push(followingData);

        await otherUser.save();
        await currentUser.save();

        return currentUser;
      } else {
        const followingIndex = currentUser.following.findIndex(
          (follow) => follow.userId === otherUser._id
        );
        const followerIndex = otherUser.followers.findIndex(
          (follower) => follower.userId === currentUser._id
        );
        currentUser.following.splice(followingIndex, 1);
        otherUser.followers.splice(followerIndex, 1);
        await currentUser.save();
        await otherUser.save();
        return currentUser;
      }
    }
  } catch (error) {
    throw new ServerError("something went wrong");
  }
};

const checkThatUserAlreadyFollowed = async (followerId, userId) => {
  const user = await checkThatUserExistById(followerId);

  if (user) {
    const alreadyFollowedUser = user.following.find(
      (follow) => follow.userId.toString() === userId
    );

    return alreadyFollowedUser;
  }
};

module.exports = { updateUserFollower };
