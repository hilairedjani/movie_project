const mongoose = require("mongoose");

const mongoURI = "mongodb://localhost:27017/movie_project_development";

exports.connectDatabase = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const { connection } = mongoose;

    // Get connection error events
    connection.on("error", (error) => {
      console.log("An error occured::Could not connect to database");
      console.log(error);
      process.exit(1);
    });
  } catch (error) {
    console.log("An error occured::Could not connect to database");
    console.log(error);
    process.exit(1);
  }
};

exports.seedDataBase = async () => {
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
  } catch (error) {
    console.log("An error occured::Could not create database");
    console.log(error);
    process.exit(1);
  }
};
