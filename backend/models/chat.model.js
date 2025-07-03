import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
{
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  messages: [
    {
      id: { type: mongoose.Schema.Types.ObjectId },
      sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      message: { type: String },
      createdAt: { type: Date, default: Date.now },
      seen: { type: Boolean, default: false },
    } 
  ],
  seen: { type: Boolean, default: false },
  pinned: { type: Boolean, default: false },
  type: { type: String, enum: ['support', 'supplier'], default: 'supplier' },
  createdAt: { type: Date, default: Date.now }
},

  { timestamps: true }
);

export const Chat = mongoose.model("Chat", chatSchema);