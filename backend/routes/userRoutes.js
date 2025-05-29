import express from "express";
import {
  registerUser,
  allUsers,
  authUser,
  deleteUser,
} from "./../controllers/userControllers.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.route("/register/").post(registerUser);
router.post("/login/", authUser);
router.get("/", protect, allUsers);
router.delete("/:id", protect, deleteUser);

const userRoutes = router;

export default userRoutes;
