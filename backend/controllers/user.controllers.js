import bcrypt from "bcryptjs";
import { User } from "../models/user.model.js";
import { SupplierRequest } from "../models/request.model.js";
import  cloudinary  from "../config/cloudinary.js";
import { envVars } from "../utils/envVars.js";




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
  const { name, email , currentPassword,newPassword,profile,phone,username,dateOfBirth} = req.body;
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if(username){
        const existingUsername = await User.findOne({ username });
        if (existingUsername && existingUsername._id.toString() !== user._id.toString()) {
            return res.status(400).json({ message: "Username already exists" });
        }
        user.username = username;
    }
    if(dateOfBirth){
        user.dateOfBirth = dateOfBirth;
    }
    user.name = name || user.name;
    user.profile = profile || user.profile;
    if (profile && profile.avatar) {
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
        if (existingPhone && existingPhone._id.toString() !== user._id.toString()) {
            return res.status(400).json({ message: "Phone number already exists" });
        }
        user.phone = phone;
        user.phoneVerified = false;
    }
    if (email){
        const existingEmail = await User.findOne({ email });
        if (existingEmail && existingEmail._id.toString() !== user._id.toString()) {
            return res.status(400).json({ message: "Email already exists" });
        }
        user.email = email;
    }

    if (currentPassword && newPassword) {
      const isPasswordMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isPasswordMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(newPassword, salt);
    }
    await user.save();
    return res.status(200).json({ message: "Profile updated successfully", user });
  } catch (error) {
    console.error("Error updating user profile controller:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


export const getSupplierProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('name profile role');

    if (!user || user.role !== 'supplier') {
      return res.status(404).json({ message: 'Supplier not found' });
    }

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};


export const submitDocsAndBecomeSupplier = async (req, res) => {
  try {
    const { supplierProfile } = req.body;

    if (!supplierProfile || !supplierProfile.documents) {
      return res.status(400).json({ message: "Missing supplier profile or documents" });
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
      return res.status(400).json({ message: "All required documents must be uploaded" });
    }

    // تحديث المستخدم
    user.supplierProfile =  {
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

    return res.status(200).json({ message: "Documents submitted successfully" });

  } catch (error) {
    console.error("Error submitting user documents controller:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};