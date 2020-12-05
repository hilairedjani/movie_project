// == MOVIES CONTROLLER

const Movie = require("../models/movie");
const Person = require("../models/person");
const Contribution = require("../models/contribution");
const Review = require("../models/review");

const mongoose = require("mongoose");

let movies = require("../db/movies.json");

/**
 * @description Fetch all movies::First 10 movies by default
 */
exports.getMovies = async (req, res) => {
  try {
    let skip = parseInt(req.query.skip) || 0;
    let limit = parseInt(req.query.limit) || 10;

    let movies = [];

    // Return movies
    if (req.query.title) {
      movies = await Movie.findAllByTitle(req.query.title, { skip, limit });
    } else if (req.query.genre) {
      movies = await Movie.findAllByGenre(req.query.genre, { skip, limit });
    } else if (req.query.year) {
      movies = await Movie.findAllByYear(req.query.year, { skip, limit });
    } else {
      movies = await Movie.findAll({ skip, limit });
    }

    // Rendering files for now
    return res.json(movies);
  } catch (error) {
    console.log("An error occured...");
    console.log(error);
    return res.status(400).json(error);
  }
};

/**
 * @description Fetch popular movies i.e top 10 by points
 */
exports.getPopularMovies = async (req, res) => {
  try {
    let limit = parseInt(req.query.limit) || 10;
    // Return movies
    const popularMovies = await Movie.find()
      .limit(parseInt(limit))
      .sort({ totalReview: -1 });

    return res.json(popularMovies);
  } catch (error) {
    console.log("An error occured...");
    console.log(error);
    return res.status(400).json(error);
  }
};

/**
 * @description Fetch a given movie by id
 */
exports.getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id)
      .populate([
        {
          path: "actors",
        },
        {
          path: "directors",
        },
        {
          path: "writers",
        },
      ])
      .lean();

    if (!movie) {
      return res.status(404).json({ message: "No movie found" });
    }

    const relatedMovies = await Movie.findAllByGenre(movie.genre, {
      skip: 0,
      limit: 3,
      exclude: [movie._id],
    });

    // Find movie reviews
    const reviews = await Review.find({ _movie: movie._id }).populate("_user", [
      "username",
    ]);

    return res.json({ ...movie, relatedMovies, reviews });

    // return res.format({
    //   "application/json": function () {
    //     res.json({ movie, relatedMovies });
    //   },

    //   "text/html": function () {
    //     res.render("movie", { movie, relatedMovies });
    //   },

    //   default: function () {
    //     // log the request and respond with 406
    //     res.status(406).send("Not Acceptable");
    //   },
    // });
  } catch (error) {
    console.log("An error occured...");
    console.log(error);
    return res.status(400).json(error);
  }
};

/**
 * @description Create/add a movie
 */
exports.createMovie = async (req, res) => {
  try {
    console.log("== Creating movie");
    // Collect movie parameters
    let {
      title,
      releaseYear,
      genre,
      runtime,
      plot,
      rating,
      country,
      image,
      actors,
      directors,
      writers,
    } = req.body;
    let movieObj = {};

    if (title) movieObj.title = title.trim();
    if (releaseYear) movieObj.releaseYear = releaseYear;
    if (genre) {
      // Split if string
      if (typeof genre === "string" || genre instanceof String)
        movieObj.genre = genre.split(/[ ,]+/);
      else movieObj.genre = genre;
    }

    if (runtime) movieObj.runtime = runtime;
    if (plot) movieObj.plot = plot.trim();
    if (rating) movieObj.rating = rating.trim();
    if (country) movieObj.country = country.trim();
    if (image) movieObj.image = image.trim();

    const session = await mongoose.startSession();
    await session.startTransaction();

    // Create movie
    const movie = await Movie.createMovie(movieObj);

    if (!movie) {
      session.abortTransaction();
      return res.status(401).json({ message: "Could not create movie" });
    }

    // Add people
    movie.actors = actors;
    movie.directors = directors;
    movie.writers = writers;

    await movie.save();

    // Add contribution
    let contribution;

    if (req.user) {
      contribution = await Contribution.createContribution({
        _user: req.user,
        type: "Movie",
        _item: movie._id,
      });

      if (!contribution) {
        session.abortTransaction();
        return res.status(401).json({ message: "Could not create movie" });
      }
    }

    session.commitTransaction();

    console.log(`== Movie ${movie.title} created successfully`);

    session.endSession();

    // Return created movie
    return res.json({
      movie,
      contribution,
      message: "Person created successfully",
    });
  } catch (error) {
    console.log("An error occured...");
    console.log(error);
    return res.status(400).json(error);
  }
};

