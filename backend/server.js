import dotenv from "dotenv";
import colors from "colors";
import connectDB from "./config/db.js";
import app from "./app.js";
import { Server } from "socket.io";
import { createServer } from "http";

dotenv.config();

connectDB();

// Create HTTP server
const server = createServer(app);

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
        ? process.env.PRODUCTION_URL
        : process.env.CLIENT_LOCAL_URL,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// socket events
io.on("connection", (socket) => {
  console.log("A user connected with socket id:", socket.id.green);

  socket.on("setup", (user) => {
    // Example: join a chat room
    // This one is necessary if the same user is connecting from multiple devices i.e. multiple socket, so that the user gets the message in each of the devices
    socket.join(user._id);
    console.log("socket user joined with user id: ", user._id.cyan);
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
      // only send message to receiver
      if (user._id == newMessage.sender._id) {
        console.log("same user".red);
        return;
      }
      // receiver should receive
      let receiver = user._id;
      console.log("receivers user id: ", receiver);
      socket.in(receiver).emit("message received", newMessage);
    });
  });

  // to clean up
  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(user._id);
  });
});
