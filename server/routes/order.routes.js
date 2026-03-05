import express from "express";
import {
  createOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
} from "../controllers/order.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";

const router = express.Router();

// ✅ User routes
router.post("/", protect, createOrder);
router.get("/my", protect, getMyOrders);

// ✅ Admin routes
router.get("/", protect, authorizeRoles("admin"), getAllOrders);
router.put("/:id", protect, authorizeRoles("admin"), updateOrderStatus);

export default router;
