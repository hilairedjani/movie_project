// == MIDDLEWARE
/*
 * This file contains custom middleware used in the app
 */

const User = require("../models/user");

const jwt = require("jsonwebtoken");

/**
 * @description Access private routes
 */
exports.authorize = async (req, res, next) => {
  try {
    // Check user attribute in request session
    // const user = req.session.user;

    // Obtain token from header
    const token = await req.header("x-auth-token");

    if (!token) return res.status(401).json({ message: "Unauthorized" });

    // Decode token
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) return res.status(401).json({ message: "Unauthorized" });

    // Verify that user exists
    const user = await User.findById(decoded.user);

    if (!user) return res.status(401).json({ message: "User not found" });

    // Add user id to request object
    req.user = user._id;

    // Add socket to request if present and update user socket
    const socket = await req.header("client-socket-id");

    if (socket) {
      if (!user.socket || user.socket != socket) {
        user.socket = socket;
        await user.save();
      }

      req.socket = socket;
    }

    //Proceed to next middleware
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: "Unauthorized" });
  }
};
