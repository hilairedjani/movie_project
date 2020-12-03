// == PEOPLE CONTROLLER

const Review = require("../models/review");
const Movie = require("../models/movie");

/**
 * @description Fetch all reviews::First 10 reviews by default
 */
exports.getReviews = async (req, res) => {
  try {
    let skip = parseInt(req.query.skip) || 0;
    let limit = parseInt(req.query.limit) || 10;

    //   Return all people in db
    const reviews = await Review.findAll({ limit, skip });

    return res.json(reviews);
  } catch (error) {
    console.log("An error occured...");
    console.log(error);
    return res.status(400).json(error);
  }
};

/**
 * @description Fetch all reviews by a given user::First 10 reviews by default
 */
exports.getUserReviews = async (req, res) => {
  try {
    let skip = parseInt(req.query.skip) || 0;
    let limit = parseInt(req.query.limit) || 10;

    //   Return all reviews for user
    const reviews = await Review.findAllForUser(req.params._user, {
      limit,
      skip,
    });

    return res.json(reviews);
  } catch (error) {
    console.log("An error occured...");
    console.log(error);
    return res.status(400).json(error);
  }
};

/**
 * @description Fetch all reviews for a given movie::First 10 reviews by default
 */
exports.getMovieReviews = async (req, res) => {
  try {
    let skip = parseInt(req.query.skip) || 0;
    let limit = parseInt(req.query.limit) || 10;

    //   Return all reviews for movie
    const reviews = await Review.findAllForMovie(req.params._movie, {
      limit,
      skip,
    });

    return res.json(reviews);
  } catch (error) {
    console.log("An error occured...");
    console.log(error);
    return res.status(400).json(error);
  }
};

/**
 * @description Fetch all reviews for a given movie by a given user::First 10 reviews by default
 */
exports.getMovieReviewsByUser = async (req, res) => {
  try {
    let skip = parseInt(req.query.skip) || 0;
    let limit = parseInt(req.query.limit) || 10;

    //   Return all reviews for movie by a given user
    const reviews = await Review.findAllForMovieByUser(
      req.params._movie,
      req.params._user,
      {
        limit,
        skip,
      }
    );

    return res.json(reviews);
  } catch (error) {
    console.log("An error occured...");
    console.log(error);
    return res.status(400).json(error);
  }
};

/**
 * @description Fetch a given review
 */
exports.getReview = async (req, res) => {
  try {
    //   Find and return review
    const review = await Review.findById(req.params.id);

    return res.json(review);
  } catch (error) {
    console.log("An error occured...");
    console.log(error);
    return res.status(400).json(error);
  }
};

/**
 * @description Create a new review
 */
exports.createReview = async (req, res) => {
  try {
    let { value, briefSummary, fullText } = req.body;

    const reviewFields = {};
    if (value) reviewFields.value = parseInt(value);
    if (briefSummary) reviewFields.briefSummary = briefSummary.trim();
    if (fullText) reviewFields.fullText = fullText.trim();

    const _movie = req.params._movie;
    const _user = req.user;

    // Find movie
    const movie = await Movie.findById(_movie);

    if (!movie) return res.status(404).json({ message: "Movie not found" });

    // Check if user has already reviewed movie
    const hasReviewed = await Review.findOne({ _movie: movie._id, _user });

    if (hasReviewed)
      return res
        .status(400)
        .json({ message: "You have already reviewed this movie" });

    //   Create review
    const review = await Review.createReview(_user, movie._id, reviewFields);

    if (!review)
      return res.status(400).json({ message: "Could not create review" });

    // Increment movie review total and review count
    await movie.incrementTotalReview(value);
    await movie.incrementReviewCount();
    await movie.save();

    return res.json({ review, message: "Review added successfully", movie });
  } catch (error) {
    console.log("An error occured...");
    console.log(error);
    return res.status(400).json(error);
  }
};

/**
 * @description Update a given review
 */
exports.updateReview = async (req, res) => {
  try {
    let { value, reviewText } = req.body;

    const reviewFields = {};
    if (value) reviewFields.value = parseInt(value.trim());
    if (reviewText) reviewFields.reviewText = reviewText.trim();

    //   Find and update review
    const review = await Review.updateReview(
      req.params.id,
      req.user,
      reviewFields
    );

    if (!review)
      return res.status(404).json({ message: "Could not find review" });

    return res.json(review);
  } catch (error) {
    console.log("An error occured...");
    console.log(error);
    return res.status(400).json(error);
  }
};
