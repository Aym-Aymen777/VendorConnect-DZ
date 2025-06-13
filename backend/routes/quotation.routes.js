import express from "express"
import { createQuotation, getQuotation, getQuotations, updateQuotation, deleteQuotation } from "../controllers/quotation.controllers.js";
import { ProtectRoute } from "../middleware/auth.middleware.js";
import { isSupplier } from "../middleware/isSupplier.middleware.js";


const router = express.Router();
router.post("/quotation",ProtectRoute, createQuotation);
router.get("/quotation/:id",ProtectRoute, getQuotation);
router.get("/quotations",ProtectRoute, getQuotations);
router.put("/quotation/:id",ProtectRoute, isSupplier, updateQuotation);
router.delete("/quotation/:id",ProtectRoute,isSupplier, deleteQuotation);

export const quotationRoutes = router;
