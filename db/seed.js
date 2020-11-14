const mongoose = require("mongoose");

const rawMovies = require("./movie-data-short.json");

const mongoURI =
  process.env.NODE_ENV === "production"
    ? "mongodb+srv://movie_project:movieproject@movieproject.2ge01.mongodb.net/movieProject?retryWrites=true&w=majority"
    : "mongodb://localhost:27017/movie_project_development";

const Movie = require("../models/movie");
const User = require("../models/user");
const Person = require("../models/person");
const Review = require("../models/review");

(async function seedDB() {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Drop and then recreate database database
    const { connection } = mongoose;
    await mongoose.connection.db.dropDatabase(
      console.log(`== ${connection.db.databaseName} database dropped.`)
    );

    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const db = mongoose.connection.db;
    console.log(`== Database ${db.databaseName} created`);

    console.log("============================");
    console.log("== Seeding DB");
    console.log("============================");

    // Adding users
    let user = null,
      contributor = null;
    for (let i = 0; i < 5; i++) {
      contributor = await User.createUser({
        firstname: "User",
        lastname: `${i + 1}`,
        email: `user${i + 1}@test.com`,
        password: "password",
        username: `user${i + 1}`,
        role: "contributor",
      });
      console.log(`== Adding user ${contributor.username} to database`);

      user = await User.createUser({
        firstname: "John",
        lastname: `Doe${i + 1}`,
        email: `johndoe${i + 1}@test.com`,
        password: "password",
        username: `johndoe${i + 1}`,
        role: "user",
      });
      console.log(`== Adding user ${user.username} to database`);
    }

    // Parse and add movies
    let movie = null;
    for (let rm = 0; rm < rawMovies.length; rm++) {
      console.log(`== Parsing movie ${rawMovies[rm].Title}`);

      let movieObject = {};
      movieObject.title = rawMovies[rm].Title;
      movieObject.releaseYear = rawMovies[rm].Year;
      movieObject.genre = rawMovies[rm].Genre.split(", ");
      movieObject.runtime = rawMovies[rm].Runtime;
      movieObject.plot = rawMovies[rm].Plot;
      movieObject.rating = rawMovies[rm].Rated;
      movieObject.country = rawMovies[rm].Country;
      movieObject.image = rawMovies[rm].Poster;
      movieObject.actors = [];
      movieObject.directors = [];
      movieObject.writers = [];

      // Split actors array and add actors to people and movie
      let actorsRaw = rawMovies[rm].Actors.split(", ");

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
        console.log(
          `== Adding actor ${actor.firstname} ${actor.lastname} to movie ${movieObject.title}'s actors`
        );
        movieObject.actors.push(actor._id);
      }

      // Split directors array and add directors to people and movie
      let directorsRaw = rawMovies[rm].Director.split(", ");

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
          console.log(
            `== Adding director ${firstname} ${lastname} to database`
          );
          director = await Person.createPerson({
            firstname,
            lastname,
            rank: "director",
          });
          await director.save();
        }

        // Add director to movie
        console.log(
          `== Adding director ${director.firstname} ${director.lastname} to movie ${movieObject.title}'s directors`
        );
        movieObject.directors.push(director._id);
      }

      // Split sriters array and add sriters to people and movie
      let writersRaw = rawMovies[rm].Writer.split(", ");

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
        console.log(
          `== Adding writer ${writer.firstname} ${writer.lastname} to movie ${movieObject.title}'s writers`
        );
        movieObject.writers.push(writer._id);
      }

      // Save movie to DB
      console.log(`== Adding movie ${movieObject.title} to database`);
      movie = await Movie.createMovie(movieObject);

      // Add a few reviews for this movie
      for (let i = 1; i <= 5; i++) {
        console.log(`== Adding review ${i} to movie ${movie.title}`);
        await Review.createReview(contributor._id, movie._id, {
          value: i,
          reviewText: `Review: ${i} for movie: ${movie.title} by user: ${contributor.username}`,
        });
      }
    }

    console.log("============================");
    console.log("== Seeding completed");
    console.log("============================");
    process.exit();
  } catch (error) {
    console.log("An error occured::Could not create database");
    console.log(error);
    process.exit(1);
  }
})();
