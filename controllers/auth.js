// == AUTH CONTROLLER

const User = require("../models/user");

/**
 * @description Fetch all users::First 10 users by default
 */
exports.login = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || email.length <= 0)
      return res.status(400).json({ message: "Email is required" });

    if (!password || password.length <= 0)
      return res.status(400).json({ message: "Password is required" });

    // Check is user exists
    const user = await User.findByEmail(email);

    if (!user) return res.status(404).json({ message: "User not found" });

    // Check if password and email match
    if (user.password !== password)
      return res.status(400).json({ message: "Email or password incorrect" });

    return res.json({ user, message: "User logged in successfully" });
  } catch (error) {
    console.log("An error occured...");
    console.log(error);
    return res.status(400).json(error);
  }
};
