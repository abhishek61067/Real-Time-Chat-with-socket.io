import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import { chatRoutes } from "./routes/chatRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import { chats } from "./data/data.js";
import { corsOptions } from "./config/cors.js";
import { fileURLToPath } from "url";
import path from "path";

const app = express();

app.use(express.json());

// config to upload images and other media files

// Enable CORS with custom options
app.use(cors(corsOptions));

// Routes
console.log("Registering userRoutes");
app.use("/api/user", userRoutes);
console.log("Registering chatRoutes");
app.use("/api/chat", chatRoutes);
console.log("Registering messageRoutes");
app.use("/api/message", messageRoutes);

// for deployment
const _dirname = path.resolve();
app.use(express.static(path.join(_dirname, "/frontend/dist")));
app.get(/^(?!\/api).*/, (req, res) => {
  res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"));
});

// Error handling
app.use(notFound);
app.use(errorHandler);

export default app;
