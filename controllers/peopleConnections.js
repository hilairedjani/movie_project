// == PEOPLE CONNECTIONS CONTROLLER

const PersonConnection = require("../models/personConnection");

exports.getConnections = async (req, res) => {
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

exports.createConnection = async (req, res) => {
  try {
    const _user = req.user;
    const _person = req.params._person;

    const connection = await PersonConnection.createConnection({
      _user,
      _person,
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
