import express from "express";
import multer from "multer";
import {
  getUserProfile,
  updateUserProfile,
  getSupplierProfile,
  submitDocsAndBecomeSupplier,
  updateUserStore,
  deleteGalleryImage,
  clearGallery,
} from "../controllers/user.controllers.js";
import { ProtectRoute } from "../middleware/auth.middleware.js";
import { isSupplier } from "../middleware/isSupplier.middleware.js";

const router = express.Router();

// Configure multer for file uploads
const storage = multer.memoryStorage(); // Store files in memory for Cloudinary upload

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB per file
    files: 15 // Maximum 15 files total
  },
  fileFilter: (req, file, cb) => {
    // Allow images and videos
    if (file.fieldname === 'profileVideo') {
      // Video validation
      if (file.mimetype.startsWith('video/')) {
        cb(null, true);
      } else {
        cb(new Error('Profile video must be a video file'), false);
      }
    } else {
      // Image validation for logo, coverImage, and gallery
      if (file.mimetype.startsWith('image/')) {
        cb(null, true);
      } else {
        cb(new Error('Only image files are allowed for this field'), false);
      }
    }
  }
});

// Define the multer fields configuration
const uploadFields = upload.fields([
  { name: 'logo', maxCount: 1 },
  { name: 'coverImage', maxCount: 1 },
  { name: 'profileVideo', maxCount: 1 },
  { name: 'gallery', maxCount: 10 }
]);

// Regular routes
router.get("/me", ProtectRoute, getUserProfile);
router.put("/update", ProtectRoute, updateUserProfile);
router.get("/supplier/:id", ProtectRoute, getSupplierProfile);

router.post("/documents", ProtectRoute, submitDocsAndBecomeSupplier);

// Supplier routes with file upload support
router.put(
  "/update-user-store", 
  ProtectRoute, 
  isSupplier, 
  uploadFields,  // Add multer middleware here
  updateUserStore
);

router.delete("/delete-gallery-image", ProtectRoute, isSupplier, deleteGalleryImage);
router.delete("/clear-gallery", ProtectRoute, isSupplier, clearGallery);

export const userRoutes = router;