const express = require("express");
const http = require("http");
const session = require("express-session");
const path = require("path");
const dotenv = require("dotenv");
const socketIo = require("socket.io");

const { connectDatabase } = require("./db");
const socket = require("./middleware/socket");

const Movie = require("./models/movie");

// Create express app
const app = express();

// Initialize environment variables
dotenv.config();

// Create app server and connect to socket
const server = http.createServer(app);
socket.connect(server);

const PORT = process.env.PORT || 5000;

// Set view engine::Pug
// app.set("view engine", "pug");
// app.set("views", path.join(__dirname, "client/src"));

// Serve static files
// app.use(express.static("client"));

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
app.use("/contributions", require("./routes/contributions"));
app.use("/peopleConnections", require("./routes/peopleConnections"));
app.use("/usersConnections", require("./routes/usersConnections"));

// app.get("/", async (req, res) => {
//   const movies = await Movie.findAll({ limit: 25, skip: 0 });

//   return res.format({
//     "application/json": function () {
//       res.json(movies);
//     },

//     "text/html": function () {
//       if (req.session.user) res.render("popularmovies", { movies: movies });
//       else res.render("index", { movies: movies });
//     },

//     default: function () {
//       // log the request and respond with 406
//       res.status(406).send("Not Acceptable");
//     },
//   });
// });

// Connect database
connectDatabase();

// Start server
server.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
