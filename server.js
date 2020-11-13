const express = require("express");
const path = require("path");

const { connectDatabase } = require("./db");

// Create express server
const app = express();

const PORT = process.env.PORT || 3000;

// Set view engine::Pug
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "client/src"));

// Serve static files
app.use(express.static("client"));

// Apply app middleware
app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: false }));

// This middleware displays request details
app.use((req, res, next) => {
  console.log("===================================");
  console.log(`== Request Method: ${req.method}`);
  console.log(`== Request URL: ${req.url}`);
  console.log(`== Request PATH: ${req.path}`);
  console.log();
  next();
});

// Add routes
app.use("/auth", require("./routes/auth"));
app.use("/movies", require("./routes/movies"));
app.use("/people", require("./routes/people"));
app.use("/users", require("./routes/users"));
app.use("/reviews", require("./routes/reviews"));

// app.get("/", (req, res) => {
//   const movies = require("./db/movies.json");
//   res.render("index", { movies: movies });
// });

// Connect database
connectDatabase();

// Start server
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
