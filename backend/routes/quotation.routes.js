import express from "express"
import { createQuotation, getQuotation, getQuotations, updateQuotation, deleteQuotation } from "../controllers/quotation.controllers.js";
import { ProtectRoute } from "../middleware/auth.middleware.js";
import { isSupplier } from "../middleware/isSupplier.middleware.js";
import { isConsumer } from "../middleware/isConsumer.middleware.js";


const router = express.Router();
router.post("/create",ProtectRoute,isConsumer,createQuotation);
router.get("/details/:id",ProtectRoute, getQuotation);
router.get("/quotations",ProtectRoute, getQuotations);
router.put("/update/:id",ProtectRoute, isSupplier, updateQuotation);
router.delete("/delete/:id",ProtectRoute,isSupplier, deleteQuotation);

export const quotationRoutes = router;
