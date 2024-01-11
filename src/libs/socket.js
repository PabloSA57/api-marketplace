const { io } = require("../app");

let users = [];

const addUser = (userId, socketId) => {
  console.log("arr :" + users, "userId: " + userId[0]);
  !users.some((user) => userId === user.userId) &&
    users.push({ userId, socketId });
};

const getUser = (userId) => {
  console.log(users);
  return users.find((user) => user.userId === userId);
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};


module.exports = (io) => {
    io.on("connection", (socket) => {

    })
}