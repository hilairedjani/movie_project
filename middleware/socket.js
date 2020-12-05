let connection = null;
class Socket {
  socket;
  constructor() {
    this.socket = null;
  }
  connect(server) {
    const io = require("socket.io")(server, { cors: { origin: "*" } });
    io.on("connection", (socket) => {
      console.log(`== Connected: Client ${socket.id} just connected`);
      this.socket = socket;

      // Send id back to client
      io.to(socket.id).emit("client-socket-id", { socketId: socket.id });
    });
  }
  emit(event, data) {
    this.socket.emit(event, data);
  }

  emitTo(id, event, data) {
    connection.to(id).emit(event, data);
  }

  static init(server) {
    if (!connection) {
      connection = new Socket();
      connection.connect(server);
    }
  }
  static getConnection() {
    if (connection) {
      return connection;
    }
  }
}

module.exports = { connect: Socket.init, connection: Socket.getConnection };
