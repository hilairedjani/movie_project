const express = require("express");

const router = express.Router();

// Controller actions
const { login } = require("../../controllers/auth");

// == GET ROUTES

// == POST ROUTES

/**
 * @route POST api/auth/login
 * @description Login a given user
 * @access Public
 */
router.post("/login", login);

// == PUT/PATCH ROUTES

/**
 * @route PATCH api/users/:id
 * @description Update a given movie
 * @access Public
 */
// router.patch("/:id", updateMovie);

// == DELETE ROUTES

/**
 * @route DELETE api/users/:id
 * @description Delete a given movie
 * @access Public
 */
// router.delete("/:id", deleteMovie);

module.exports = router;
