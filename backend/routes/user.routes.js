import express from 'express';
import { getUserProfile, updateUserProfile } from '../controllers/user.controllers.js';
import { ProtectRoute } from '../middleware/auth.middleware.js';



const router = express.Router();

router.get("/me", ProtectRoute, getUserProfile);
router.put("/update", ProtectRoute, updateUserProfile);
router.get("/:id", ProtectRoute, getSupplierProfile);

export const userRoutes = router;

