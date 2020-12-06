// == MOVIE MODEL

/**
 * == MOVIE SCHEMA
 * title
 * releaseYear
 */

const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const movieSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      unique: true,
    },
    releaseYear: {
      type: String,
      required: [true, "Release Year is required"],
    },
    genre: [String],
    runtime: {
      type: String,
    },
    plot: {
      type: String,
    },
    rating: {
      type: String,
    },
    country: {
      type: String,
    },
    image: {
      type: String,
    },
    totalReview: {
      type: Number,
      min: 0,
      default: 0,
    },
    reviewCount: {
      type: Number,
      min: 0,
      default: 0,
    },
    reviewAverage: {
      type: Number,
      min: 0,
      max: 10,
      default: 0,
    },
    actors: [
      {
        type: Schema.Types.ObjectId,
        ref: "Person",
      },
    ],
    directors: [
      {
        type: Schema.Types.ObjectId,
        ref: "Person",
      },
    ],
    writers: [
      {
        type: Schema.Types.ObjectId,
        ref: "Person",
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Instance methods
movieSchema.methods = {
  // Add an actor to a movie
  addActor: async function (actorId) {
    await this.actors.push(actorId);
    return;
  },
  // Add a director to a movie
  addDirector: async function (directorId) {
    await this.directors.push(directorId);
    return;
  },
  // Add a writer to a movie
  addWriter: async function (writerId) {
    await this.writers.push(writerId);
    return;
  },

  // Update a movie's review
  updateMovieReview: async function (value) {
    this.totalReview += value;
    this.reviewCount++;
    this.reviewAverage =
      this.reviewCount > 0 ? this.totalReview / this.reviewCount : 0;
    return;
  },

  // increment total review
  incrementTotalReview: async function (value) {
    this.totalReview += value;
    return;
  },

  // increment review count
  incrementReviewCount: async function () {
    this.reviewCount++;
    return;
  },
};

// Static methods
movieSchema.statics = {
  // Find all movies
  findAll: async function ({ limit = 10, skip = 0 }) {
    return await this.find().limit(parseInt(limit)).skip(parseInt(skip));
  },

  // Find movies whose name matches strng
  findAllByTitle: async function (title, { skip = 0, limit = 10 }) {
    const searchRegex = new RegExp(title);

    return await this.find({ title: { $regex: searchRegex, $options: "i" } })
      .limit(parseInt(limit))
      .skip(parseInt(skip));
  },

  // Find movies based on genre
  findAllByGenre: async function (
    genre,
    { skip = 0, limit = 10, exclude = [] }
  ) {
    // let re = new RegExp(genre, "i");

    return await this.find({ genre: { $in: genre }, _id: { $nin: exclude } })
      .limit(parseInt(limit))
      .skip(parseInt(skip));
  },

  // Find movies based on release year
  findAllByReleaseYear: async function (releaseYear, { skip = 0, limit = 10 }) {
    return await this.find({ releaseYear })
      .limit(parseInt(limit))
      .skip(parseInt(skip));
  },

  // Find movies based on rating
  findAllByRating: async function (rating, { skip = 0, limit = 10 }) {
    const searchRegex = new RegExp(rating);

    return await this.find({ rating: { $regex: searchRegex, $options: "i" } })
      .limit(parseInt(limit))
      .skip(parseInt(skip));
  },

  // Find movies based on minimum review score
  findAllByMinRating: async function (minRating, { skip = 0, limit = 10 }) {
    return await this.find({ reviewAverage: { $gte: parseInt(minRating) } })
      .limit(parseInt(limit))
      .skip(parseInt(skip));
  },

  // Find top popular movies
  findPopular: async function ({ limit }) {
    return this.find().limit(parseInt(limit)).sort({ totalReview: -1 });
  },

  // Create a movie
  createMovie: async function ({
    title,
    releaseYear,
    genre,
    runtime,
    plot,
    rating,
    country,
    image,
  }) {
    const movie = await new this({
      title,
      releaseYear,
      genre,
      runtime,
      plot,
      rating,
      country,
      image,
    });

    await movie.save();

    return movie;
  },
};

module.exports = model("Movie", movieSchema);
