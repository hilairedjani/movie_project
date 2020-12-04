const express = require("express");

const router = express.Router();

const { authorize } = require("../middleware");

// Controller actions
const {
  getMovies,
  getMovieById,
  createMovie,
  updateMovie,
  addActor,
  addDirector,
  addWriter,
  scraper,
  deleteMovie,
} = require("../controllers/movies");

// == GET ROUTES

/**
 * @route GET api/movies
 * @description Get movies
 * @access Public
 * Query param: title, genre, year, minrating
 */
router.get("/", authorize, getMovies);

/**
 * @route GET api/movies/:id
 * @description Get movie by id
 * @access Public
 */
router.get("/:id", authorize, getMovieById);

/**
 * @route GET api/movies/:title
 * @description Scrape movie by title
 * @access Public
 */
router.get("/scraper/title/:title", scraper);

// == POST ROUTES

/**
 * @route POST api/movies
 * @description Create/add a movie
 * @access Private
 */
router.post("/", authorize, createMovie);

// == PUT/PATCH ROUTES

/**
 * @route PATCH api/movies/:id
 * @description Update a given movie
 * @access Private
 */
router.patch("/:id", authorize, updateMovie);

/**
 * @route PATCH api/movies/:id/actors/:actorId
 * @description Add an actor to a given movie
 * @access Private
 */
router.patch("/:id/actors/:actorId", authorize, addActor);

/**
 * @route PATCH api/movies/:id/directors/:directorId
 * @description Add a director to a given movie
 * @access Private
 */
router.patch("/:id/directors/:directorId", authorize, addDirector);

/**
 * @route PATCH api/movies/:id/writers/:writerId
 * @description Add a writer to a given movie
 * @access Private
 */
router.patch("/:id/writers/:writerId", authorize, addWriter);

// == DELETE ROUTES

/**
 * @route DELETE api/movies/:id
 * @description Delete a given movie
 * @access Private
 */
router.delete("/:id", authorize, deleteMovie);

module.exports = router;
