const express = require("express");

const { authorize } = require("../middleware");

const router = express.Router();

// Controller actions
const { getPeople, getPerson, createPerson } = require("../controllers/people");

// == GET ROUTES

/**
 * @route GET /people
 * @description Get people
 * @access Public
 * Query params: name, rank
 */
router.get("/", getPeople);

/**
 * @route GET /people/:_id
 * @description Get person by id
 * @access Public
 */
router.get("/:id", getPerson);

// == POST ROUTES

/**
 * @route POST /people
 * @description Create/add a person
 * @access Private
 */
router.post("/", authorize, createPerson);

// == PUT/PATCH ROUTES

/**
 * @route PATCH /people/:id
 * @description Update a given movie
 * @access Private
 */
// router.patch("/:id", updateMovie);

// == DELETE ROUTES

/**
 * @route DELETE /people/:id
 * @description Delete a given movie
 * @access Public
 */
// router.delete("/:id", deleteMovie);

module.exports = router;
