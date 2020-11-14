// == USERS CONTROLLER

const User = require("../models/user");

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
    const userId = req.params.id;

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
exports.getProfile = async (req, res) => {
  try {
    const id = req.user;

    const profile = await User.findById(id);

    if (!profile) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.format({
      "application/json": function () {
        res.json(profile);
      },

      "text/html": function () {
        res.render("userProfile", { profile });
      },

      default: function () {
        // log the request and respond with 406
        res.status(406).send("Not Acceptable");
      },
    });
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

    return res.json(user);
  } catch (error) {
    console.log("An error occured...");
    console.log(error);
    return res.status(400).json(error);
  }
};
