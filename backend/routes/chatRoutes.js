import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { createChat, readChat } from "../controllers/chatController.js";

const router = express.Router();
router.post("/", protect, createChat);
router.get("/", protect, readChat);
// router.post("/group", protect, createGroupChat);
// router.put("/rename", protect, renameGroupChat);
// router.put("/groupremove", protect, removeFromGroup);
// router.put("/groupadd", protect, addToGroup);

export const chatRoutes = router;
