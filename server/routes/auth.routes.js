import express from "express";
import {
  registerUser,
  loginUser,
  getMe,
  logoutUser,
} from "../controllers/auth.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

// register
router.post("/register", registerUser);

// login
router.post("/login", loginUser);

// ✅ get logged-in user
router.get("/me", protect, getMe);

// ✅ logout
router.post("/logout", logoutUser);

export default router;