/**
 * @description Update a given movie
 */
exports.updateMovie = async (req, res) => {
  try {
    console.log("== Updating movie");
    // Collect movie parameters
    const movieId = req.params.id;

    // Fetch movie from DB
    const movie = await Movie.findById(movieId);

    if (!movie) return res.status(404).json({ error: "Movie not found" });

    let {
      title,
      releaseYear,
      genre,
      runtime,
      plot,
      rating,
      country,
    } = req.body;

    if (title) movie.title = title.trim();
    if (releaseYear) movie.releaseYear = releaseYear;
    if (genre) movie.genre = genre;
    if (runtime) movie.runtime = runtime;
    if (plot) movie.plot = plot.trim();
    if (rating) movie.rating = rating.trim();
    if (country) movie.country = country.trim();

    await movie.save();

    console.log(`== Movie ${movie.title} updated successfully`);

    // Return updated movie
    return res.json(movie);
  } catch (error) {
    console.log("An error occured...");
    console.log(error);
    return res.status(400).json(error);
  }
};

/**
 * @description Add an actor to a movie
 */
exports.addActor = async (req, res) => {
  try {
    let movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ error: "Movie not found" });

    let actor = await Person.findById(req.params.actorId);
    if (!actor) return res.status(404).json({ error: "Actor not found" });

    // Ensure that person to be added is an actor
    if (actor.rank != "actor")
      return res.status(403).json({ error: "Person must be an actor" });

    // Add actor to movie
    console.log(`== Adding actor ${actor.firstname} to movie ${movie.title}`);
    movie = await Movie.addActor(movie.id, actor.id);

    return res.json(movie);
  } catch (error) {
    console.log("An error occured...");
    console.log(error);
    return res.status(400).json(error);
  }
};

/**
 * @description Add a director to a movie
 */
exports.addDirector = async (req, res) => {
  try {
    let movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ error: "Movie not found" });

    let director = await Person.findById(req.params.directorId);
    if (!director) return res.status(404).json({ error: "Director not found" });

    // Ensure that person to be added is a director
    if (director.rank != "director")
      return res.status(403).json({ error: "Person must be a director" });

    // Add director to movie
    console.log(
      `== Adding director ${director.firstname} to movie ${movie.title}`
    );
    movie = await Movie.addDirector(movie.id, director.id);

    return res.json(movie);
  } catch (error) {
    console.log("An error occured...");
    console.log(error);
    return res.status(400).json(error);
  }
};

/**
 * @description Add a writer to a movie
 */
exports.addWriter = async (req, res) => {
  try {
    let movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ error: "Movie not found" });

    let writer = await Person.findById(req.params.writerId);
    if (!writer) return res.status(404).json({ error: "Writer not found" });

    // Ensure that person to be added is a writer
    if (writer.rank != "writer")
      return res.status(403).json({ error: "Person must be a writer" });

    // Add writer to movie
    console.log(`== Adding writer ${writer.firstname} to movie ${movie.title}`);
    movie = await Movie.addWriter(movie.id, writer.id);

    return res.json(movie);
  } catch (error) {
    console.log("An error occured...");
    console.log(error);
    return res.status(400).json(error);
  }
};

/**
 * @description Delete a given movie
 */
exports.deleteMovie = async (req, res) => {
  try {
    console.log("== Deleting movie");
    const movieId = req.params.id;

    // Find and delete movie
    const movie = await Movie.findById(movieId);
    if (!movie) return res.status(404).json({ error: "Movie not found" });

    movies = movies.filter((m) => m.id != movieId);

    console.log(`== Movie ${movie.title} deleted successfully`);

    // Return deleted movie
    return res.json(movie);
  } catch (error) {
    console.log("An error occured...");
    console.log(error);
    return res.status(400).json(error);
  }
};
