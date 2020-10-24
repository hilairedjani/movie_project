const http = require("http");
const fs = require("fs");

const express = require("express");
const path = require("path");

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

// Start server
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));

// const topMovies = require("./db/movie-data-short.json");

// function executeGet({
//   fileName,
//   fileType = "text/html",
//   data = null,
//   response,
// }) {
//   fs.readFile(fileName, function (err, data) {
//     if (err) {
//       console.log("An error occured");
//       response.statusCode = 500;
//       response.write("Server Error");
//       response.end();
//     }

//     response.statusCode = 200;
//     response.setHeader("Content-Type", fileType);
//     data && response.write(data);
//     response.end();
//   });
// }

// const server = http.createServer((request, response) => {
//   const method = request.method;
//   const url = request.url.slice(1, request.url.length);
//   console.log(url);
//   switch (method) {
//     case "GET":
//       switch (url) {
//         case "movies":
//           break;

//         case "movie/:id":
//           break;

//         case "top-movies":
//           response.statusCode = 200;
//           response.setHeader("Content-Type", "text/html");
//           response.write(JSON.stringify(topMovies));
//           response.end();
//           break;

//         case "assets/javascript/index.js":
//           fs.readFile("./client/assets/javascript/index.js", function (
//             err,
//             data
//           ) {
//             if (err) {
//               console.log("HTML Route Error");
//               response.statusCode = 500;
//               response.write("Server Error");
//               response.end();
//             }

//             response.statusCode = 200;
//             response.setHeader("Content-Type", "application/javascript");
//             response.write(data);
//             response.end();
//           });
//           break;

//         default:
//           fs.readFile("./client/src/index.html", function (err, data) {
//             if (err) {
//               console.log("HTML Route Error");
//               response.statusCode = 500;
//               response.write("Server Error");
//               response.end();
//             }

//             response.statusCode = 200;
//             response.setHeader("Content-Type", "text/html");
//             response.write(data);
//             response.end();
//           });
//           break;
//       }
//       break;
//     case "POST":
//       break;

//     default:
//       break;
//   }
// });

// server.listen(PORT);

// console.log(`Server listening on http://localhost:${PORT}`);
