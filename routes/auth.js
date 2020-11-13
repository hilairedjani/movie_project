const express = require("express");

const router = express.Router();

// Controller actions
const { login, register } = require("../controllers/auth");

// == GET ROUTES

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
