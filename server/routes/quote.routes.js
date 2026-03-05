import express from "express";
import {
  createQuote,
  getAllQuotes,
  updateQuoteStatus,
} from "../controllers/quote.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";

const router = express.Router();

// ✅ User submits quote
router.post("/", createQuote);

// ✅ Admin routes
router.get("/", protect, authorizeRoles("admin"), getAllQuotes);
router.put("/:id", protect, authorizeRoles("admin"), updateQuoteStatus);

export default router;
