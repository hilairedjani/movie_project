// == MOVIE MODEL

/**
 * == MOVIE SCHEMA
 * title
 * releaseYear
 */

let movies = require("../db/movies.json");

const Movie = {};

Movie.findAll = async ({ limit = 10, skip = 0 }) => {
  try {
    let moviesArr = [];
    moviesArr = movies.slice(skip, limit + skip);

    return moviesArr;
  } catch (error) {
    console.log(error);
    console.log("An error occured...");
    return [];
  }
};

// Find movies based on title
Movie.findAllByTitle = async (title, { skip = 0, limit = 10 }) => {
  try {
    let moviesArr = [];
    let re = new RegExp(title, "i");

    let moviesCount = 0;
    let skipCount = 0;

    for (let i = 0; i < movies.length; i++) {
      if (movies[i].title && movies[i].title.match(re)) {
        if (skipCount++ < skip) {
          continue;
        }

        if (moviesCount < limit) {
          moviesArr.push(movies[i]);
          moviesCount++;
        } else {
          break;
        }
      }
    }

    return moviesArr;
  } catch (error) {
    console.log(error);
    console.log("An error occured...");
    return [];
  }
};

// Find movies based on genre
Movie.findAllByGenre = async (genre, { skip = 0, limit = 10 }) => {
  try {
    let moviesArr = [];
    let re = new RegExp(genre, "i");

    let moviesCount = 0;
    let skipCount = 0;

    for (let i = 0; i < movies.length; i++) {
      if (movies[i].genre && movies[i].genre.match(re)) {
        if (skipCount++ < skip) {
          continue;
        }

        if (moviesCount < limit) {
          moviesArr.push(movies[i]);
          moviesCount++;
        } else {
          break;
        }
      }
    }

    return moviesArr;
  } catch (error) {
    console.log(error);
    console.log("An error occured...");
    return [];
  }
};

// Find movies based on release year
Movie.findAllByYear = async (year, { skip = 0, limit = 10 }) => {
  try {
    let moviesArr = [];

    let moviesCount = 0;
    let skipCount = 0;

    for (let i = 0; i < movies.length; i++) {
      if (movies[i].releaseYear == year) {
        if (skipCount++ < skip) {
          continue;
        }

        if (moviesCount < limit) {
          moviesArr.push(movies[i]);
          moviesCount++;
        } else {
          break;
        }
      }
    }

    return moviesArr;
  } catch (error) {
    console.log(error);
    console.log("An error occured...");
    return [];
  }
};

// Find a movie by id
Movie.findById = async (id) => {
  try {
    for (let i = 0; i < movies.length; i++) {
      if (movies[i].id == id) return movies[i];
    }

    return null;
  } catch (error) {
    console.log("An error occured...");
    console.log(error);
    return null;
  }
};

// Add an actor to a movie
Movie.addActor = async (movieId, actorId) => {
  try {
    const movie = await Movie.findById(movieId);

    if (movie.actors.includes(actorId)) {
      return movie;
    }

    movie.actors.push(actorId);

    return movie;
  } catch (error) {
    console.log(error);
    console.log("An error occured...");
    return [];
  }
};

// Add a director to a movie
Movie.addDirector = async (movieId, directorId) => {
  try {
    const movie = await Movie.findById(movieId);

    if (movie.directors.includes(directorId)) {
      return movie;
    }

    movie.directors.push(directorId);

    return movie;
  } catch (error) {
    console.log(error);
    console.log("An error occured...");
    return [];
  }
};

// Add a writer to a movie
Movie.addWriter = async (movieId, writerId) => {
  try {
    const movie = await Movie.findById(movieId);

    if (movie.writers.includes(writerId)) {
      return movie;
    }

    movie.writers.push(writerId);

    return movie;
  } catch (error) {
    console.log(error);
    console.log("An error occured...");
    return [];
  }
};

module.exports = Movie;
