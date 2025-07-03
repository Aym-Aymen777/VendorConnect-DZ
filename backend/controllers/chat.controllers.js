import { Chat } from "../models/chat.model.js";
import { User } from "../models/user.model.js";
import mongoose from "mongoose";

export const createOrGetChat = async (req, res) => {
  try {
    const { userId } = req.body; //TODO I don't know yet what to do with this controller exactly let it in UI

    if (!userId)
      return res.status(400).json({ message: "User ID is required" });

    // Check if there are any previous messages
    const existingMessages = await Chat.findOne({
      $or: [
        { sender: req.user._id, receiver: userId },
        { sender: userId, receiver: req.user._id },
      ],
    });

    res.status(200).json({
      chatExists: !!existingMessages,
      userId,
    });
  } catch (error) {
    console.error("createOrGetChat error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const startChat = async (req, res) => {
  const { userId, supplierId } = req.body;

  if (!userId || !supplierId) {
    return res.status(400).json({ message: "connot start the chat" });
  }

  try {
    // Check if a chat already exists
    let chat = await Chat.findOne({
      $or: [
        { sender: userId, receiver: supplierId },
        { sender: supplierId, receiver: userId },
      ],
    });

    if (!chat) {
      const newChat = new Chat({
        sender: userId,
        receiver: supplierId,
        messages: [],
      });

      chat = await newChat.save();
    }

    res.status(200).json({ chat });
  } catch (error) {
    console.error("startChat error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getUserChats = async (req, res) => {
  try {
    const userId = req.user._id;

    // Find all chats where the user is either sender or receiver
    const chats = await Chat.find({
      $or: [{ sender: userId }, { receiver: userId }],
    })
      .sort({ updatedAt: -1 }) // Most recent chats first
      .populate([
        { path: "sender", select: "name username profile.avatar" },
        { path: "receiver", select: "name username profile.avatar" },
        { path: "messages.sender", select: "name username profile.avatar" },
      ]);

    // For each chat, get the latest message (if any)
    const chatsWithLatest = chats.map((chat) => {
      const latestMessage =
        chat.messages.length > 0
          ? chat.messages[chat.messages.length - 1]
          : null;
      return {
        _id: chat._id,
        sender: chat.sender,
        receiver: chat.receiver,
        latestMessage: latestMessage,
        seen: chat.seen,
        pinned: chat.pinned,
        type: chat.type,
        createdAt: chat.createdAt,
        updatedAt: chat.updatedAt,
      };
    });

    res.status(200).json({ chats: chatsWithLatest });
  } catch (error) {
    console.error("getUserChats error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getChatMessages = async (req, res) => {
  try {
    const chatId = req.params.id;

    const chat = await Chat.findById(chatId).populate([
      { path: "sender", select: "name username profile.avatar" },
      { path: "receiver", select: "name username profile.avatar" },
      { path: "messages.sender", select: "name username profile.avatar" },
    ]);

    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    res.status(200).json({
      sender: chat.sender,
      receiver: chat.receiver,
      messages: chat.messages,
    });
  } catch (error) {
    console.error("getChatMessages error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { chatId, receiverId, type = "supplier", message } = req.body;
    const senderId = req.user._id; // From authentication middleware

    // Validate input
    if (!message || message.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: "Message content is required"
      });
    }

    if (message.length > 5000) {
      return res.status(400).json({
        success: false,
        message: "Message too long (max 5000 characters)"
      });
    }

    // Validate MongoDB ObjectIds
    if (!mongoose.Types.ObjectId.isValid(senderId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid sender ID"
      });
    }

    if (!mongoose.Types.ObjectId.isValid(receiverId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid receiver ID"
      });
    }

    // Prevent sending message to self
    if (senderId.toString() === receiverId.toString()) {
      return res.status(400).json({
        success: false,
        message: "Cannot send message to yourself"
      });
    }

    // Verify receiver exists
    const receiver = await User.findById(receiverId);
    if (!receiver) {
      return res.status(404).json({
        success: false,
        message: "Receiver not found"
      });
    }

    let chat;

    // If chatId is provided, find and validate the existing chat
    if (chatId) {
      if (!mongoose.Types.ObjectId.isValid(chatId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid chat ID"
        });
      }

      chat = await Chat.findById(chatId)
        .populate("sender", "name username email profile")
        .populate("receiver", "name username email profile");

      if (!chat) {
        return res.status(404).json({
          success: false,
          message: "Chat not found"
        });
      }

      // Verify that the current user is a participant in this chat
      const isParticipant = 
        chat.sender._id.toString() === senderId.toString() ||
        chat.receiver._id.toString() === senderId.toString();

      if (!isParticipant) {
        return res.status(403).json({
          success: false,
          message: "You are not authorized to send messages in this chat"
        });
      }

      // Verify that the receiverId matches the other participant
      const otherParticipant = 
        chat.sender._id.toString() === senderId.toString() 
          ? chat.receiver._id.toString()
          : chat.sender._id.toString();

      if (otherParticipant !== receiverId.toString()) {
        return res.status(400).json({
          success: false,
          message: "Receiver ID does not match chat participants"
        });
      }
    } else {
      // If no chatId provided, find existing chat or create new one
      chat = await Chat.findOne({
        $or: [
          { sender: senderId, receiver: receiverId },
          { sender: receiverId, receiver: senderId }
        ]
      }).populate("sender", "name username email profile")
        .populate("receiver", "name username email profile");

      if (!chat) {
        // Create new chat
        chat = new Chat({
          sender: senderId,
          receiver: receiverId,
          messages: [],
          type: type,
          seen: false,
          pinned: false
        });
        
        await chat.save();
        
        // Populate the new chat
        chat = await Chat.findById(chat._id)
          .populate("sender", "name username email profile")
          .populate("receiver", "name username email profile");
      }
    }

    // Create new message
    const newMessage = {
      id: new mongoose.Types.ObjectId(),
      sender: senderId,
      message: message.trim(),
      createdAt: new Date(),
      seen: false
    };

    // Add message to chat
    chat.messages.push(newMessage);
    chat.seen = false; // Mark chat as unread
    chat.updatedAt = new Date();

    await chat.save();

    // Populate the sender info for the new message
    const populatedMessage = await Chat.findById(chat._id)
      .populate("messages.sender", "name username email profile")
      .select("messages");

    const savedMessage = populatedMessage.messages[populatedMessage.messages.length - 1];

    // Return response
    res.status(200).json({
      success: true,
      message: "Message sent successfully",
      data: {
        chatId: chat._id,
        newMessage: {
          _id: savedMessage.id,
          sender: savedMessage.sender,
          message: savedMessage.message,
          createdAt: savedMessage.createdAt,
          seen: savedMessage.seen
        },
        chat: {
          _id: chat._id,
          sender: chat.sender,
          receiver: chat.receiver,
          type: chat.type,
          seen: chat.seen,
          pinned: chat.pinned,
          messagesCount: chat.messages.length,
          lastMessage: {
            message: savedMessage.message,
            createdAt: savedMessage.createdAt,
            sender: savedMessage.sender.name || savedMessage.sender.username
          }
        }
      }
    });

  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({
      success: false,
      message: "Failed to send message"
    });
  }
};
