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

  // to setup for connecting all the sockets to that user in case user joins from multiple devices
  socket.on("setup", (user) => {
    // This one is necessary to connect the user from all sockets in case user want to use the app from multiple devices
    socket.join(user._id);
    console.log("socket user joined with user id: ", user._id.cyan);
    socket.emit("connected");
  });

  // when user select the chat
  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room: ".bgGreen + room.bgGreen);
  });

  // typing
  socket.on("typing", (room) => {
    console.log("user is typing in room: ".bgYellow, room);
    socket.in(room).emit("typing");
  });
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  // when user sends message
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

  // when user disconnect
  socket.on("disconnect", () => {
    console.log("A user disconnected with socket id:".bgRed, socket.id.bgRed);
  });
});
