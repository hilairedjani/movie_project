// == MOVIE MODEL

/**
 * == MOVIE SCHEMA
 * title
 * releaseYear
 */

import { Schema, model } from "mongoose";

const movieSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  releaseYear: {
    type: String,
    required: true,
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
  actors: [Number],
  directors: [Number],
  writers: [Number],
});

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
};

// Static methods
movieSchema.statics = {
  // Find all movies
  findAll: async function ({ limit = 10, skip = 0 }) {
    return await this.find().limit(parseInt(limit)).skip(parseInt(skip));
  },

  // Find movies based on genre
  findAllByGenre: async function (
    genre,
    { skip = 0, limit = 10, exlude = [] }
  ) {
    // let re = new RegExp(genre, "i");

    return await this.find({ genre: genre, _id: { $nin: exlude } })
      .limit(parseInt(limit))
      .skip(parseInt(skip));
  },

  // Find movies based on release year
  findAllByYear: async function (year, { skip = 0, limit = 10 }) {
    return await this.find({ year: year })
      .limit(parseInt(limit))
      .skip(parseInt(skip));
  },

  // Find a movie by id
  findById: async function (id) {
    return await this.findById(id);
  },
};

export default model("Movie", movieSchema);
