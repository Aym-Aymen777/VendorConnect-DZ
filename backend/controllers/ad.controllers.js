import { Product } from "../models/product.model.js";
import { Ad } from "../models/ad.model.js";

export const promoteProduct = async (req, res) => {
  try {
    const { id: productId } = req.params;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    if (product.supplier.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized action" });
    }

    if (product.isPromoted) {
      return res.status(400).json({ message: "Product is already promoted" });
    }

    const now = new Date();
    const sevenDaysLater = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

    // 1. Create Ad
    const ad = await Ad.create({
      product: product._id,
      location: "homepage",
      startsAt: now,
      endsAt: sevenDaysLater,
      status: "active"
    });

    // 2. Update Product
    product.isPromoted = true;
    await product.save();

    res.status(201).json({
      message: "Product promoted successfully",
      ad,
    });
  } catch (error) {
    console.error("❌ Error in promoteProduct:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getMyPromotedProducts = async (req, res) => {
  try {
    const ads = await Ad.find()
      .populate({
        path: "product",
        match: { supplier: req.user._id },
      })
      .exec();

    // Filter out nulls if no product matched the supplier
    const myAds = ads.filter((ad) => ad.product);

    res.status(200).json(myAds);
  } catch (error) {
    console.error("Error fetching promoted products:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
