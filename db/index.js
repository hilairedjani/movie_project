const mongoose = require("mongoose");

const mongoURI = "mongodb://localhost:27017/movie_project_development";

export const movies = [];
export const people = [];
export const users = [];

export const connectDatabase = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const db = mongoose.connection;

    // Get connection error events
    db.on("error", (error) => {
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
