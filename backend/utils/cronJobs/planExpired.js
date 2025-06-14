import cron from "node-cron";
import { Subscription } from "../../models/subscription.model.js";

// ⏰ Run every day at midnight
export const planExpiredJob = () =>{
cron.schedule("0 0 * * *", async () => {
  try {
    const now = new Date();

    // Find all active subscriptions that have expired
    const expiredSubscriptions = await Subscription.find({
      status: "active",
      endsAt: { $lt: now },
    });
    


    for (const sub of expiredSubscriptions) {
      sub.status = "expired";
      await sub.save();
      await User.findByIdAndUpdate(sub.user, { $unset: { subscription: "" } });
      console.log(`Subscription expired for user ${sub.user}`);
    }

    console.log("Subscription expiration check completed.");
  } catch (error) {
    console.error("Error in subscription cron job:", error.message);
  }
});
}
