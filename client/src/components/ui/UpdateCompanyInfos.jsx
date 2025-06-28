import React, { useState } from "react";
import {
  Save,
  Upload,
  X,
  Plus,
  MapPin,
  Globe,
  Phone,
  Building2,
  FileText,
  Camera,
  Video,
  Link,
  Loader2,
} from "lucide-react";
import useUserStore from "../../store/UserStore"; // Adjust path as needed


const UpdateCompanyInfos = () => {
  const { updateUserStore, isLoading } = useUserStore();
  const [formData, setFormData] = useState({
    companyName: "",
    businessType: "",
    industry: "",
    description: "",
    address: "",
    city: "",
    country: "",
    phone: "",
    website: "",
    logoFile: null,
    coverImageFile: null,
    socialLinks: {
      facebook: "",
      instagram: "",
      linkedin: "",
      whatsapp: "",
      tiktok: "",
    },
    galleryFiles: [],
    profileVideoFile: null,
    locationMap: "",
  });

  const [activeTab, setActiveTab] = useState("basic");

  const [previewUrls, setPreviewUrls] = useState({
    logo: null,
    coverImage: null,
    gallery: [],
    profileVideo: null,
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };



  const handleFileChange = (field, file) => {
    setFormData((prev) => ({
      ...prev,
      [field]: file,
    }));

    // Create preview URL
    if (file && file.type.startsWith("image/")) {
      const url = URL.createObjectURL(file);
      if (field === "logoFile") {
        setPreviewUrls((prev) => ({ ...prev, logo: url }));
      } else if (field === "coverImageFile") {
        setPreviewUrls((prev) => ({ ...prev, coverImage: url }));
      }
    } else if (file && file.type.startsWith("video/")) {
      const url = URL.createObjectURL(file);
      setPreviewUrls((prev) => ({ ...prev, profileVideo: url }));
    }
  };

  const handleMultipleFilesChange = (files) => {
    const fileArray = Array.from(files);
    const imageFiles = fileArray.filter((file) =>
      file.type.startsWith("image/")
    );

    setFormData((prev) => ({
      ...prev,
      galleryFiles: [...prev.galleryFiles, ...imageFiles],
    }));

    // Create preview URLs for gallery
    const newPreviewUrls = imageFiles.map((file) => URL.createObjectURL(file));
    setPreviewUrls((prev) => ({
      ...prev,
      gallery: [...prev.gallery, ...newPreviewUrls],
    }));
  };

  const handleGalleryRemove = (index) => {
    setFormData((prev) => ({
      ...prev,
      galleryFiles: prev.galleryFiles.filter((_, i) => i !== index),
    }));

    setPreviewUrls((prev) => ({
      ...prev,
      gallery: prev.gallery.filter((_, i) => i !== index),
    }));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleMultipleFilesChange(files);
    }
  };

  const handleSubmit = async () => {
    try {
      // Prepare data for submission
      const storeData = {
        // Text fields
        companyName: formData.companyName,
        businessType: formData.businessType,
        industry: formData.industry,
        description: formData.description,
        address: formData.address,
        city: formData.city,
        country: formData.country,
        phone: formData.phone,
        website: formData.website,
        locationMap: formData.locationMap,
        socialLinks: formData.socialLinks,

        // File fields
        logoFile: formData.logoFile,
        coverImageFile: formData.coverImageFile,
        profileVideoFile: formData.profileVideoFile,
        galleryFiles: formData.galleryFiles,
      };

      await updateUserStore(storeData);
    } catch (error) {
      console.error("Error updating store:", error);
    }
  };

  const tabs = [
    { id: "basic", label: "Basic Info", icon: Building2 },
    { id: "contact", label: "Contact", icon: Phone },
    { id: "media", label: "Media", icon: Camera },
    { id: "social", label: "Social", icon: Link },
  ];

  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: "#f4f2ed" }}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2" style={{ color: "#1f3b73" }}>
            Update Company Information
          </h1>
          <p className="text-gray-600">
            Keep your business profile up to date with the latest information
          </p>
        </div>

        {/* Tab Navigation */}
        <div
          className="flex flex-wrap gap-2 mb-8 p-1 rounded-lg"
          style={{ backgroundColor: "#1f3b73" }}>
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? "bg-white shadow-md"
                    : "text-white hover:bg-white hover:bg-opacity-10"
                }`}
                style={activeTab === tab.id ? { color: "#1f3b73" } : {}}>
                <Icon size={18} />
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          {/* Basic Information Tab */}
          {activeTab === "basic" && (
            <div className="space-y-6">
              <h2
                className="text-2xl font-semibold mb-6"
                style={{ color: "#1f3b73" }}>
                Basic Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: "#1f3b73" }}>
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={formData.companyName}
                    onChange={(e) =>
                      handleInputChange("companyName", e.target.value)
                    }
                    className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 transition-all duration-200"
                    style={{
                      borderColor: "#e1a95f",
                      "--tw-ring-color": "#e1a95f",
                    }}
                    placeholder="Enter company name"
                    required
                  />
                </div>

                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: "#1f3b73" }}>
                    Business Type
                  </label>
                  <select
                    value={formData.businessType}
                    onChange={(e) =>
                      handleInputChange("businessType", e.target.value)
                    }
                    className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 transition-all duration-200"
                    style={{
                      borderColor: "#e1a95f",
                      "--tw-ring-color": "#e1a95f",
                    }}>
                    <option value="">Select business type</option>
                    <option value="company">Company</option>
                    <option value="store">Store</option>
                    <option value="workshop">Workshop</option>
                  </select>
                </div>

                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: "#1f3b73" }}>
                    Industry
                  </label>
                  <input
                    type="text"
                    value={formData.industry}
                    onChange={(e) =>
                      handleInputChange("industry", e.target.value)
                    }
                    className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 transition-all duration-200"
                    style={{
                      borderColor: "#e1a95f",
                      "--tw-ring-color": "#e1a95f",
                    }}
                    placeholder="e.g., Technology, Healthcare, Finance"
                  />
                </div>
              </div>

              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: "#1f3b73" }}>
                  Company Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  rows={4}
                  className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 resize-none"
                  style={{
                    borderColor: "#e1a95f",
                    "--tw-ring-color": "#e1a95f",
                  }}
                  placeholder="Describe your company, services, and what makes you unique..."
                />
              </div>
            </div>
          )}

          {/* Contact Information Tab */}
          {activeTab === "contact" && (
            <div className="space-y-6">
              <h2
                className="text-2xl font-semibold mb-6"
                style={{ color: "#1f3b73" }}>
                Contact Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: "#1f3b73" }}>
                    Address
                  </label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) =>
                      handleInputChange("address", e.target.value)
                    }
                    className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 transition-all duration-200"
                    style={{
                      borderColor: "#e1a95f",
                      "--tw-ring-color": "#e1a95f",
                    }}
                    placeholder="Street address"
                  />
                </div>

                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: "#1f3b73" }}>
                    City
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                    className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 transition-all duration-200"
                    style={{
                      borderColor: "#e1a95f",
                      "--tw-ring-color": "#e1a95f",
                    }}
                    placeholder="City"
                  />
                </div>

                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: "#1f3b73" }}>
                    Country
                  </label>
                  <input
                    type="text"
                    value={formData.country}
                    onChange={(e) =>
                      handleInputChange("country", e.target.value)
                    }
                    className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 transition-all duration-200"
                    style={{
                      borderColor: "#e1a95f",
                      "--tw-ring-color": "#e1a95f",
                    }}
                    placeholder="Country"
                  />
                </div>

                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: "#1f3b73" }}>
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 transition-all duration-200"
                    style={{
                      borderColor: "#e1a95f",
                      "--tw-ring-color": "#e1a95f",
                    }}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: "#1f3b73" }}>
                    Website
                  </label>
                  <input
                    type="url"
                    value={formData.website}
                    onChange={(e) =>
                      handleInputChange("website", e.target.value)
                    }
                    className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 transition-all duration-200"
                    style={{
                      borderColor: "#e1a95f",
                      "--tw-ring-color": "#e1a95f",
                    }}
                    placeholder="https://www.yourcompany.com"
                  />
                </div>
              </div>

              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: "#1f3b73" }}>
                  Location Map URL
                </label>
                <input
                  type="url"
                  value={formData.locationMap}
                  onChange={(e) =>
                    handleInputChange("locationMap", e.target.value)
                  }
                  className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 transition-all duration-200"
                  style={{
                    borderColor: "#e1a95f",
                    "--tw-ring-color": "#e1a95f",
                  }}
                  placeholder="Google Maps embed URL or similar"
                />
              </div>
            </div>
          )}

          {/* Media Tab */}
          {activeTab === "media" && (
            <div className="space-y-6">
              <h2
                className="text-2xl font-semibold mb-6"
                style={{ color: "#1f3b73" }}>
                Media & Gallery
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: "#1f3b73" }}>
                    Company Logo
                  </label>
                  <div className="space-y-3">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        handleFileChange("logoFile", e.target.files[0])
                      }
                      className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:text-white hover:file:opacity-90"
                      style={{
                        borderColor: "#e1a95f",
                        "--tw-ring-color": "#e1a95f",
                      }}
                    />
                    {previewUrls.logo && (
                      <div className="mt-2">
                        <img
                          src={previewUrls.logo}
                          alt="Logo preview"
                          className="h-20 w-20 object-contain rounded border bg-white p-2"
                          style={{ borderColor: "#e1a95f" }}
                        />
                      </div>
                    )}
                  </div>
                  <style jsx>{`
                    input[type="file"]::file-selector-button {
                      background-color: #e1a95f;
                    }
                  `}</style>
                </div>

                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: "#1f3b73" }}>
                    Cover Image
                  </label>
                  <div className="space-y-3">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        handleFileChange("coverImageFile", e.target.files[0])
                      }
                      className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:text-white hover:file:opacity-90"
                      style={{
                        borderColor: "#e1a95f",
                        "--tw-ring-color": "#e1a95f",
                      }}
                    />
                    {previewUrls.coverImage && (
                      <div className="mt-2">
                        <img
                          src={previewUrls.coverImage}
                          alt="Cover preview"
                          className="h-20 w-40 object-cover rounded border"
                          style={{ borderColor: "#e1a95f" }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: "#1f3b73" }}>
                  Profile Video
                </label>
                <input
                  type="file"
                  accept="video/*"
                  onChange={(e) =>
                    handleFileChange("profileVideoFile", e.target.files[0])
                  }
                  className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:text-white hover:file:opacity-90"
                  style={{
                    borderColor: "#e1a95f",
                    "--tw-ring-color": "#e1a95f",
                  }}
                />
                {previewUrls.profileVideo && (
                  <div className="mt-3">
                    <video
                      src={previewUrls.profileVideo}
                      controls
                      className="h-32 w-56 rounded border"
                      style={{ borderColor: "#e1a95f" }}>
                      Your browser does not support the video tag.
                    </video>
                  </div>
                )}
              </div>

              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: "#1f3b73" }}>
                  Gallery Images
                </label>

                {/* Drag & Drop Zone */}
                <div
                  onDragOver={handleDragOver}
                  onDragEnter={handleDragEnter}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className="border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 hover:border-solid"
                  style={{ borderColor: "#e1a95f" }}>
                  <Upload
                    size={48}
                    className="mx-auto mb-4 opacity-50"
                    style={{ color: "#e1a95f" }}
                  />
                  <p className="text-gray-600 mb-4">
                    Drag and drop images here, or{" "}
                    <label
                      className="cursor-pointer font-medium hover:underline"
                      style={{ color: "#e1a95f" }}>
                      browse files
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={(e) =>
                          handleMultipleFilesChange(e.target.files)
                        }
                        className="hidden"
                      />
                    </label>
                  </p>
                  <p className="text-sm text-gray-400">
                    Support: JPG, PNG, GIF, WebP (Max 10MB each)
                  </p>
                </div>

                {/* Gallery Preview */}
                {formData.galleryFiles.length > 0 && (
                  <div className="mt-6">
                    <h4
                      className="text-sm font-medium mb-3"
                      style={{ color: "#1f3b73" }}>
                      Selected Images ({formData.galleryFiles.length})
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                      {previewUrls.gallery.map((url, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={url}
                            alt={`Gallery ${index + 1}`}
                            className="w-full h-24 object-cover rounded-lg border shadow-sm group-hover:shadow-md transition-shadow"
                            style={{ borderColor: "#e1a95f" }}
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 rounded-lg transition-all duration-200 flex items-center justify-center">
                            <button
                              type="button"
                              onClick={() => handleGalleryRemove(index)}
                              className="opacity-0 group-hover:opacity-100 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition-all duration-200 transform hover:scale-110">
                              <X size={16} />
                            </button>
                          </div>
                          <div className="absolute bottom-1 left-1 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                            {formData.galleryFiles[index]?.name?.substring(
                              0,
                              10
                            )}
                            ...
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Social Links Tab */}
          {activeTab === "social" && (
            <div className="space-y-6">
              <h2
                className="text-2xl font-semibold mb-6"
                style={{ color: "#1f3b73" }}>
                Social Links
              </h2>

              {Object.keys(formData.socialLinks).map((platform) => (
                <div key={platform} className="flex items-center gap-3 mb-4">
                  <label
                    htmlFor={`social-${platform}`}
                    className="w-24 capitalize text-gray-700">
                    {platform}
                  </label>
                  <input
                    id={`social-${platform}`}
                    type="url"
                    value={formData.socialLinks[platform] || ""}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        socialLinks: {
                          ...prev.socialLinks,
                          [platform]: e.target.value,
                        },
                      }))
                    }
                    placeholder={`https://${platform}.com/yourprofile`}
                    className="flex-1 px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 transition-all duration-200"
                    style={{
                      borderColor: "#e1a95f",
                      "--tw-ring-color": "#e1a95f",
                    }}
                  />
                </div>
              ))}
            </div>
          )}

          {/* Submit Button */}
          <div className="flex justify-end pt-8 border-t border-gray-200 mt-8">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isLoading}
              className="flex items-center gap-2 px-8 py-3 rounded-lg text-white font-medium text-lg hover:opacity-90 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              style={{ backgroundColor: "#1f3b73" }}>
              {isLoading ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  Updating...
                </>
              ) : (
                <>
                  <Save size={20} />
                  Update Information
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        input:focus,
        textarea:focus,
        select:focus {
          ring-color: #e1a95f !important;
          border-color: #e1a95f !important;
        }
      `}</style>
    </div>
  );
};

export default UpdateCompanyInfos;
