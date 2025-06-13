import {Product} from "../models/product.model.js";
import cloudinary from "../config/cloudinary.js";



export const getProducts = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 12,
      category,
      country,
      search
    } = req.query;

    const query = {};

    if (category) query.category = category;
    if (country) query.country = country;
    if (search) query.$text = { $search: search };

    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Sort promoted first, then newest
    const sort = { isPromoted: -1, createdAt: -1 };

    const [products, total] = await Promise.all([
      Product.find(query)
        .skip(skip)
        .limit(parseInt(limit))
        .sort(sort)
        .populate("supplier", "name profile"),
      Product.countDocuments(query)
    ]);

    res.status(200).json({
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      products
    });

  } catch (error) {
    console.error("Homepage product fetch error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getProductDetails = async(req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(product);
    } catch (error) {
        console.log("error in get product details controller : ", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const addProduct = async(req, res) => {
    try {
        const {title, description, price, category, country, media} = req.body;
        if (!title || !description || !price || !category || !country || !media) {
            return res.status(400).json({ message: "All fields are required" });
        }
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        if (media.length < 1) {
            return res.status(400).json({ message: "At least one image is required" });
        }

       const uploadedMedia = await Promise.all(
      req.files.map(async (file) => {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: "products",
          resource_type: "auto", // handles image & video
          transformation: [{ fetch_format: "auto", quality: "auto" }],
        });

        return {
          type: result.resource_type, // image or video
          url: result.secure_url,
        };
      })
    );

        if (media.length > 5) {
            return res.status(400).json({ message: "Maximum of 5 images allowed" });
        }


        const product = await Product.create({
            supplier: req.user._id,
            title,
            description,
            price,
            category,
            country,
            media: uploadedMedia
        });
        res.status(201).json({
            message: "Product added successfully",
            product
        });
    } catch (error) {
        console.log("error in add product controller : ", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Helper to extract public ID from Cloudinary URL
const extractPublicId = (url) => {
  try {
    const parts = url.split("/");
    const fileName = parts[parts.length - 1];
    const publicId = fileName.split(".")[0];
    return `products/${publicId}`;
  } catch {
    return null;
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { title, description, price, category, country } = req.body;
    const productId = req.params.id;

    if (!productId) {
      return res.status(400).json({ message: "Product id is required" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // 🔒 Only owner can update
    if (product.supplier.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Forbidden" });
    }

    // ✅ Update product fields
    product.title = title || product.title;
    product.description = description || product.description;
    product.price = price || product.price;
    product.category = category || product.category;
    product.country = country || product.country;

    // 🔄 Update media if new files provided
    if (req.files && req.files.length > 0) {
      // 1. Delete old media
      for (const item of product.media) {
        const publicId = extractPublicId(item.url);
        if (publicId) {
          await cloudinary.uploader.destroy(publicId, {
            resource_type: item.type || "image",
          });
        }
      }

      // 2. Upload new media
      const uploadedMedia = await Promise.all(
        req.files.map(async (file) => {
          const result = await cloudinary.uploader.upload(file.path, {
            folder: "products",
            resource_type: "auto",
            transformation: [{ fetch_format: "auto", quality: "auto" }],
          });
          return {
            type: result.resource_type,
            url: result.secure_url,
          };
        })
      );

      product.media = uploadedMedia;
    }

    await product.save();

    res.status(200).json({
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    console.error("Error in update product controller:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    if (product.supplier.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    // 🔥 Delete media from Cloudinary
    for (const item of product.media) {
      const publicId = extractPublicId(item.url);
      if (publicId) {
        await cloudinary.uploader.destroy(publicId, {
          resource_type: item.type || "image",
        });
      }
    }

    await product.deleteOne();

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error("Delete product error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getMyProducts = async (req, res) => {
  try {
    const products = await Product.find({ supplier: req.user._id }).sort({ createdAt: -1 });

    res.status(200).json(products);
  } catch (error) {
    console.error("getMyProducts error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


export const getMyProductDetails = async (req, res) => {
  try {
    const product = await Product.findOne({
      _id: req.params.id,
      supplier: req.user._id,
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found or not authorized" });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error("getMyProductDetails error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


