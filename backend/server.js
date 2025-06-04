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
    origin: "http://localhost:5173", // adjust to your frontend URL/port
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // Example: join a chat room
  socket.on("join_chat", (roomId) => {
    socket.join(roomId);
    console.log(`User ${socket.id} joined room ${roomId}`);
  });

  // Example: send and receive messages
  socket.on("send_message", (data) => {
    // data should include { roomId, message }
    io.to(data.roomId).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});
