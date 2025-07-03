import express from "express";
import { createOrGetChat, getUserChats, getChatMessages, sendMessage, startChat } from "../controllers/chat.controllers.js";
import { ProtectRoute } from "../middleware/auth.middleware.js";
import { isSupplier } from "../middleware/isSupplier.middleware.js";

const router = express.Router();

router.post("/start", ProtectRoute, startChat);
router.get("/my-chats", ProtectRoute, getUserChats);
router.get("/details/:id", ProtectRoute, getChatMessages);    
router.post("/send", ProtectRoute, sendMessage);

export const chatRoutes = router;