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
    phone: { type: String, //required: true,
     //unique: true
     },
    phoneVerified: { type: Boolean, default: false },
    password: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    isBlocked: { type: Boolean, default: false },
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
    supplierProfile: {
  companyName: { type: String, required: true },
  businessType: { type: String, enum: ['store', 'workshop', 'supplier'], required: true },
  industry: String,
  description: String,
  address: String,
  city: String,
  country: String,
  phone: String,
  website: String,
  logoUrl: { type: String, default: '/default.png' },
  coverImageUrl: String,
  socialLinks: {
    facebook: String,
    instagram: String,
    linkedin: String,
    whatsapp: String,
    tiktok: String
  },
  gallery: [String],
  profileVideoUrl: String,
  locationMap: String,
  documents: {
    identityDocumentUrl: String,
    businessLicenseUrl: String,
    resumeOrPortfolioUrl: String,
  },
  subscription: {
    plan: { type: String, default: 'basic' },
    isSubscribed: Boolean,
    expiryDate: Date
  },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
}

  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
