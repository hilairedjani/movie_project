const express = require("express");
const session = require("express-session");
const path = require("path");

const { connectDatabase } = require("./db");

const Movie = require("./models/Movie");

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
app.use(
  session({
    secret: "movieDBSecret",
    resave: false,
    saveUninitialized: true,
  })
);

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

app.get("/", async (req, res) => {
  const movies = await Movie.findAll({ limit: 25, skip: 0 });

  return res.format({
    "application/json": function () {
      res.json(movies);
    },

    "text/html": function () {
      res.render("index", { movies: movies });
    },

    default: function () {
      // log the request and respond with 406
      res.status(406).send("Not Acceptable");
    },
  });
});

// Connect database
connectDatabase();

// Start server
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
