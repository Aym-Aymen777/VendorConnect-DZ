import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
{
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  message: { type: String, required: true },
  seen: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
},

  { timestamps: true }
);

export const Chat = mongoose.model("Chat", chatSchema);