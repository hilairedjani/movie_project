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
 * @route GET /users/profile
 * @description Get current user's profile
 * @access Private
 */
router.get("/profile", authorize, getProfile);

/**
 * @route GET /users/:id
 * @description Get current user's
 * @access Public
 */
router.get("/:id", getUser);

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
