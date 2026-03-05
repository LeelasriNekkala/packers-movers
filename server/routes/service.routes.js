import express from "express";
import {
  addService,
  getServices,
  deleteService,
  updateService,
} from "../controllers/service.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";
import upload from "../middleware/upload.js"; // ✅ ADD THIS

const router = express.Router();

// ================= PUBLIC =================
router.get("/", getServices);

// ================= ADMIN =================
router.post(
  "/",
  protect,
  authorizeRoles("admin"),
  upload.single("image"), // ✅ IMAGE FIELD NAME MUST MATCH FRONTEND
  addService,
);

router.put(
  "/:id",
  protect,
  authorizeRoles("admin"),
  upload.single("image"), // ✅ FOR UPDATE ALSO
  updateService,
);

router.delete("/:id", protect, authorizeRoles("admin"), deleteService);

export default router;
