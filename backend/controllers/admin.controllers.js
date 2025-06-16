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

export const getUserDetails = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user details:", error.message);
    res.status(500).json({ message: "Failed to fetch user details" });
  }
};

export const getAllSuppliers = async (req, res) => {
  try {
    const suppliers = await User.find({ role: "supplier" }).select("-password");
    res.status(200).json(suppliers);
  } catch (error) {
    console.error("Error fetching suppliers:", error.message);
    res.status(500).json({ message: "Failed to fetch suppliers" });
  }
};

export const getAllConsumers = async (req, res) => {
  try {
    const consumers = await User.find({ role: "consumer" }).select("-password");
    res.status(200).json(consumers);
  } catch (error) {
    console.error("Error fetching consumers:", error.message);
    res.status(500).json({ message: "Failed to fetch consumers" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error.message);
    res.status(500).json({ message: "Failed to delete user" });
  }
};

export const blockUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    user.isBlocked = !user.isBlocked;
    await user.save();
    res.status(200).json({ message: "User blocked successfully" });
  } catch (error) {
    console.error("Error blocking user:", error.message);
    res.status(500).json({ message: "Failed to block user" });
  }
};

export const unblockUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    user.isBlocked = !user.isBlocked;
    await user.save();
    res.status(200).json({ message: "User unblocked successfully" });
  } catch (error) {
    console.error("Error unblocking user:", error.message);
    res.status(500).json({ message: "Failed to unblock user" });
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

export const getProductDetails = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      "supplier",
      "name email"
    );
    res.status(200).json(product);
  } catch (error) {
    console.error("Error fetching product details:", error.message);
    res.status(500).json({ message: "Failed to fetch product details" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error.message);
    res.status(500).json({ message: "Failed to delete product" });
  }
};

export const featureProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    product.isFeatured = true;
    await product.save();
    res.status(200).json({ message: "Product promoted successfully" });
  } catch (error) {
    console.error("Error promoting product:", error.message);
    res.status(500).json({ message: "Failed to promote product" });
  }
}

export const unfeatureProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    product.isFeatured = false;
    await product.save();
    res.status(200).json({ message: "Product demoted successfully" });
  } catch (error) {
    console.error("Error demoting product:", error.message);
    res.status(500).json({ message: "Failed to demote product" });
  }
}

export const promoteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    product.isPromoted = true;
    await product.save();
    res.status(200).json({ message: "Product promoted successfully" });
  } catch (error) {
    console.error("Error promoting product:", error.message);
    res.status(500).json({ message: "Failed to promote product" });
  }
}

export const demoteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    product.isPromoted = false;
    await product.save();
    res.status(200).json({ message: "Product demoted successfully" });
  } catch (error) {
    console.error("Error demoting product:", error.message);
    res.status(500).json({ message: "Failed to demote product" });
  }
}

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
