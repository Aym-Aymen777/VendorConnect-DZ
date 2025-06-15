import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
 {
  supplier: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  country: { type: String, required: true },
 media: [
    {
      type: {
        type: String, // e.g., 'image' or 'video'
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  isPromoted: { type: Boolean, default: false },
  views: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
},
  { timestamps: true }
);

export const Product = mongoose.model("Product", productSchema);