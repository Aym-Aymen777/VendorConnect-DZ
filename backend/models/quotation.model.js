import mongoose from "mongoose";

const quotationSchema = new mongoose.Schema(
    {
  consumer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  message: { type: String, required: true },
  status: { type: String, enum: ['pending', 'confirmed','processing','shipped','delivered', 'cancelled'], default: 'pending' },
},

  { timestamps: true }
);

export const Quotation = mongoose.model("Quotation", quotationSchema);