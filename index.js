const http = require("http");
const express = require("express");
const path = require("path");
const app = express();
const { Server } = require("socket.io");
const server = http.createServer(app);

const io = new Server(server);
// socket.io

io.on("connection", (socket) => {
  console.log("user connected", socket.id);

  socket.on("message", (data) => {
    console.log(data);
    io.emit("user-message", data);
  });
});

app.use(express.static(path.resolve("./public")));
app.get("/", (req, res) => {
  return res.sendFile("/public/index.html");
});
server.listen(9000, () => {
  console.log("Server is running on port 9000");
});
