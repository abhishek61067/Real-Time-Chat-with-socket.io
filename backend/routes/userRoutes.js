import express from "express";
import {
  registerUser,
  allUsers,
  authUser,
} from "./../controllers/userControllers.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.route("/register/").post(registerUser);
router.post("/login/", authUser);
router.get("/", protect, allUsers);

const userRoutes = router;

export default userRoutes;
