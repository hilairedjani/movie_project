const express = require("express");

const router = express.Router();

// Controller actions
const { login, register, getCurrentUser } = require("../controllers/auth");
const { authorize } = require("../middleware");

// == GET ROUTES

/**
 * @route GET api/auth/current
 * @description Get current logged in user
 * @access Private
 */
router.get("/current", authorize, getCurrentUser);

// == POST ROUTES

/**
 * @route POST api/auth/login
 * @description Login a given user
 * @access Public
 */
router.post("/login", login);

/**
 * @route POST api/auth/register
 * @description Register a given user
 * @access Public
 */
router.post("/register", register);

// == PUT/PATCH ROUTES

// == DELETE ROUTES

module.exports = router;
