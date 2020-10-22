const express = require("express");

const router = express.Router();

// Controller actions
const { getMovies } = require("../../controllers/movies");

// == GET ROUTES
/**
 * @route GET api/movies
 * @description Get movies
 * @access Public
 * Query param: title, genre, year, minrating
 */
router.get("/", getMovies);

// == POST ROUTES

// == PUT/PATCH ROUTES

// == DELETE ROUTES

module.exports = router;
