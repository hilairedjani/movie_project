const fetch = require("node-fetch");
const Omdb_Url = `http://www.omdbapi.com/?apikey=36533b13`;

const Person = require("../models/person");

exports.fetchmoviefromapi = async (movie) => {
  try {
    const data = await fetch(`${Omdb_Url}&t=${movie}`);
    const response = await data.text();

    return response;
  } catch (error) {
    console.log(error);
    return null;
  }
};

/**
 * @description Parse movie from raw data
 */
exports.parseRawMovie = async (rawMovie) => {
  try {
    let movie = {};
    movie.title = rawMovie.Title;
    movie.releaseYear = rawMovie.Year;
    movie.genre = rawMovie.Genre.split(", ");
    movie.runtime = rawMovie.Runtime;
    movie.plot = rawMovie.Plot;
    movie.rating = rawMovie.Rated;
    movie.country = rawMovie.Country;
    movie.image = rawMovie.Poster;
    movie.actors = [];
    movie.directors = [];
    movie.writers = [];

    // Split actors array and add actors to people and movie
    let actorsRaw = rawMovie.Actors.split(", ");

    for (let ar = 0; ar < actorsRaw.length; ar++) {
      let firstname = actorsRaw[ar].split(" ")[0];
      let lastname = actorsRaw[ar].split(" ")[1];

      let actor = await Person.findOne({
        firstname,
        lastname,
        rank: "actor",
      });

      //  If actor is not present, create them
      if (!actor) {
        console.log(`== Adding actor ${firstname} ${lastname} to database`);
        actor = await Person.createPerson({
          firstname,
          lastname,
          rank: "actor",
        });
        await actor.save();
      }

      // Add actor to movie
      movie.actors.push(actor);
    }

    // Split directors array and add directors to people and movie
    let directorsRaw = rawMovie.Director.split(", ");

    for (let dr = 0; dr < directorsRaw.length; dr++) {
      let firstname = directorsRaw[dr].split(" ")[0];
      let lastname = directorsRaw[dr].split(" ")[1];

      let director = await Person.findOne({
        firstname,
        lastname,
        rank: "director",
      });

      //  If director is not present, create them
      if (!director) {
        console.log(`== Adding director ${firstname} ${lastname} to database`);
        director = await Person.createPerson({
          firstname,
          lastname,
          rank: "director",
        });
        await director.save();
      }

      // Add director to movie
      movie.directors.push(director);
    }

    // Split sriters array and add sriters to people and movie
    let writersRaw = rawMovie.Writer.split(", ");

    for (let wr = 0; wr < writersRaw.length; wr++) {
      let firstname = writersRaw[wr].split(" ")[0];
      let lastname = writersRaw[wr].split(" ")[1];

      let writer = await Person.findOne({
        firstname,
        lastname,
        rank: "writer",
      });

      //  If writer is not present, create them
      if (!writer) {
        console.log(`== Adding writer ${firstname} ${lastname} to database`);
        writer = await Person.createPerson({
          firstname,
          lastname,
          rank: "writer",
        });
        await writer.save();
      }

      // Add writer to movie
      movie.writers.push(writer);
    }

    return movie;
  } catch (error) {
    console.log(error);
    return null;
  }
};
