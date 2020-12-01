// == AUTH CONTROLLER

const jwt = require("jsonwebtoken");

const User = require("../models/user");

/**
 * @description Login a user
 */
exports.login = async (req, res) => {
  try {
    const ue = req.body.username;
    const password = req.body.password;

    if (!ue || ue.length <= 0)
      return res.status(400).json({ message: "Username or email is required" });

    if (!password || password.length <= 0)
      return res.status(400).json({ message: "Password is required" });

    // Check is user exists
    const user = await User.findByUsernameOrEmail(ue);

    if (!user)
      return res
        .status(404)
        .json({ message: "Username or password incorrect" });

    // Check if password matches
    if (user.password !== password)
      return res
        .status(400)
        .json({ message: "Username or password incorrect" });

    //

    // Store user id in session object
    // req.session.user = user.id;

    // Sign jwt
    const token = await jwt.sign({ user: user.id }, process.env.JWT_SECRET);

    return res
      .header("x-auth-token", token)
      .json({ user, token, message: "User logged in successfully" });
  } catch (error) {
    console.log("An error occured...");
    console.log(error);
    return res.status(400).json(error);
  }
};

/**
 * @description register a user
 */
exports.register = async (req, res) => {
  try {
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const role = req.body.role;

    if (!email || email.length <= 0)
      return res.status(400).json({ message: "Email is required" });

    if (!username || username.length <= 0)
      return res.status(400).json({ message: "Username is required" });

    if (!password || password.length <= 0)
      return res.status(400).json({ message: "Password is required" });

    if (!role || role.length <= 0)
      return res.status(400).json({ message: "Role is required" });

    // Check if email is already used
    if (await User.findByEmail(email))
      return res.status(400).json({ message: "Email already in use" });

    // Check is username is already used
    if (await User.findByUsername(username))
      return res.status(400).json({ message: "Username already in use" });

    // Register/create user
    const user = await User.createUser({
      firstname,
      lastname,
      email,
      username,
      password,
      role,
    });

    if (!user)
      return res.status(400).json({ message: "Could not register user" });

    // Sign jwt
    const token = await jwt.sign({ user: user.id }, process.env.JWT_SECRET);

    // Add user id to session object
    // req.session.user = user.id;

    // Return registered user and add token to header
    return res
      .header("x-auth-token", token)
      .json({ user, token, message: "Registered successfully" });
  } catch (error) {
    console.log("An error occured...");
    console.log(error);
    return res.status(400).json(error);
  }
};

/**
 * @description Get current logged user
 */
exports.getCurrentUser = async (req, res) => {
  try {
    const id = req.user;

    const user = await User.findById(id);

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
