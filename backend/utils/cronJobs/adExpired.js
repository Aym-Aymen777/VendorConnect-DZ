import cron from "node-cron";
import { Ad } from "../../models/ad.model.js";
import { Product } from "../../models/product.model.js";

export const expireOldAdsJob = () => {
  cron.schedule("0 0 * * *", async () => { // Every midnight
    console.log("🔄 Running ad expiration job...");

    const now = new Date();

    try {
      const expiredAds = await Ad.find({
        endsAt: { $lte: now },
        status: "active"
      });

      for (const ad of expiredAds) {
        ad.status = "expired";
        await ad.save();

        const product = await Product.findById(ad.product);
        if (product && product.isPromoted) {
          product.isPromoted = false;
          await product.save();
        }

        console.log(`🛑 Expired Ad: ${ad._id}, Product demoted.`);
      }
    } catch (err) {
      console.error("❌ Error in ad expiration cron job:", err.message);
    }
  }, {
    timezone: "Africa/Algiers",
  });
};
