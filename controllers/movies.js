// == MOVIES CONTROLLER

let movies = require("../db/movies.json");
const Movie = require("../models/movie");
const Person = require("../models/person");

let lastMovieId = movies.length;

const findById = async (id) => {
  try {
    for (let i = 0; i < movies.length; i++) {
      if (movies[i].id == id) return movies[i];
    }

    return null;
  } catch (error) {
    console.log("An error occured...");
    return null;
  }
};

const findByTitle = async (title) => {
  try {
    let re = new RegExp(title, "i");
    for (let i = 0; i < movies.length; i++) {
      if (movies[i].title.match(re)) return movies[i];
    }

    return null;
  } catch (error) {
    console.log("An error occured...");
    return null;
  }
};

const findAllByTitle = async (title) => {
  try {
    const moviesArr = [];
    let re = new RegExp(title, "i");
    for (let i = 0; i < movies.length; i++) {
      if (movies[i].title.match(re)) moviesArr.push(movies[i]);
    }

    return moviesArr;
  } catch (error) {
    console.log("An error occured...");
    return [];
  }
};

const findAllByGenre = async (genre) => {
  try {
    const moviesArr = [];
    let re = new RegExp(genre, "i");
    for (let i = 0; i < movies.length; i++) {
      if (movies[i].genre.match(re)) moviesArr.push(movies[i]);
    }

    return moviesArr;
  } catch (error) {
    console.log("An error occured...");
    return [];
  }
};

const findAllByYear = async (releaseYear) => {
  try {
    const moviesArr = [];
    for (let i = 0; i < movies.length; i++) {
      if (movies[i].releaseYear == releaseYear) moviesArr.push(movies[i]);
    }

    return moviesArr;
  } catch (error) {
    console.log("An error occured...");
    return [];
  }
};

/**
 * @description Fetch all movies::First 10 movies by default
 */
exports.getMovies = async (req, res) => {
  try {
    let skip = parseInt(req.query.skip) || 0;
    let limit = parseInt(req.query.limit) || 10;

    let moviesArr = [];

    // Return movies
    if (req.query.title) {
      moviesArr = await Movie.findAllByTitle(req.query.title, { skip, limit });
    } else if (req.query.genre) {
      moviesArr = await Movie.findAllByGenre(req.query.genre, { skip, limit });
    } else if (req.query.year) {
      moviesArr = await Movie.findAllByYear(req.query.year, { skip, limit });
    } else {
      moviesArr = await Movie.findAll({ skip, limit });
    }

    return res.json(moviesArr);
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
    const movieId = req.params.id;

    const movie = await Movie.findById(movieId);

    if (!movie) {
      return res.status(404).json({ message: "No movie found" });
    }

    return res.json(movie);
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
    } = req.body;
    let movieObj = {};

    movieObj.id = lastMovieId++;

    if (title) movieObj.title = title.trim();
    if (releaseYear) movieObj.releaseYear = releaseYear;
    if (genre) movieObj.genre = genre;
    if (runtime) movieObj.runtime = runtime;
    if (plot) movieObj.plot = plot.trim();
    if (rating) movieObj.rating = rating.trim();
    if (country) movieObj.country = country.trim();

    movieObj.actors = [];
    movieObj.directors = [];
    movieObj.writers = [];

    // Add movie to db
    movies.push(movieObj);

    console.log(`== Movie ${movieObj.title} added successfully`);

    // Return created movie
    return res.json(movieObj);
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
    const movie = await findById(movieId);

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
    const movie = await findById(movieId);
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
