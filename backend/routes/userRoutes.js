import express from "express";
import {
  registerUser,
  allUsers,
  authUser,
  deleteUser,
} from "./../controllers/userControllers.js";
import { protect } from "../middleware/authMiddleware.js";
import { deleteAllUsers } from "../controllers/userControllers.js";

const router = express.Router();

router.route("/register/").post(registerUser);
router.post("/login/", authUser);
router.get("/", protect, allUsers);
router.delete("/delete-all", protect, deleteAllUsers);
router.delete("/:id", protect, deleteUser);

const userRoutes = router;

export default userRoutes;
