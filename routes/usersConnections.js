// == USER CONNECTIONS ROUTES

const express = require("express");

const { authorize } = require("../middleware");

const router = express.Router();

// Controller actions
const {
  getFollowers,
  getFollowings,
  followUser,
  unfollowUser,
} = require("../controllers/usersConnections");

// == GET ROUTES

/**
 * @route GET /usersConnections/_follower/:_follower
 * @description Get following for a given user
 * @access Private
 */
router.get("/_follower/:_follower", authorize, getFollowings);

/**
 * @route GET /usersConnections/_following/:_following
 * @description Get following for a given user
 * @access Private
 */
router.get("/_following/:_following", authorize, getFollowers);

// == POST ROUTES

/**
 * @route POST /usersConnections/_following/:_following
 * @description Follow a given user
 * @access Private
 */
router.post("/_following/:_following", authorize, followUser);

// == PUT/PATCH ROUTES

// == DELETE ROUTES

/**
 * @route DELETE /usersConnections/_following/:_following
 * @description Unfollow a given user
 * @access Private
 */
router.delete("/_following/:_following", authorize, unfollowUser);

module.exports = router;
