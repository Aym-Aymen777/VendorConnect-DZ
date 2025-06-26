import express from "express";
import { sendOtp, verifyOtp } from "../controllers/otp.controllers.js";
import { ProtectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/send-otp",ProtectRoute ,sendOtp);
router.post("/verify-otp",ProtectRoute ,verifyOtp);

export const otpRoutes = router;
