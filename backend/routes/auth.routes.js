import express from "express";
import {
  registerUser,
  loginUser,
  googleLogin,
  googleSignup,
  logoutUser,
} from "../controllers/auth.controllers.js";
import { ProtectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/social-login", googleLogin);
router.post("/social-signup", googleSignup);
router.post("/logout", ProtectRoute, logoutUser);
router.get("/authCheck", ProtectRoute, (req, res) => {
  res.status(200).json({ message: "User is authenticated" });
});

export const authRoutes = router;
