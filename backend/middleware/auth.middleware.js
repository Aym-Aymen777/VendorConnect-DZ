import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { envVars } from "../utils/envVars.js";

export const ProtectRoute = async (req, res, next) => {
  try {
    const token = req.cookies["jwt-Deadecor"];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - No Token Provided",
      });
    }

    const decoded = jwt.verify(token, envVars.jwtSecret);
    if (!decoded || !decoded.id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - Invalid Token Payload",
      });
    }

    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Error in ProtectRoute middleware:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
