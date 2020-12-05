const express = require("express");

const { authorize } = require("../middleware");

const router = express.Router();

// Controller actions
const {
  getReviews,
  getUserReviews,
  getMovieReviews,
  getMovieReviewsByUser,
  getReview,
  createReview,
  updateReview,
} = require("../controllers/reviews");

// == GET ROUTES

/**
 * @route GET /reviews
 * @description Get all reviews
 * @access Public
 */
router.get("/", getReviews);

/**
 * @route GET /reviews/user/:_user
 * @description Get all reviews for a given user
 * @access Public
 */
router.get("/user/:_user", getUserReviews);

/**
 * @route GET /reviews/movie/:_movie
 * @description Get all reviews for a given movie
 * @access Public
 */
router.get("/movie/:_movie", getMovieReviews);

/**
 * @route GET /reviews/movie/:_movie/user/:_user
 * @description Get all reviews for a given movie by a given user
 * @access Public
 */
router.get("/movie/:_movie/user/:_user", getMovieReviewsByUser);

/**
 * @route GET /reviews/:_id
 * @description Get a given review by id
 * @access Public
 */
router.get("/:_id", getReview);

// == POST ROUTES

/**
 * @route POST /reviews/movie/:_movie
 * @description Create/add a review for a movie
 * @access Private
 */
router.post("/_movie/:_movie", authorize, createReview);

// == PUT/PATCH ROUTES

/**
 * @route PATCH reviews/:id
 * @description Update a given review
 * @access Private
 */
router.patch("/:id", authorize, updateReview);

// == DELETE ROUTES

/**
 * @route DELETE api/people/:id
 * @description Delete a given movie
 * @access Private
 */
// router.delete("/:id", deleteMovie);

module.exports = router;
