import express from "express";
import { chats } from "./data/data.js";

const app = express();

// apis
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
  console.log(`Server is running on port ${PORT}`);
});
  