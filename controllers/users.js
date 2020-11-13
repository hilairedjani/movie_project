// == USERS CONTROLLER

let users = require("../db/users.json");

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
 * @description Update a given user profile 
 */
exports.editUser = async (req, res) => {
  try {
    const userId = req.params.id;

    User.findByIdAndUpdate(req.signedCookies.userid, userFields, function (err, user) {
      firstName = req.body.firstName;
      lastName = req.body.lastName;
      userName = req.body.userName;
      email = req.body.email;
      role = req.body.role;
      password = req.body.role
    }
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
