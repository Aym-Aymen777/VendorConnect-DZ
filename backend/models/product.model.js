import mongoose, { Mongoose } from "mongoose";

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
    isFeatured: { type: Boolean, default: false },
    views: { type: Number, default: 0 },
    rating: {
      type: Number,
      default: 0,
    },
    features: [String],
    stock: Number,
    reviews: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        review: String,
      },
    ],
    specifications: [
      {
        key: String,
        value: String,
      },
    ],
    falshDealed:{
      isFlashDealed:Boolean,
      discount:Number,
      startDate:Date,
      endDate:Date
    },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const Product = mongoose.model("Product", productSchema);
