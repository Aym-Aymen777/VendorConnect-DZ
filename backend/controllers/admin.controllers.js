import { User } from "../models/user.model.js";
import { Product } from "../models/product.model.js";
import { Ad } from "../models/ad.model.js";
import { Quotation } from "../models/quotation.model.js";
import { Subscription } from "../models/subscription.model.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error.message);
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("supplier", "name email");
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error.message);
    res.status(500).json({ message: "Failed to fetch products" });
  }
};

export const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalProducts = await Product.countDocuments();
    const totalAds = await Ad.countDocuments({ status: "active" });
    const totalQuotations = await Quotation.countDocuments();
    const totalSubscriptions = await Subscription.countDocuments();

    res.status(200).json({
      totalUsers,
      totalProducts,
      totalAds,
      totalQuotations,
      totalSubscriptions,
    });
  } catch (error) {
    console.error("Error fetching dashboard stats:", error.message);
    res.status(500).json({ message: "Failed to fetch dashboard stats" });
  }
};

export const getAllAds = async (req, res) => {
  try {
    const ads = await Ad.find()
      .populate("product", "title isPromoted")
      .sort({ createdAt: -1 });

    res.status(200).json(ads);
  } catch (error) {
    console.error("Error fetching ads:", error.message);
    res.status(500).json({ message: "Failed to fetch ads" });
  }
};
