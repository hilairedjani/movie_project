// == PEOPLE CONNECTIONS ROUTES

const express = require("express");

const { authorize } = require("../middleware");

const router = express.Router();

// Controller actions
const {
  getConnectionsForUser,
  createConnection,
  deleteConnection,
} = require("../controllers/peopleConnections");

// == GET ROUTES

/**
 * @route GET /peopleConnections/_user/:_user
 * @description Get people connections for a given user
 * @access Private
 */
router.get("/_user/:_user", authorize, getConnectionsForUser);

// == POST ROUTES

/**
 * @route POST /peopleConnections/_person/:_person
 * @description Create connection between a user and a person
 * @access Private
 */
router.post("/_person/:_person", authorize, createConnection);

// == PUT/PATCH ROUTES

// == DELETE ROUTES

/**
 * @route DELETE /peopleConnections/_person/:_person
 * @description Delete connection between a user and a person
 * @access Private
 */
router.delete("/_person/:_person", authorize, deleteConnection);

module.exports = router;
