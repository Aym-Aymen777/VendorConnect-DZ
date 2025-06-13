import express from "express";
import { ProtectRoute } from "../middleware/auth.middleware.js";
import { isSupplier } from "../middleware/isSupplier.middleware.js";
import { promoteProduct, getMyPromotedProducts } from "../controllers/ad.controllers.js";

const router = express.Router();

router.post("/promote/:id", ProtectRoute, isSupplier,promoteProduct);
router.get("/my-promoted", ProtectRoute, isSupplier, getMyPromotedProducts);

export const adRoutes = router;