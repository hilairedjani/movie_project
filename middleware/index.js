// == MIDDLEWARE
/*
 * This file contains custom middleware used in the app
 */

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

    // Add user id to request object
    req.user = decoded.user;

    //Proceed to next middleware
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: "Unauthorized" });
  }
};
