import { Chat } from "../models/chat.model.js";
import mongoose from "mongoose";

export const createOrGetChat = async (req, res) => {
  try {
    const { userId } = req.body;   //TODO I don't know yet what to do with this controller exactly let it in UI

    if (!userId) return res.status(400).json({ message: "User ID is required" });

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

export const getUserChats = async (req, res) => {
  try {
    const userId = req.user._id;

    const chats = await Chat.aggregate([
      {
        $match: {
          $or: [
            { sender: new mongoose.Types.ObjectId(userId) },
            { receiver: new mongoose.Types.ObjectId(userId) },
          ],
        },
      },
      { $sort: { createdAt: -1 } },
      {
        $group: {
          _id: {
            $cond: [
              { $gt: ["$sender", "$receiver"] },
              { sender: "$sender", receiver: "$receiver" },
              { sender: "$receiver", receiver: "$sender" },
            ],
          },
          latestMessage: { $first: "$$ROOT" },
        },
      },
      {
        $replaceRoot: { newRoot: "$latestMessage" },
      },
    ]);

    const populatedChats = await Chat.populate(chats, [
      { path: "sender", select: "name profile.avatar" },
      { path: "receiver", select: "name profile.avatar" },
    ]);

    res.status(200).json(populatedChats);
  } catch (error) {
    console.error("getUserChats error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


export const getChatMessages = async (req, res) => {
  try {
    const otherUserId = req.params.id;

    const messages = await Chat.find({
      $or: [
        { sender: req.user._id, receiver: otherUserId },
        { sender: otherUserId, receiver: req.user._id },
      ],
    })
      .sort({ createdAt: 1 })
      .populate("sender", "name profile.avatar")
      .populate("receiver", "name profile.avatar"); //TODO make the unseen messages seen

    res.status(200).json(messages);
  } catch (error) {
    console.error("getChatMessages error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const receiverId = req.params.id;
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ message: "Message content is required" });
    }

    const newMessage = await Chat.create({
      sender: req.user._id,
      receiver: receiverId,
      message,
    });

    const populatedMessage = await newMessage.populate([
      { path: "sender", select: "name profile.avatar" },
      { path: "receiver", select: "name profile.avatar" },
    ]);

    res.status(201).json(populatedMessage);
  } catch (error) {
    console.error("sendMessage error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
