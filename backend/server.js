import colors from "colors"; // Import the colors package for colored console output
import express from "express";
import cors from "cors"; // Import the CORS middleware
import { chats } from "./data/data.js";
import connectDB from "./config/db.js";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env file

connectDB();

const app = express();

// Enable CORS
app.use(cors());

// APIs
app.get("/api/chats", (req, res) => {
  res.send(chats);
});

app.get("/api/chats/:id", (req, res) => {
  const chat = chats.find((c) => c._id === req.params.id);
  if (!chat) {
    return res.status(404).send({ message: "Chat not found" });
  }
  res.send(chat);
});

// Listen on port 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  // with colors
  console.log(`Server started on port ${PORT}`.cyan);
});
