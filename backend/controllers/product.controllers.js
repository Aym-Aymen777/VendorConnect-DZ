import { Product } from "../models/product.model.js";
import { User } from "../models/user.model.js";
import cloudinary from "../config/cloudinary.js";
import isSuspiciousProduct from "../utils/suspiciousProduct.js";
import { deleteFromCloudinary } from "../utils/deleteFromCloudinary.js";
import { uploadToCloudinary } from "../utils/uploadToCloudinary.js";

export const getProducts = async (req, res) => {
  try {
    const { page = 1, limit = 12, category, country, search } = req.query;

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
      Product.countDocuments(query),
    ]);

    res.status(200).json({
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      products,
    });
  } catch (error) {
    console.error("Homepage product fetch error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getProductDetails = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const supplierId = product.supplier;
    const productOwner = await User.findById(supplierId).populate(
      "supplierProfile"
    );

    product.supplier = productOwner;

    res.status(200).json(product);
  } catch (error) {
    console.log("error in get product details controller : ", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const addProduct = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      category,
      country,
      features,
      stock,
      specifications,
    } = req.body;

    // Validate required fields
    if (!title || !description || !price || !category || !country) {
      return res
        .status(400)
        .json({ message: "All required fields must be provided" });
    }

    // Validate price is a positive number
    if (isNaN(price) || price <= 0) {
      return res
        .status(400)
        .json({ message: "Price must be a positive number" });
    }

    // Validate stock if provided
    if (stock !== undefined && (isNaN(stock) || stock < 0)) {
      return res
        .status(400)
        .json({ message: "Stock must be a non-negative number" });
    }

    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Validate media files
    if (!req.files || req.files.length === 0) {
      return res
        .status(400)
        .json({ message: "At least one image or video is required" });
    }

    if (req.files.length > 5) {
      return res
        .status(400)
        .json({ message: "Maximum of 5 media files allowed" });
    }

    // Upload to Cloudinary using buffer (for memoryStorage)
    const uploadedMedia = await Promise.all(
      req.files.map(
        (file) =>
          new Promise((resolve, reject) => {
            cloudinary.uploader
              .upload_stream(
                {
                  folder: "products",
                  resource_type: "auto",
                  transformation: [{ fetch_format: "auto", quality: "auto" }],
                },
                (error, result) => {
                  if (error) return reject(error);
                  resolve({
                    type: result.resource_type,
                    url: result.secure_url,
                  });
                }
              )
              .end(file.buffer); // Use buffer, not path
          })
      )
    );

    // Optional suspicious product check
    const combinedMediaUrl = uploadedMedia.map((item) => item.url);
    if (
      isSuspiciousProduct({
        title,
        description,
        imageUrl: combinedMediaUrl,
      })
    ) {
      return res.status(400).json({
        message:
          "Suspicious product detected. Please review our terms before adding products.",
      });
    }

    // Parse features array if provided as string
    let parsedFeatures = [];
    if (features) {
      try {
        parsedFeatures = Array.isArray(features)
          ? features
          : JSON.parse(features);
      } catch (error) {
        return res.status(400).json({ message: "Invalid features format" });
      }
    }

    // Parse specifications array if provided as string
    let parsedSpecifications = [];
    if (specifications) {
      try {
        parsedSpecifications = Array.isArray(specifications)
          ? specifications
          : JSON.parse(specifications);

        // Validate specifications format
        const isValidSpecs = parsedSpecifications.every(
          (spec) =>
            spec.key &&
            spec.value &&
            typeof spec.key === "string" &&
            typeof spec.value === "string"
        );

        if (!isValidSpecs) {
          return res.status(400).json({
            message:
              "Specifications must be an array of objects with 'key' and 'value' properties",
          });
        }
      } catch (error) {
        return res
          .status(400)
          .json({ message: "Invalid specifications format" });
      }
    }

    // Create product with all schema fields
    const productData = {
      supplier: req.user._id,
      title,
      description,
      price: Number(price),
      category,
      country,
      media: uploadedMedia,
      // Optional fields with defaults from schema
      isPromoted: false,
      isFeatured: false,
      views: 0,
      rating: 0,
      reviews: [],
    };

    // Add optional fields if provided
    if (parsedFeatures.length > 0) {
      productData.features = parsedFeatures;
    }

    if (stock !== undefined) {
      productData.stock = Number(stock);
    }

    if (parsedSpecifications.length > 0) {
      productData.specifications = parsedSpecifications;
    }

    const product = await Product.create(productData);
    const user = await User.findById(req.user._id);
    user.profile.products.push(product._id);
    await user.save();
    res.status(201).json({
      message: "Product added successfully",
      product,
    });
  } catch (error) {
    console.error("error in add product controller:", error.message);
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
    const {
      title,
      description,
      price,
      category,
      country,
      stock,
      features,
      specifications,
      flashDeals,
      existingMedia,
      removedMedia,
    } = req.body;

    const productId = req.params.id;
    const newMediaFiles = req.files;

    if (!productId) {
      return res.status(400).json({ message: "Product ID is required." });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    if (product.supplier.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Unauthorized to update this product." });
    }

    // Safe parse helper
    const safeParse = (data, fallback) => {
      try {
        return typeof data === "string" ? JSON.parse(data) : data;
      } catch {
        return fallback;
      }
    };

    const parsedFeatures = safeParse(features, []);
    const parsedSpecs = safeParse(specifications, []);
    const parsedFlashDeals = safeParse(flashDeals, {});
    let parsedExistingMedia = safeParse(existingMedia, []);
    const parsedRemovedMedia = safeParse(removedMedia, []);

    if (!Array.isArray(parsedExistingMedia)) parsedExistingMedia = [];

    // Update product fields
    if (title) product.title = title;
    if (description) product.description = description;
    if (price) product.price = parseFloat(price);
    if (category) product.category = category;
    if (country) product.country = country;
    if (stock !== undefined) {
      product.stock = stock === "" ? undefined : parseInt(stock);
    }

    product.features = parsedFeatures;
    product.specifications = parsedSpecs;

    if (parsedFlashDeals.isActive) {
      product.flashDeals = {
        isActive: true,
        discount: parseFloat(parsedFlashDeals.discount) || 0,
        discountPrice:
          product.price - (product.price * parsedFlashDeals.discount) / 100,
        startDate: new Date(parsedFlashDeals.startDate),
        endDate: new Date(parsedFlashDeals.endDate),
      };
    } else {
      product.flashDeals = {
        isActive: false,
        discount: 0,
        startDate: null,
        endDate: null,
      };
    }

    // 🔥 Remove deleted media from Cloudinary
    if (Array.isArray(parsedRemovedMedia) && parsedRemovedMedia.length > 0) {
      for (const mediaUrl of parsedRemovedMedia) {
        try {
          const isVideo =
            mediaUrl.includes(".mp4") ||
            mediaUrl.includes(".mov") ||
            mediaUrl.includes(".avi");
          const resourceType = isVideo ? "video" : "image";
          await deleteFromCloudinary(mediaUrl, resourceType);
        } catch (err) {
          console.error(
            `❌ Failed to delete from Cloudinary: ${mediaUrl}`,
            err
          );
        }
      }
    }

    // 🖼 Upload new media
    let newUploadedMedia = [];
    if (Array.isArray(newMediaFiles) && newMediaFiles.length > 0) {
      try {
        newUploadedMedia = await Promise.all(
          newMediaFiles.map(async (file) => {
            const url = await uploadToCloudinary(file, "products");
            const isVideo = file.mimetype.startsWith("video");
            return {
              type: isVideo ? "video" : "image",
              url,
            };
          })
        );
      } catch (err) {
        console.error("❌ Cloudinary upload error:", err);
        return res
          .status(500)
          .json({ message: "Failed to upload media files" });
      }
    }

    // Combine existing and new media
    const existingMediaObjects = parsedExistingMedia.map((item) => {
      if (typeof item === "object" && item.url) return item;
      const isVideo =
        item.includes(".mp4") || item.includes(".mov") || item.includes(".avi");
      return {
        type: isVideo ? "video" : "image",
        url: item,
      };
    });

    const mergedMedia = [...existingMediaObjects, ...newUploadedMedia];
    if (mergedMedia.length > 5) {
      return res
        .status(400)
        .json({ message: "Maximum of 5 media files allowed." });
    }

    product.media = mergedMedia;

    await product.save();

    return res.status(200).json({
      success: true,
      message: "✅ Product updated successfully.",
      data: product,
    });
  } catch (error) {
    console.error("❌ updateProduct failed:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
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
    const products = await Product.find({ supplier: req.user._id }).sort({
      createdAt: -1,
    });

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
      return res
        .status(404)
        .json({ message: "Product not found or not authorized" });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error("getMyProductDetails error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const toggleProductInWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const index = user.wishlist.indexOf(productId);
    let action = "";

    if (index !== -1) {
      user.wishlist.splice(index, 1);
      action = "removed";
    } else {
      user.wishlist.push(productId);
      action = "added";
    }

    await user.save();

    res.status(200).json({ message: `Product ${action} to wishlist` });
  } catch (error) {
    console.error("toggleProductInWishlist error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Toggle product in cart
export const toggleProductInCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const index = user.cart.indexOf(productId);
    let action = "";

    if (index !== -1) {
      user.cart.splice(index, 1);
      action = "removed";
    } else {
      user.cart.push(productId);
      action = "added";
    }

    await user.save();

    res.status(200).json({ message: `Product ${action} to cart` });
  } catch (error) {
    console.error("toggleProductInCart error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get products from wishlist and cart
export const getCartAndWishlistProducts = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const [wishlistProducts, cartProducts] = await Promise.all([
      Product.find({ _id: { $in: user.wishlist } }),
      Product.find({ _id: { $in: user.cart } }),
    ]);

    res.status(200).json({ wishlistProducts, cartProducts });
  } catch (error) {
    console.error("getCartAndWishlistProducts error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};