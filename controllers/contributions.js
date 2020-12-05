// == CONTRIBUTIONS CONTROLLER

const Contribution = require("../models/contribution");

exports.getUserContributions = async (req, res) => {
  try {
    const _user = req.params._user;

    // Fetch contributions for user
    const contributions = await Contribution.find({ _user }).populate("_item", [
      "title",
      "image",
      "_id",
      "firstname",
      "lastname",
      "rank",
    ]);

    return res.json(contributions);
  } catch (error) {
    console.log("An error occured...");
    console.log(error);
    return res.status(400).json(error);
  }
};
