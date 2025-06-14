import { Subscription } from "../models/subscription.model.js";
import { User } from "../models/user.model.js";

// Sample available plans
const availablePlans = [
  { name: "Basic", price: 0, duration: 7 },      // days
  { name: "Standard", price: 9.99, duration: 30 },
  { name: "Premium", price: 19.99, duration: 90 },
];


// GET /plan
export const getAvailablePlans = async (req, res) => {
  try {
    res.status(200).json({ plans: availablePlans });
  } catch (error) {
    console.error("Error in getAvailablePlans:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// POST /subscribe
export const subscribeToPlan = async (req, res) => {
  try {
    const { planName } = req.body;
    const plan = availablePlans.find(p => p.name === planName);

    if (!plan) {
      return res.status(400).json({ message: "Invalid subscription plan" });
    }

    const startsAt = new Date();
    const endsAt = new Date(startsAt.getTime() + plan.duration * 24 * 60 * 60 * 1000);

    const subscription = await Subscription.create({
      user: req.user._id,
      planName: plan.name,
      price: plan.price,
      startsAt,
      endsAt,
      status: "active"
    });

    // Optionally link to user's account
    await User.findByIdAndUpdate(req.user._id, {
      subscription: subscription._id
    });

    res.status(201).json({
      message: "Subscribed successfully",
      subscription
    });
  } catch (error) {
    console.error("Error in subscribeToPlan:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// GET /my-subscription
export const getMySubscriptionDetails = async (req, res) => {
  try {
    const subscription = await Subscription.findOne({ user: req.user._id });

    if (!subscription) {
      return res.status(404).json({ message: "No subscription found" });
    }

    res.status(200).json({ subscription });
  } catch (error) {
    console.error("Error in getMySubscriptionDetails:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// PUT /update-subscription/:id
export const updateMySubscription = async (req, res) => {
  try {
    const { id } = req.params;
    const { planName } = req.body;

    const plan = availablePlans.find(p => p.name === planName);
    if (!plan) {
      return res.status(400).json({ message: "Invalid plan" });
    }

    const subscription = await Subscription.findById(id);
    if (!subscription) {
      return res.status(404).json({ message: "Subscription not found" });
    }

    if (subscription.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Access denied" });
    }

    const startsAt = new Date();
    const endsAt = new Date(startsAt.getTime() + plan.duration * 24 * 60 * 60 * 1000);

    subscription.planName = plan.name;
    subscription.price = plan.price;
    subscription.startsAt = startsAt;
    subscription.endsAt = endsAt;
    subscription.status = "active";

    await subscription.save();

    res.status(200).json({ message: "Subscription updated", subscription });
  } catch (error) {
    console.error("Error in updateMySubscription:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

