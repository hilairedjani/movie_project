// == MIDDLEWARE
/*
 * This file contains custom middleware used in the app
 */

/**
 * @description Access private routes
 */
exports.authorize = async (req, res, next) => {
  try {
    // Check user attribute in request session
    const user = req.session.user;

    if (!user) return res.status(401).send("Unauthorized");

    // Add user id to request object
    req.user = user;

    //Proceed to next middleware
    next();
  } catch (error) {
    console.error(error);
    return res
      .status(401)
      .send("== An error occured::Could not authenticate user");
  }
};
