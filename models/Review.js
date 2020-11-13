// == REVIEW MODEL

/**
 * == REVIEW SCHEMA
 * value
 * reviewText
 */

const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const reviewSchema = new Schema({
  _user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Review must have a user"],
  },
  _movie: {
    type: Schema.Types.ObjectId,
    ref: "Movie",
    required: [true, "Rating must have a movie"],
  },
  value: {
    type: Number,
    required: [true, "Review must have a value"],
    min: [1, "Review value cannot be below 0"],
    max: [5, "Review value cannot be above 5"],
  },
  reviewText: {
    type: String,
    trim: true,
  },
});

// Instance methods
reviewSchema.methods = {};

// Static methods
reviewSchema.statics = {
  // Create a new review
  createReview: async function ({ _user, _movie, value, reviewText = "" }) {
    // Check if user has already reviewed movie
    let review = await this.findOne({ _user, _movie });

    // If already reviewed, just update review
    if (review) {
      review.value = value;
      if (reviewText && reviewText.length > 0) review.reviewText = reviewText;

      await review.save();

      return review;
    }

    // ...Otherwise, create new review
    review = await new this({
      _user,
      _movie,
      value,
      reviewText,
    });

    await review.save();

    return review;
  },

  //   Find reviews for a given movie
  findReviewsForMovie: async function (_movie) {
    return await this.find({ _movie });
  },

  //   Find reviews for a given user
  findReviewsForUser: async function (_user) {
    return await this.find({ _user });
  },

  //   Calculate average review for a given movie
  calculateAverageReviewForMovie: async function (_movie) {
    const reviews = await this.find({ _movie });
    let average = 0.0,
      sum = 0;
    for (let i = 0; i < reviews.length; i++) {
      sum += reviews[i].value;
    }

    average = sum / reviews.length;
    return average;
  },
};

module.exports = model("Review", reviewSchema);
