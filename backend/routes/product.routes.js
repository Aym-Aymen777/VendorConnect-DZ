import express from "express";
import {
  addProduct,
  getProducts,
  getProductDetails,
  updateProduct,
  deleteProduct,
  getMyProducts,
  getMyProductDetails,
} from "../controllers/product.controllers.js";
import { ProtectRoute } from "../middleware/auth.middleware.js";
import { isSupplier } from "../middleware/isSupplier.middleware.js";
import multer from "multer";
const upload = multer({ dest: "uploads/" }); // يمكنك استخدام cloudinary لاحقًا

const router = express.Router();

router.get("/all", ProtectRoute, getProducts);
router.get("/product/:id", ProtectRoute, getProductDetails);

router.post("/add", ProtectRoute, isSupplier, addProduct);
router.put("/update/:id", ProtectRoute, isSupplier,upload.array("media"), updateProduct);
router.delete("/delete/:id", ProtectRoute, isSupplier, deleteProduct);
router.get("/my-products", ProtectRoute, isSupplier, getMyProducts);
router.get("/my-product/:id", ProtectRoute, isSupplier, getMyProductDetails);

export const productRoutes = router;
