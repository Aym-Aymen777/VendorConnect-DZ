import mongoose from "mongoose";

const requestSchema = new mongoose.Schema(
 {
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  status: { type: String, enum: ['pending', 'responded', 'closed'], default: 'pending' },
  createdAt: { type: Date, default: Date.now },
   adminResponse: {
    responderId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Admin user
    notes: String,
    respondedAt: Date
  }
},

  { timestamps: true }
);

export const SupplierRequest = mongoose.model("SupplierRequest", requestSchema);