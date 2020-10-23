const fs = require("fs");
const rawMovies = require("./movie-data-short.json");
const { movies, people, users } = require("./index");

(function seedDB() {
  let movieCount = 0;
  let peopleCount = 0;

  console.log("============================");
  console.log("== Seeding DB");
  console.log("============================");

  for (let rm = 0; rm < rawMovies.length; rm++) {
    console.log(`== Parsing movie ${rawMovies[rm].Title}`);
    movieCount++;

    let movieObject = {};
    movieObject.id = movieCount;
    movieObject.title = rawMovies[rm].Title;
    movieObject.releaseYear = rawMovies[rm].Year;
    movieObject.genre = rawMovies[rm].Genre;
    movieObject.runtime = rawMovies[rm].Runtime;
    movieObject.plot = rawMovies[rm].Plot;
    movieObject.rating = rawMovies[rm].Rated;
    movieObject.country = rawMovies[rm].Country;
    movieObject.actors = [];
    movieObject.directors = [];
    movieObject.writers = [];

    // Split actors array and add actors to people and movie
    let actorsRaw = rawMovies[rm].Actors.split(", ");

    for (let ar = 0; ar < actorsRaw.length; ar++) {
      let actorObject = null;
      let firstname = actorsRaw[ar].split(" ")[0];
      let lastname = actorsRaw[ar].split(" ")[1];

      for (let p = 0; p < people.length; p++) {
        // If person is already in DB, skip person
        if (
          people[p].firstname == firstname &&
          people[p].lastname == lastname &&
          people[p].rank == "actor"
        ) {
          console.log(
            `== Actor ${firstname} ${lastname} already in DB::Skip actor`
          );
          actorObject = people[p];
          break;
        }
      }

      // If actor was not in DB, add to DB
      if (!actorObject) {
        actorObject = {};
        peopleCount++;
        actorObject.id = peopleCount;
        actorObject.rank = "actor";
        actorObject.firstname = firstname;
        actorObject.lastname = lastname;

        console.log(
          `== Adding actor ${actorObject.firstname} ${actorObject.lastname} to database`
        );
        people.push(actorObject);
      }

      console.log(
        `== Adding actor ${actorObject.firstname} ${actorObject.lastname} to movie ${movieObject.title}'s actors`
      );
      movieObject.actors.push(actorObject.id);
    }

    // Split directors array and add directors to people and movie
    let directorsRaw = rawMovies[rm].Director.split(", ");

    for (let dr = 0; dr < directorsRaw.length; dr++) {
      let directorObject = null;
      let firstname = directorsRaw[dr].split(" ")[0];
      let lastname = directorsRaw[dr].split(" ")[1];

      for (let p = 0; p < people.length; p++) {
        // If director is already in DB, skip person
        if (
          people[p].firstname == firstname &&
          people[p].lastname == lastname &&
          people[p].rank == "director"
        ) {
          console.log(
            `== Director ${firstname} ${lastname} already in DB::Skip director`
          );
          directorObject = people[p];
          break;
        }
      }

      // If director was not in DB, add to DB
      if (!directorObject) {
        peopleCount++;
        directorObject = {};
        directorObject.id = peopleCount;
        directorObject.rank = "director";
        directorObject.firstname = firstname;
        directorObject.lastname = lastname;

        console.log(
          `== Adding director ${directorObject.firstname} ${directorObject.lastname} to database`
        );
        people.push(directorObject);
      }

      console.log(
        `== Adding director ${directorObject.firstname} ${directorObject.lastname} to movie ${movieObject.title}'s directors`
      );
      movieObject.directors.push(directorObject.id);
    }

    let writersRaw = rawMovies[rm].Writer.split(", ");

    for (let wr = 0; wr < writersRaw.length; wr++) {
      let writerObject = null;
      let firstname = writersRaw[wr].split(" ")[0];
      let lastname = writersRaw[wr].split(" ")[1];

      for (let p = 0; p < people.length; p++) {
        // If writer is already in DB, skip person
        if (
          people[p].firstname == firstname &&
          people[p].lastname == lastname &&
          people[p].rank == "writer"
        ) {
          console.log(
            `== Writer ${firstname} ${lastname} already in DB::Skip writer`
          );
          writerObject = people[p];
          break;
        }
      }

      // If writer was not in DB, add to DB
      if (!writerObject) {
        peopleCount++;
        writerObject = {};
        writerObject.id = peopleCount;
        writerObject.rank = "writer";
        writerObject.firstname = firstname;
        writerObject.lastname = lastname;

        console.log(
          `== Adding writer ${writerObject.firstname} ${writerObject.lastname} to database`
        );
        people.push(writerObject);
      }

      console.log(
        `== Adding writer ${writerObject.firstname} ${writerObject.lastname} to movie ${movieObject.title}'s writers`
      );
      movieObject.writers.push(writerObject.id);
    }

    // Add movie to DB
    console.log(`== Adding movie ${movieObject.title} to database`);
    movies.push(movieObject);
  }

  // Adding users
  const user1 = {
    firstname: "User",
    lastname: "One",
    email: "user1@test.com",
    password: "password",
    username: "userone",
    role: "contributor",
  };

  console.log(`== Adding user ${user1.username} to database`);
  users.push(user1);

  const user2 = {
    firstname: "User",
    lastname: "Two",
    email: "user2@test.com",
    password: "password",
    username: "usertwo",
    role: "contributor",
  };

  console.log(`== Adding user ${user2.username} to database`);
  users.push(user2);

  const user3 = {
    firstname: "John",
    lastname: "Doe",
    email: "johndoe@test.com",
    password: "password",
    username: "johndoe",
    role: "user",
  };

  console.log(`== Adding user ${user3.username} to database`);
  users.push(user3);

  // Write data to files
  console.log("== Writing movies to file db/movies.json");
  fs.writeFile("db/movies.json", JSON.stringify(movies), function (err) {
    if (err) throw err;
    console.log("== Writing movies to db/movies.json completed");
  });

  console.log("== Writing people to file db/people.json");
  fs.writeFile("db/people.json", JSON.stringify(people), function (err) {
    if (err) throw err;
    console.log("== Writing people to db/people.json completed");
  });

  console.log("== Writing users to file db/users.json");
  fs.writeFile("db/users.json", JSON.stringify(users), function (err) {
    if (err) throw err;
    console.log("== Writing users to db/users.json completed");
  });

  console.log("============================");
  console.log("== Seeding completed");
  console.log(`== Movies: ${movies.length}`);
  console.log(`== People: ${people.length}`);
  console.log("============================");
})();
