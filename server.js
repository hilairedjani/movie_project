const http = require("http");
const fs = require("fs");

const PORT = 3000;

const topMovies = require("./db/movie-data-short.json");

function executeGet({
  fileName,
  fileType = "text/html",
  data = null,
  response,
}) {
  fs.readFile(fileName, function (err, data) {
    if (err) {
      console.log("An error occured");
      response.statusCode = 500;
      response.write("Server Error");
      response.end();
    }

    response.statusCode = 200;
    response.setHeader("Content-Type", fileType);
    data && response.write(data);
    response.end();
  });
}

const server = http.createServer((request, response) => {
  const method = request.method;
  const url = request.url.slice(1, request.url.length);
  console.log(url);
  switch (method) {
    case "GET":
      switch (url) {
        case "movies":
          break;

        case "top-movies":
          response.statusCode = 200;
          response.setHeader("Content-Type", "text/html");
          response.write(JSON.stringify(topMovies));
          response.end();
          break;

        case "assets/javascript/index.js":
          fs.readFile("./client/assets/javascript/index.js", function (
            err,
            data
          ) {
            if (err) {
              console.log("HTML Route Error");
              response.statusCode = 500;
              response.write("Server Error");
              response.end();
            }

            response.statusCode = 200;
            response.setHeader("Content-Type", "application/javascript");
            response.write(data);
            response.end();
          });
          break;

        default:
          fs.readFile("./client/src/index.html", function (err, data) {
            if (err) {
              console.log("HTML Route Error");
              response.statusCode = 500;
              response.write("Server Error");
              response.end();
            }

            response.statusCode = 200;
            response.setHeader("Content-Type", "text/html");
            response.write(data);
            response.end();
          });
          break;
      }
      break;
    case "POST":
      break;

    default:
      break;
  }
});

server.listen(PORT);

console.log(`Server listening on http://localhost:${PORT}`);
