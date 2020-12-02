// == USER CONNECTIONS CONTROLLER

const UserConnection = require("../models/userConnection");

/**
 *
 */
exports.getConnections = async (req, res) => {
  try {
    const _follower = req.user;

    // Fetch user connections for user
    const connections = await UserConnection.find({
      _follower,
    }).populate("_following");

    return res.json(connections);
  } catch (error) {
    console.log("An error occured...");
    console.log(error);
    return res.status(400).json(error);
  }
};

exports.createConnection = async (req, res) => {
  try {
    const _follower = req.user;
    const _following = req.params._following;

    const connection = await UserConnection.createConnection({
      _follower,
      _following,
    });

    if (connection)
      return res.status(403).json({ message: "Could not create connection" });

    return res.json(connection);
  } catch (error) {
    console.log("An error occured...");
    console.log(error);
    return res.status(400).json(error);
  }
};
