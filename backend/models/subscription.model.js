import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
 {
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  planName: { type: String, required: true },
  price: { type: Number, required: true },
  durationInDays: { type: Number, required: true },
  isActive: { type: Boolean, default: true },
  startedAt: { type: Date, default: Date.now },
  endsAt: { type: Date }
},

  { timestamps: true }
);

export const Subscription = mongoose.model("Subscription", subscriptionSchema);