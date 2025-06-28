import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: ["consumer", "supplier", "admin"],
      default: "consumer",
    },
    name: {
      type: String,
      trim: true,
      minlength: 2,
      maxlength: 50,
    },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    phone: {
      type: String, //required: true,
      //unique: true
    },
    dateOfBirth: Date,
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    phoneVerified: { type: Boolean, default: false },
    password: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    isBlocked: { type: Boolean, default: false },
    socialLogin: { type: Boolean, default: false },
    languagePreference: { type: String, default: "en" },
    country: { type: String, default: "DZ" },
    subscriptions: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Subscription" },
    ],
    profile: {
      avatar: { type: String },
      bio: { type: String },
      socialLinks: [
        {
          platform: String,
          url: String,
        },
      ],
      address: { type: String },
      location: { lat: { type: Number }, lng: { type: Number } },
      products: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
      ],
      blogs: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Blog",
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
    cart: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    wishlist: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    supplierProfile: {
      companyName: { type: String },
      businessType: { type: String, enum: ["store", "workshop","company"] },
      industry: String,
      description: String,
      address: String,
      city: String,
      country: String,
      phone: String,
      website: String,
      logoUrl: { type: String, default: "/default.png" },
      coverImageUrl: String,
      socialLinks: {
        facebook: String,
        instagram: String,
        linkedin: String,
        whatsapp: String,
        tiktok: String,
      },
      gallery: [String],
      profileVideoUrl: String,
      locationMap: String,
      documents: {
        identityDocumentUrl: String,
        businessLicenseUrl: String,
        resumeOrPortfolioUrl: String,
      },
      isFeatured: { type: Boolean, default: false },
      subscription: {
        plan: { type: String, default: "basic" },
        isSubscribed: Boolean,
        expiryDate: Date,
      },
      status: {
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "pending",
      },
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
