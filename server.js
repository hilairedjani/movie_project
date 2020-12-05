const express = require("express");
const http = require("http");
const session = require("express-session");
const dotenv = require("dotenv");
const socketIo = require("socket.io");

const { connectDatabase } = require("./db");
// const socket = require("./middleware/socket");

// Create express app
const app = express();

// Initialize environment variables
dotenv.config();

// Create app server and connect to socket
const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: "*" } });

app.io = io;

// socket.connect(server);

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

// Connect database
connectDatabase();

io.on("connection", (socket) => {
  console.log(`== Connected: Client ${socket.id} just connected`);
  this.socket = socket;

  // Send id back to client
  io.to(socket.id).emit("client-socket-id", { socketId: socket.id });
});

// Start server
server.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
