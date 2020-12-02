const express = require("express");

const { authorize } = require("../middleware");

const router = express.Router();

// Controller actions
const {
  getUsers,
  getUser,
  getProfile,
  editUser,
  editProfile,
  getCurrentProfile,
} = require("../controllers/users");

// == GET ROUTES

/**
 * @route GET /users
 * @description Get users
 * @access Public
 * Query params: name, role
 */
router.get("/", getUsers);

/**
 * @route GET /users/profile/current
 * @description Get current user's profile
 * @access Private
 */
router.get("/profile/current", authorize, getCurrentProfile);

/**
 * @route GET /users/profile/:_id
 * @description Get a given user's profile
 * @access Private
 */
router.get("/profile/:_id", authorize, getProfile);

/**
 * @route GET /users/:_id
 * @description Get current user's
 * @access Private
 */
router.get("/:_id", authorize, getUser);

// == POST ROUTES

/**
 * @route POST /users
 * @description Create/add a movie
 * @access Public
 */
// router.post("/", createMovie);

// == PUT/PATCH ROUTES

/**
 * @route PATCH /users/profile
 * @description  Edit current user's profile
 * @access Private
 */
router.patch("/profile", authorize, editProfile);

/**
 * @route PATCH /users/:id
 * @description  Edit a given user profile
 * @access Private
 */
router.patch("/:id", authorize, editUser);

// == DELETE ROUTES

/**
 * @route DELETE /users/:id
 * @description Delete a given movie
 * @access Public
 */
// router.delete("/:id", deleteMovie);

module.exports = router;
