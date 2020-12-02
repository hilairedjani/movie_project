// == PEOPLE CONNECTIONS CONTROLLER

const PersonConnection = require("../models/personConnection");

exports.getConnectionsForUser = async (req, res) => {
  try {
    const _user = req.params._user;

    // Fetch people connections for user
    const connections = await PersonConnection.find({
      _user,
    }).populate("_person");

    return res.json(connections);
  } catch (error) {
    console.log("An error occured...");
    console.log(error);
    return res.status(400).json(error);
  }
};

/**
 * Create connection between a user and a person (i.e. follow person)
 */
exports.createConnection = async (req, res) => {
  try {
    const _user = req.user;
    const _person = req.params._person;

    const connection = await PersonConnection.createConnection(_user, _person);

    if (!connection)
      return res.status(403).json({ message: "Could not create connection" });

    return res.json({ connection, message: "Followed successfully" });
  } catch (error) {
    console.log("An error occured...");
    console.log(error);
    return res.status(400).json(error);
  }
};

exports.deleteConnection = async (req, res) => {
  try {
    const _user = req.user;
    const _person = req.params._person;

    const connection = await PersonConnection.deleteConnection({
      _user,
      _person,
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
