// == CONTRIBUTIONS ROUTES

const express = require("express");

const { authorize } = require("../middleware");

const router = express.Router();

// Controller actions
const { getUserContributions } = require("../controllers/contributions");

// == GET ROUTES

/**
 * @route GET /contributions/_user/:_user
 * @description Get contributions for a given user
 * @access Private
 */
router.get("/_user/:_user", authorize, getUserContributions);

// == POST ROUTES

// == PUT/PATCH ROUTES

// == DELETE ROUTES

module.exports = router;
