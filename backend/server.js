import colors from "colors"; // Import the colors package for colored console output
import express from "express";
import cors from "cors"; // Import the CORS middleware
import { chats } from "./data/data.js";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import multer from "multer";
import { chatRoutes } from "./routes/chatRoutes.js";

dotenv.config(); // Load environment variables from .env file

connectDB();

const app = express();

// to accept JSON data
app.use(express.json());

// Configure multer for file uploads
const upload = multer({ storage: multer.memoryStorage() }); // You can configure storage as needed

// Use multer for routes that handle file uploads
app.use("/api/user/register/", upload.single("picture")); // Handle single file upload with the key "picture"

const corsOptions = {
  origin: "http://localhost:5173", // Allow your frontend's origin
  methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
  credentials: true, // Allow cookies and credentials
};

app.use(cors(corsOptions));

//to use the routes
app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);

//chat route
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

// to handle errors
app.use(notFound);
app.use(errorHandler);

// Listen on port 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  // with colors
  console.log(`Server started on port ${PORT}`.cyan);
});
