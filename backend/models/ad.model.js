import mongoose from "mongoose";

const adSchema = new mongoose.Schema(
 {
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  location: { type: String, enum: ['homepage', 'searchPage'], default: 'homepage' },
  startsAt: { type: Date, default: Date.now },
  endsAt: { type: Date },
  status: { type: String, enum: ['active', 'expired'], default: 'active' }
},

  { timestamps: true }
);

export const Ad = mongoose.model("Ad", adSchema);