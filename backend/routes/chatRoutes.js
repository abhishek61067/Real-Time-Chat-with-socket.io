import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  addToGroup,
  createChat,
  createGroupChat,
  readChat,
  removeFromGroup,
  renameGroupChat,
} from "../controllers/chatController.js";

const router = express.Router();
router.post("/", protect, createChat);
router.get("/", protect, readChat);
router.post("/group/", protect, createGroupChat);
router.put("/group/rename", protect, renameGroupChat);
router.put("/group/add", protect, addToGroup);
router.put("/group/remove", protect, removeFromGroup);

export const chatRoutes = router;
