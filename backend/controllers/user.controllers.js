import bcrypt from "bcryptjs";
import multer from "multer";
import { User } from "../models/user.model.js";
import { SupplierRequest } from "../models/request.model.js";
import cloudinary from "../config/cloudinary.js";
import { envVars } from "../utils/envVars.js";
import { deleteFromCloudinary } from "../utils/deleteFromCloudinary.js";
import { uploadToCloudinary } from "../utils/uploadToCloudinary.js";

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.error("Error getting user profile controller:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateUserProfile = async (req, res) => {
  const {
    name,
    email,
    country,
    currentPassword,
    newPassword,
    profile,
    phone,
    username,
    dateOfBirth,
  } = req.body;
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (username) {
      const existingUsername = await User.findOne({ username });
      if (
        existingUsername &&
        existingUsername._id.toString() !== user._id.toString()
      ) {
        return res.status(400).json({ message: "Username already exists" });
      }
      user.username = username;
    }
    if (dateOfBirth) {
      user.dateOfBirth = dateOfBirth;
    }
    user.name = name || user.name;
    user.country = country || user.country;
    user.profile = profile || user.profile;
    if (profile && profile.avatar && profile.avatar !== user.profile.avatar) {
      if (user.profile.avatar) {
        await cloudinary.uploader.destroy(
          user.profile.avatar.split("/").pop().split(".")[0]
        );
      }
      const uploadedResponse = await cloudinary.uploader.upload(
        profile.avatar,
        {
          upload_preset: envVars.uploadPreset,
          transformation: [
            { crop: "fill", gravity: "face" },
            { fetch_format: "auto", quality: "auto" },
          ],
        }
      );
      user.profile.avatar = uploadedResponse.secure_url;
    }
    if (phone) {
      const existingPhone = await User.findOne({ phone });
      if (
        existingPhone &&
        existingPhone._id.toString() !== user._id.toString()
      ) {
        return res.status(400).json({ message: "Phone number already exists" });
      }
      user.phone = phone;
      user.phoneVerified = false;
    }
    if (email) {
      const existingEmail = await User.findOne({ email });
      if (
        existingEmail &&
        existingEmail._id.toString() !== user._id.toString()
      ) {
        return res.status(400).json({ message: "Email already exists" });
      }
      user.email = email;
    }

    if (currentPassword && newPassword) {
      const isPasswordMatch = await bcrypt.compare(
        currentPassword,
        user.password
      );
      if (!isPasswordMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(newPassword, salt);
    }
    await user.save();
    return res
      .status(200)
      .json({ message: "Profile updated successfully", user });
  } catch (error) {
    console.error("Error updating user profile controller:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getSupplierProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("name profile role");

    if (!user || user.role !== "supplier") {
      return res.status(404).json({ message: "Supplier not found" });
    }

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateUserStore = async (req, res) => {
  try {
    const {
      companyName,
      businessType,
      industry,
      description,
      address,
      city,
      country,
      phone,
      website,
      locationMap,
    } = req.body;
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let socialLinks = {};
    if (req.body.socialLinks) {
      try {
        socialLinks = JSON.parse(req.body.socialLinks);
      } catch (err) {
        return res.status(400).json({ message: "Invalid social links format" });
      }

      if (socialLinks.facebook)
        user.supplierProfile.socialLinks.facebook = socialLinks.facebook;
      if (socialLinks.instagram)
        user.supplierProfile.socialLinks.instagram = socialLinks.instagram;
      if (socialLinks.linkedin)
        user.supplierProfile.socialLinks.linkedin = socialLinks.linkedin;
      if (socialLinks.whatsapp)
        user.supplierProfile.socialLinks.whatsapp = socialLinks.whatsapp;
      if (socialLinks.tiktok)
        user.supplierProfile.socialLinks.tiktok = socialLinks.tiktok;
    }

    // Initialize supplier profile if it doesn't exist
    if (!user.supplierProfile) {
      user.supplierProfile = {};
    }

    // Handle file uploads
    let logoUrl = user.supplierProfile.logoUrl;
    let coverImageUrl = user.supplierProfile.coverImageUrl;
    let profileVideoUrl = user.supplierProfile.profileVideoUrl;
    let gallery = user.supplierProfile.gallery || [];

    // Handle logo upload
    if (req.files?.logo) {
      try {
        if (logoUrl) {
          await deleteFromCloudinary(logoUrl);
        }
        logoUrl = await uploadToCloudinary(
          req.files.logo[0],
          "company_assets/logos"
        );
      } catch (error) {
        console.error("Logo upload error:", error);
        return res.status(400).json({ message: "Failed to upload logo" });
      }
    }

    // Handle cover image upload
    if (req.files?.coverImage) {
      try {
        if (coverImageUrl) {
          await deleteFromCloudinary(coverImageUrl);
        }
        coverImageUrl = await uploadToCloudinary(
          req.files.coverImage[0],
          "company_assets/covers"
        );
      } catch (error) {
        console.error("Cover image upload error:", error);
        return res
          .status(400)
          .json({ message: "Failed to upload cover image" });
      }
    }

    // Handle profile video upload
    if (req.files?.profileVideo) {
      try {
        if (profileVideoUrl) {
          await deleteFromCloudinary(profileVideoUrl);
        }
        profileVideoUrl = await uploadToCloudinary(
          req.files.profileVideo[0],
          "company_assets/videos"
        );
      } catch (error) {
        console.error("Profile video upload error:", error);
        return res
          .status(400)
          .json({ message: "Failed to upload profile video" });
      }
    }

    // Handle gallery uploads
    if (req.files?.gallery && req.files.gallery.length > 0) {
      try {
        const galleryUploads = [];

        // Upload new gallery images
        for (const file of req.files.gallery) {
          const imageUrl = await uploadToCloudinary(
            file,
            "company_assets/gallery"
          );
          galleryUploads.push(imageUrl);
        }

        // Add new images to existing gallery
        gallery = [...gallery, ...galleryUploads];
      } catch (error) {
        console.error("Gallery upload error:", error);
        return res
          .status(400)
          .json({ message: "Failed to upload gallery images" });
      }
    }

    // Handle gallery deletion (if you want to support removing specific images)
    if (req.body.removeGalleryImages) {
      try {
        const imagesToRemove = JSON.parse(req.body.removeGalleryImages);

        // Delete from Cloudinary
        for (const imageUrl of imagesToRemove) {
          await deleteFromCloudinary(imageUrl);
        }

        // Remove from gallery array
        gallery = gallery.filter((img) => !imagesToRemove.includes(img));
        console.log("Gallery images removed successfully");
      } catch (error) {
        console.error("Gallery deletion error:", error);
        return res
          .status(400)
          .json({ message: "Failed to remove gallery images" });
      }
    }

    if (companyName) user.supplierProfile.companyName = companyName;
    if (businessType && businessType !== "")
      user.supplierProfile.businessType = businessType;
    if (industry) user.supplierProfile.industry = industry;
    if (description) user.supplierProfile.description = description;
    if (address) user.supplierProfile.address = address;
    if (city) user.supplierProfile.city = city;
    if (country) user.supplierProfile.country = country;
    if (phone) user.supplierProfile.phone = phone;
    if (website) user.supplierProfile.website = website;
    if (locationMap) user.supplierProfile.locationMap = locationMap;
    // Always update these as they might be new uploads or existing URLs
    user.supplierProfile.logoUrl = logoUrl;
    user.supplierProfile.coverImageUrl = coverImageUrl;
    user.supplierProfile.profileVideoUrl = profileVideoUrl;
    user.supplierProfile.gallery = gallery;
    user.supplierProfile.socialLinks = socialLinks;

    // Save the user
    await user.save();
    return res.status(200).json({
      message: "Store updated successfully",
      user: {
        ...user.toObject(),
        supplierProfile: {
          ...user.supplierProfile,
          logoUrl,
          coverImageUrl,
          profileVideoUrl,
          gallery,
        },
      },
    });
  } catch (error) {
    console.error("Error updating user store controller:", error);

    // Handle multer errors specifically
    if (error instanceof multer.MulterError) {
      if (error.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({
          message: "File too large. Maximum size is 10MB per file.",
        });
      }
      if (error.code === "LIMIT_FILE_COUNT") {
        return res.status(400).json({
          message: "Too many files. Maximum 15 files allowed.",
        });
      }
    }

    return res.status(500).json({
      message: "Internal server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

export const deleteGalleryImage = async (req, res) => {
  try {
    const { imageUrl } = req.body;

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Remove from Cloudinary
    await deleteFromCloudinary(imageUrl);

    // Remove from gallery array
    user.supplierProfile.gallery = user.supplierProfile.gallery.filter(
      (img) => img !== imageUrl
    );

    await user.save();

    return res.status(200).json({
      message: "Gallery image deleted successfully",
      gallery: user.supplierProfile.gallery,
    });
  } catch (error) {
    console.error("Error deleting gallery image:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Optional: Bulk delete gallery images
export const clearGallery = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Delete all gallery images from Cloudinary
    for (const imageUrl of user.supplierProfile.gallery) {
      await deleteFromCloudinary(imageUrl);
    }

    // Clear gallery array
    user.supplierProfile.gallery = [];
    await user.save();

    return res.status(200).json({
      message: "Gallery cleared successfully",
      gallery: [],
    });
  } catch (error) {
    console.error("Error clearing gallery:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


export const submitDocsAndBecomeSupplier = async (req, res) => {
  try {
    const { supplierProfile } = req.body;

    if (!supplierProfile || !supplierProfile.documents) {
      return res
        .status(400)
        .json({ message: "Missing supplier profile or documents" });
    }

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const uploadedDocs = {};

    // رفع وثيقة الهوية
    if (supplierProfile.documents.identityDocumentUrl) {
      const result = await cloudinary.uploader.upload(
        supplierProfile.documents.identityDocumentUrl,
        {
          upload_preset: envVars.uploadPreset,
          transformation: [{ fetch_format: "auto", quality: "auto" }],
        }
      );
      uploadedDocs.identityDocumentUrl = result.secure_url;
    }

    // رفع رخصة النشاط
    if (supplierProfile.documents.businessLicenseUrl) {
      const result = await cloudinary.uploader.upload(
        supplierProfile.documents.businessLicenseUrl,
        {
          upload_preset: envVars.uploadPreset,
          transformation: [{ fetch_format: "auto", quality: "auto" }],
        }
      );
      uploadedDocs.businessLicenseUrl = result.secure_url;
    }

    // رفع السيرة الذاتية أو البورتفوليو
    if (supplierProfile.documents.resumeOrPortfolioUrl) {
      const result = await cloudinary.uploader.upload(
        supplierProfile.documents.resumeOrPortfolioUrl,
        {
          upload_preset: envVars.uploadPreset,
          transformation: [{ fetch_format: "auto", quality: "auto" }],
        }
      );
      uploadedDocs.resumeOrPortfolioUrl = result.secure_url;
    }

    // التحقق من رفع كل الملفات
    if (
      !uploadedDocs.identityDocumentUrl ||
      !uploadedDocs.businessLicenseUrl ||
      !uploadedDocs.resumeOrPortfolioUrl
    ) {
      return res
        .status(400)
        .json({ message: "All required documents must be uploaded" });
    }

    // تحديث المستخدم
    user.supplierProfile = {
      ...supplierProfile,
      documents: uploadedDocs,
      status: "pending",
      socialLinks: supplierProfile.socialLinks || {
        facebook: "",
        instagram: "",
        linkedin: "",
        whatsapp: "",
        tiktok: "",
      },
      subscription: supplierProfile.subscription || {
        plan: "basic",
        isSubscribed: false,
        expiryDate: null,
      },
    };
    await user.save();

    // إنشاء طلب مورد جديد
    const newSupplierRequest = new SupplierRequest({ user: user._id });
    await newSupplierRequest.save();

    return res
      .status(200)
      .json({ message: "Documents submitted successfully" });
  } catch (error) {
    console.error("Error submitting user documents controller:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
