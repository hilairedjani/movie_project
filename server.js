const http = require("http");
const fs = require("fs");

const PORT = 3000;

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

  switch (method) {
    case "GET":
      switch (url) {
        case "movies":
          break;

        default:
          executeGet({ fileName: "client/index.html", response: response });
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
