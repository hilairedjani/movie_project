// == USER CONNECTIONS CONTROLLER

const UserConnection = require("../models/userConnection");

// == GET

/**
 * @description Find followers for a given user
 */
exports.getFollowers = async (req, res) => {
  try {
    const _following = req.params._following;

    // Fetch followers for user
    const followers = await UserConnection.find({
      _following,
    }).populate("_follower");

    return res.json({ followers });
  } catch (error) {
    console.log("An error occured...");
    console.log(error);
    return res.status(400).json(error);
  }
};

/**
 * @description Find users a given user is following
 */
exports.getFollowings = async (req, res) => {
  try {
    const _follower = req.params._follower;

    // Fetch following for user
    const followings = await UserConnection.find({
      _follower,
    }).populate("_following");

    return res.json({ followings });
  } catch (error) {
    console.log("An error occured...");
    console.log(error);
    return res.status(400).json(error);
  }
};

/**
 * Create connection between a user and a person (i.e. follow person)
 */
exports.followUser = async (req, res) => {
  try {
    const _follower = req.user;
    const _following = req.params._following;

    // Check that user does not follow himself
    if (_follower == _following)
      return res.status(403).json({ message: "Cannot follow oneself" });

    const connection = await UserConnection.follow({ _follower, _following });

    if (!connection)
      return res.status(400).json({ message: "Could not create connection" });

    return res.json({ connection, message: "Followed successfully" });
  } catch (error) {
    console.log("An error occured...");
    console.log(error);
    return res.status(400).json(error);
  }
};

exports.unfollowUser = async (req, res) => {
  try {
    const _follower = req.user;
    const _following = req.params._following;

    // Check that user does not follow himself
    if (_follower == _following)
      return res.status(403).json({ message: "Cannot unfollow oneself" });

    const connection = await UserConnection.unfollow({
      _follower,
      _following,
    });

    if (!connection)
      return res.status(403).json({ message: "Could not delete connection" });

    return res.json({ connection, message: "Unfollowed successfully" });
  } catch (error) {
    console.log("An error occured...");
    console.log(error);
    return res.status(400).json(error);
  }
};
