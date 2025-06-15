import express from "express";
import { createOrGetChat, getUserChats, getChatMessages, sendMessage } from "../controllers/chat.controllers.js";
import { ProtectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/chats", ProtectRoute, createOrGetChat);
router.get("/my-chats", ProtectRoute, getUserChats);
router.get("/chat/:id", ProtectRoute, getChatMessages);    
router.post("/send/:id", ProtectRoute, sendMessage);

export const chatRoutes = router;