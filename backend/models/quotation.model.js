import mongoose from "mongoose";

const quotationSchema = new mongoose.Schema(
    {
  consumer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  message: { type: String, required: true },
  status: { type: String, enum: ['pending', 'responded', 'closed'], default: 'pending' },
  createdAt: { type: Date, default: Date.now }
},

  { timestamps: true }
);

export const Quotation = mongoose.model("Quotation", quotationSchema);