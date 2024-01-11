const express = require("express");
const http = require("http");
const sockeIo = require("socket.io");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const routerApi = require("./routes");
const app = express();
const server = http.createServer(app);
const crypto = require("crypto");

const randomId = () => crypto.randomBytes(8).toString("hex");
const io = sockeIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUST"],
  },
});

const {
  logErrors,
  errorHandler,
  boomErrorHandler,
  ormErrorHandler,
} = require("./middlewares/error.handler");

const allowlist = ["http://localhost:3000", "https://kisko-app.vercel.app"];

var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (allowlist.indexOf(req.header("Origin")) !== -1) {
    corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false }; // disable CORS for this request
  }
  callback(null, corsOptions); // callback expects two parameters: error and options
};

app.use(cors(corsOptionsDelegate));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});
const { Op } = require("sequelize");
const models = require("./db/models/index");
const { Order } = models;
app.use(async (req, res, next) => {
  // Obtén la hora actual
  console.log("update orders");

  // Actualiza todas las órdenes pendientes que fueron creadas hace más de un minuto
  /*const resp = await Order.update(
    { state: "cancelled" },
    {
      where: {
        state: {
          [Op.or]: ["pendding", "success"],
        },
        createdAt: {
          [Op.lt]:: new Date(new Date() - 24 * 60 * 60 * 1000),
        },
      },
    }
  );

  console.log(resp, "resppp");*/

  // Continúa con el siguiente middleware
  next();
});

io.use((socket, next) => {
  const username = socket.handshake.auth.username;
  socket.sessionID = randomId();
  socket.userID = randomId();
  socket.username = username;
  next();
});

let users = [];
io.on("connection", (socket) => {
  socket.onAny((event, ...args) => {
    console.log(event, args);
  });

  for (let [id, socket] of io.of("/").sockets) {
    users = users.filter((u) => u.id !== socket.username);
    users.push({ id: socket.username, sockeId: socket.id });
  }

  socket.on("notification", (nt, to) => {
    const user = users.filter((u) => u.id == to);

    user.length > 0 && io.to(user[0].sockeId).emit("notification", nt);
  });

  socket.on("disconnect", () => {
    console.log("user: " + socket.id + "desconnect");
    users = users.filter((u) => u.socketId !== socket.id);
  });

  socket.emit("users", users);
});

app.get("/", (req, res) => {
  res.send("prueba");
});
routerApi(app);

app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

module.exports = { server, io };
