import express from "express";
import {
  getAllUsers,
  getAllProducts,
  getDashboardStats,
  getAllAds,
  getUserDetails,
  getAllConsumers,
  getAllSuppliers,
  deleteUser,
  blockUser,
  unblockUser,
  featureProduct,
  unfeatureProduct,
  deleteProduct,
  promoteProduct,
  demoteProduct,
  getProductDetails
} from "../controllers/admin.controllers.js";
import { ProtectRoute } from "../middleware/auth.middleware.js";
import { isAdmin } from "../middleware/isAdmin.middleware.js";

const router = express.Router();

// Admin-protected routes


//==== users admin routes
router.get("/users", ProtectRoute, isAdmin, getAllUsers);
router.get("/user/:id", ProtectRoute, isAdmin, getUserDetails);
router.get("/consumers", ProtectRoute, isAdmin, getAllConsumers);
router.get("/suppliers", ProtectRoute, isAdmin, getAllSuppliers);
router.delete("/user/:id", ProtectRoute, isAdmin,deleteUser);
router.put("/user/:id", ProtectRoute, isAdmin,blockUser);
router.put("/user/:id", ProtectRoute, isAdmin,unblockUser);


//=== product admin routes
router.get("/products", ProtectRoute, isAdmin, getAllProducts);
router.get("/product/:id", ProtectRoute, isAdmin, getProductDetails);
router.put("/product/:id", ProtectRoute, isAdmin, featureProduct);
router.put("/product/:id", ProtectRoute, isAdmin,unfeatureProduct);
router.delete("/product/:id", ProtectRoute, isAdmin,deleteProduct);
router.put("/product/:id", ProtectRoute, isAdmin,promoteProduct);
router.put("/product/:id", ProtectRoute, isAdmin,demoteProduct);


//=== dashboard admin routes
router.get("/dashboard", ProtectRoute, isAdmin, getDashboardStats);



//=== ads admin routes
router.get("/ads", ProtectRoute, isAdmin, getAllAds);
//TODO add request routes

export const adminRoutes = router;
