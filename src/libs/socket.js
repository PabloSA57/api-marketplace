const socketIo = require("socket.io");

class SocketManager {
  name = "";
  constructor(server) {
    this.io = socketIo(server, {
      cors: {
        origin: ["http://localhost:3000", "https://kisko-app.vercel.app"],
        methods: ["GET", "POST", "PUT"],
      },
    });

    this.io.on("");
  }
}
