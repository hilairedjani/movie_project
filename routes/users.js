const express = require("express");

const { authorize } = require("../middleware");

const router = express.Router();

// Controller actions
const { getUsers, getUser } = require("../controllers/users");

// == GET ROUTES

/**
 * @route GET api/users
 * @description Get users
 * @access Public
 * Query params: name, role
 */
router.get("/", getUsers);

/**
 * @route GET api/users/:id
 * @description Get user by id
 * @access Public
 */
router.get("/:id", getUser);

// == POST ROUTES

/**
 * @route POST api/users
 * @description Create/add a movie
 * @access Public
 */
// router.post("/", createMovie);

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
