import express from "express";
import {
  addProduct,
  getProducts,
  getProductDetails,
  updateProduct,
  deleteProduct,
  getMyProducts,
  getMyProductDetails,
  toggleProductInWishlist,
  toggleProductInCart,
  getCartAndWishlistProducts,
} from "../controllers/product.controllers.js";
import { ProtectRoute } from "../middleware/auth.middleware.js";
import { isSupplier } from "../middleware/isSupplier.middleware.js";
import multer from "multer";

const upload = multer({ storage: multer.memoryStorage() }); // You can replace with cloudinary or buffer storage later

const router = express.Router();

router.get("/all", ProtectRoute, getProducts);
router.get("/details/:id", ProtectRoute, getProductDetails);

router.post(
  "/add",
  ProtectRoute,
  isSupplier,
  upload.array("media", 5),
  addProduct
);
router.put(
  "/update/:id",
  ProtectRoute,
  isSupplier,
  upload.array("media"),
  updateProduct
);
router.delete("/delete/:id", ProtectRoute, isSupplier, deleteProduct);
router.get("/my-products", ProtectRoute, isSupplier, getMyProducts);
router.get("/my-product/:id", ProtectRoute, isSupplier, getMyProductDetails);
router.post("/add-to-wishlist", ProtectRoute, toggleProductInWishlist);
router.post("/add-to-cart", ProtectRoute, toggleProductInCart);
router.get("/cartOrWishlist", ProtectRoute, getCartAndWishlistProducts);

export const productRoutes = router;
