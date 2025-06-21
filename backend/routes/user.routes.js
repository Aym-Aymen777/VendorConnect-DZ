import express from 'express';
import { getUserProfile, updateUserProfile , getSupplierProfile,submitDocsAndBecomeSupplier} from '../controllers/user.controllers.js';
import { ProtectRoute } from '../middleware/auth.middleware.js';
import { isSupplier } from '../middleware/isSupplier.middleware.js';



const router = express.Router();

router.get("/me", ProtectRoute, getUserProfile);
router.put("/update", ProtectRoute, updateUserProfile);
router.get("/supplier/:id", ProtectRoute, getSupplierProfile);

router.post("/documents", ProtectRoute,submitDocsAndBecomeSupplier);

//TODO add supplier routes



export const userRoutes = router;

