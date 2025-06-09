import dotenv from "dotenv";
import colors from "colors";
import connectDB from "./config/db.js";
import app from "./app.js";
import { Server } from "socket.io";
import http from "http";

dotenv.config();

connectDB();

// Create HTTP server
const server = http.createServer(app);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`.cyan);
});

// Socket.io setup
const io = new Server(server, {
  cors: {
    // origin: "http://localhost:5173",
    origin:
      process.env.ENVIRONMENT === "production"
        ? "https://real-time-chat-with-socket-io.onrender.com"
        : "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// socket events
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // Example: join a chat room
  socket.on("setup", (user) => {
    socket.join(user._id);
    console.log("socket user id: ", user._id.bgCyan);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room: ".green + room);
  });

  // typing
  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", (newMessage) => {
    var chat = newMessage.chat;

    if (!chat.users) return console.log("chat.user not defined");
    chat.users.forEach((user) => {
      if (user._id == newMessage.sender._id) {
        console.log("same user".red);
        return;
      }
      socket.in(user._id).emit("message received", newMessage);
    });
  });

  // to clean up
  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(user._id);
  });
});
