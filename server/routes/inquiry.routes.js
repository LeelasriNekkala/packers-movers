import express from "express";
import {
  createInquiry,
  getAllInquiries,
  deleteInquiry,
} from "../controllers/inquiry.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";

const router = express.Router();

// 👤 PUBLIC — contact form
router.post("/", createInquiry);

// 🛠️ ADMIN — view all
router.get("/", protect, authorizeRoles("admin"), getAllInquiries);

// 🛠️ ADMIN — delete
router.delete("/:id", protect, authorizeRoles("admin"), deleteInquiry);

export default router;
