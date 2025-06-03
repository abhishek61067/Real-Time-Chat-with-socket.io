import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import { chatRoutes } from "./routes/chatRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import { chats } from "./data/data.js";
import { upload } from "./config/mediaUploadConfig.js";
import { corsOptions } from "./config/cors.js";

const app = express();

app.use(express.json());

// config to upload images and other media files
app.use("/api/user/register/", upload.single("picture"));

// Enable CORS with custom options
app.use(cors(corsOptions));

// Routes
app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

// Error handling
app.use(notFound);
app.use(errorHandler);

export default app;
