import express from "express";
import {
  getAllUsers,
  getAllProducts,
  getDashboardStats,
  getAllAds,
} from "../controllers/admin.controllers.js";
import { ProtectRoute } from "../middleware/auth.middleware.js";
import { isAdmin } from "../middleware/isAdmin.middleware.js";

const router = express.Router();

// Admin-protected routes
router.get("/users", ProtectRoute, isAdmin, getAllUsers);
router.get("/products", ProtectRoute, isAdmin, getAllProducts);
router.get("/dashboard", ProtectRoute, isAdmin, getDashboardStats);
router.get("/ads", ProtectRoute, isAdmin, getAllAds);

export const adminRoutes = router;
