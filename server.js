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
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/movies", require("./routes/api/movies"));
app.use("/api/people", require("./routes/api/people"));
app.use("/api/users", require("./routes/api/users"));

app.get("/", (req, res) => {
  const movies = require("./db/movies.json");
  res.render("index", { movies: movies });
});

// Connect database
connectDatabase();

// Start server
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
