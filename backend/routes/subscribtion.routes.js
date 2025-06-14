import express from "express";
import {
  getAvailablePlans,
  subscribeToPlan,
  getMySubscriptionDetails,
  updateMySubscription,
} from "../controllers/subscribtion.controllers.js";
import { ProtectRoute } from "../middleware/auth.middleware.js";
import { isSupplier } from "../middleware/isSupplier.middleware.js";

const router = express.Router();

router.get("/plan", ProtectRoute, isSupplier, getAvailablePlans);
router.post("/subscribe", ProtectRoute, isSupplier, subscribeToPlan);
router.get(
  "/my-subscription",
  ProtectRoute,
  isSupplier,
  getMySubscriptionDetails
);
router.put(
  "/update-subscription/:id",
  ProtectRoute,
  isSupplier,
  updateMySubscription
);

export const subscribtionRoutes = router;
