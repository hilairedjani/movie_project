// == REVIEW MODEL

/**
 * == REVIEW SCHEMA
 * value
 * reviewText
 */

const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const reviewSchema = new Schema(
  {
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
      min: [1, "Review value cannot be below 1"],
      max: [10, "Review value cannot be above 10"],
    },
    briefSummary: {
      type: String,
      maxlength: [150, "Summary should not be more than 150 characters"],
      trim: true,
    },
    fullText: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Instance methods
reviewSchema.methods = {};

// Static methods
reviewSchema.statics = {
  // Create a new review
  createReview: async function (_user, _movie, createParams) {
    // Check if user has already reviewed movie
    let review = await this.findOne({ _user, _movie });

    // If already reviewed, just update review
    if (review) {
      review = await this.findOneAndUpdate(
        { _id: review._id },
        { $set: createParams },
        { new: true, runValidators: true }
      );

      return review;
    }

    // ...Otherwise, create new review
    review = await new this({
      _user,
      _movie,
      ...createParams,
    });

    await review.save();

    return review;
  },

  // Update a given review
  updateReview: async function (_id, _user, updateParams) {
    // Find and update review
    const review = await this.findOneAndUpdate(
      { _id, _user },
      { $set: updateParams },
      { new: true, runValidators: true }
    );

    return review;
  },

  // Find all reviews
  findAll: async function ({ limit = 10, skip = 0 }) {
    return await this.find().limit(parseInt(limit)).skip(parseInt(skip));
  },

  //   Find reviews for a given movie
  findAllForMovie: async function (_movie, { limit = 10, skip = 0 }) {
    return await this.find({ _movie })
      .limit(parseInt(limit))
      .skip(parseInt(skip));
  },

  //   Find reviews for a given user
  findAllForUser: async function (_user, { limit = 10, skip = 0 }) {
    return await this.find({ _user })
      .limit(parseInt(limit))
      .skip(parseInt(skip));
  },

  //   Find reviews for on a movie by a given user
  findAllForMovieByUser: async function (
    _movie,
    _user,
    { limit = 10, skip = 0 }
  ) {
    return await this.find({ _movie, _user })
      .limit(parseInt(limit))
      .skip(parseInt(skip));
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
