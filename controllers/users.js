// == USERS CONTROLLER

const User = require("../models/user");
const Contribution = require("../models/contribution");
const PersonConnection = require("../models/personConnection");

const socket = require("../middleware/socket");

/**
 * @description Fetch all users::First 10 users by default
 */
exports.getUsers = async (req, res) => {
  try {
    let skip = parseInt(req.query.skip) || 0;
    let limit = parseInt(req.query.limit) || 10;

    //   Return all users
    let usersArr = [];

    if (req.query.name) {
      usersArr = await User.findAllByName(req.query.name, { skip, limit });
    } else if (req.query.role) {
      usersArr = await User.findAllRole(req.query.role, { skip, limit });
    } else {
      usersArr = await User.findAll({ skip, limit });
    }

    return res.json(usersArr);
  } catch (error) {
    console.log("An error occured...");
    console.log(error);
    return res.status(400).json(error);
  }
};

/**
 * @description Find a given user by id
 */
exports.getUser = async (req, res) => {
  try {
    const userId = req.params._id;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json(user);
  } catch (error) {
    console.log("An error occured...");
    console.log(error);
    return res.status(400).json(error);
  }
};

/**
 * @description Get current logged in user's profile
 */
exports.getCurrentProfile = async (req, res) => {
  try {
    const _id = req.user;

    const profile = await User.findById(_id).lean();

    if (!profile) {
      return res.status(404).json({ message: "User not found" });
    }

    // Fetch user contributions
    profile.contributions = await Contribution.find({
      _user: profile._id,
    }).populate("_item", ["title", "firstname", "lastname", "rank"]);

    // Fetch people following
    profile.people = await PersonConnection.distinct("_person", {
      _user: profile._id,
    });

    // TODO::Fetch followers and following

    return res.json(profile);
  } catch (error) {
    console.log("An error occured...");
    console.log(error);
    return res.status(400).json(error);
  }
};

/**
 * @description Get a given user's profile
 */
exports.getProfile = async (req, res) => {
  try {
    const _id = req.params._id;

    const profile = await User.findById(_id).lean();

    if (!profile) {
      return res.status(404).json({ message: "User not found" });
    }

    // Fetch user contributions
    profile.contributions = await Contribution.find({ _user: profile._id })
      .limit(10)
      .skip(0)
      .populate("_item", ["title", "firstname", "lastname", "rank"]);

    return res.json(profile);
  } catch (error) {
    console.log("An error occured...");
    console.log(error);
    return res.status(400).json(error);
  }
};

/**
 * @description Update a given user
 */
exports.editUser = async (req, res) => {
  try {
    const id = req.params.id;

    let { firstname, lastname, role } = req.body;

    let userFields = {};

    if (firstname) userFields.firstname = firstname.trim();
    if (lastname) userFields.lastname = lastname.trim();
    if (username) userFields.username = username.trim();
    if (email) userFields.email = email.trim();
    if (role) userFields.role = role.trim().toLowerCase();

    const user = await User.findByIdAndUpdate(
      id,
      { $set: userFields },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json(user);
  } catch (error) {
    console.log("An error occured...");
    console.log(error);
    return res.status(400).json(error);
  }
};

/**
 * @description Edit current user's profile
 */
exports.editProfile = async (req, res) => {
  try {
    const id = req.user;

    let { firstname, lastname, role, email, username } = req.body;

    let userFields = {};

    if (firstname) userFields.firstname = firstname.trim();
    if (lastname) userFields.lastname = lastname.trim();
    if (username) userFields.username = username.trim();
    if (email) userFields.email = email.trim();
    if (role) userFields.role = role.trim().toLowerCase();

    const user = await User.findByIdAndUpdate(
      id,
      { $set: userFields },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json({ user, message: "Profile updated successfully" });
  } catch (error) {
    console.log("An error occured...");
    console.log(error);
    return res.status(400).json(error);
  }
};
