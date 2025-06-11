import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    role:{ type: String, enum: ["consumer","supplier", "admin"], default: "consumer" },
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50,
    },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    phoneVerified: { type: Boolean, default: false },
    password: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    socialLogin: { type: Boolean, default: false },
    languagePreference: { type: String, default: "en" },
    country: { type: String, default: "US" },
    subscriptions: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Subscription" },
    ],
    profile: {
      avatar: { type: String },
      bio: { type: String },
      socialLinks: [{ type: String }],
      address: { type: String },
      location: { lat: { type: Number }, lng: { type: Number } },
      products: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
      ],
    },
    coinsBalance: { type: Number, default: 0 },
    documents: [
      {
        type: String, // URLs to documents like ID, business license, etc.
      },
    ],
    notifications: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Notification",
      },
    ],
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
