import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import cors from "cors";

const app = express();
const port = 3000;

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});
io.on("connection", (socket) => {
  console.log("User Connected", socket.id);
  // # this will send to all of the who are connected - all
  // socket.emit("welcome", `Welcome to Socket Backend ${socket.id}`);

  // # this will send to all of the who are connected without who sent - all but who socketted
  // socket.broadcast.emit("welcome", `${socket.id} - joined the server`);

  // this will send data to perticular room
  socket.on("message", ({ room, message }) => {
    console.log({ room, message });
    socket.to(room).emit("receive-message", message);
  });

  socket.on("join-room", (room) => {
    socket.join(room);
    console.log(`User joined room ${room}`);
  });

  // socket.on("message", (data) => {
  //   console.log(data);
  // });

  socket.on("disconnect", () => {
    console.log("User Disconected ", socket.id);
  });
});
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.get("/", (req, res) => {
  return res.send("Hello World!");
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
