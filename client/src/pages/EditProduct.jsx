import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import { Edit, UploadCloud, X, Loader2, Trash2, AlertTriangle, Percent } from "lucide-react";
import Header from "../components/common/Header";
import { toast } from "sonner";

const categories = [
  "Furniture",
  "Electronics",
  "Clothing",
  "Books",
  "Toys",
  "Other",
];

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    country: "",
    stock: "",
    features: [],
    specifications: [],
    media: [],
    existingMedia: [], // For existing media URLs that we want to keep
    originalMedia: [], // Store original media for comparison
    flashDeals: {
      isActive: false,
      discount: "",
      startDate: "",
      endDate: ""
    }
  });
  
  const [mediaPreviews, setMediaPreviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchingProduct, setFetchingProduct] = useState(true);
  const [newFeature, setNewFeature] = useState("");
  const [newSpec, setNewSpec] = useState({ key: "", value: "" });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // Fetch existing product data
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/api/v1/product/details/${id}`);
        const product = response.data.data || response.data;
        
        // Normalize media format - ensure all media items have type and url
        const normalizedMedia = (product.media || []).map(media => {
          if (typeof media === 'string') {
            // If media is just a URL string, determine type and create object
            const isVideo = media.includes('.mp4') || media.includes('.mov') || media.includes('.avi');
            return {
              type: isVideo ? "video" : "image",
              url: media
            };
          }
          // If media is already an object, use it as is
          return media;
        });
        
        setForm({
          title: product.title || "",
          description: product.description || "",
          price: product.price?.toString() || "",
          category: product.category || "",
          country: product.country || "",
          stock: product.stock?.toString() || "",
          features: product.features || [],
          specifications: product.specifications || [],
          media: [],
          existingMedia: [...normalizedMedia], // Current media we want to keep
          originalMedia: [...normalizedMedia], // Store original for comparison
          flashDeals: {
            isActive: product.flashDeals?.isActive || false,
            discount: product.flashDeals?.discount?.toString() || "",
            startDate: product.flashDeals?.startDate ? 
              new Date(product.flashDeals.startDate).toISOString().split('T')[0] : "",
            endDate: product.flashDeals?.endDate ? 
              new Date(product.flashDeals.endDate).toISOString().split('T')[0] : ""
          }
        });
      } catch (err) {
        console.log("Fetch product error:", err);
        toast.error(err.response?.data?.message || "Failed to load product data");
        navigate("/products"); // Redirect to products list
      } finally {
        setFetchingProduct(false);
      }
    };

    fetchProduct();
  }, [id, navigate]);

  // Cleanup preview URLs when component unmounts or previews change
  useEffect(() => {
    return () => {
      mediaPreviews.forEach((preview) => {
        if (preview.url) {
          URL.revokeObjectURL(preview.url);
        }
      });
    };
  }, [mediaPreviews]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFlashDealsChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      flashDeals: {
        ...prev.flashDeals,
        [name]: type === "checkbox" ? checked : value
      }
    }));
  };

  const handleMediaChange = (e) => {
    const files = Array.from(e.target.files);
    const totalMedia = files.length + form.media.length + form.existingMedia.length;

    if (totalMedia > 5) {
      toast.error("Maximum of 5 media files allowed.");
      return;
    }

    // Validate file types
    const validTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/webp",
      "video/mp4",
      "video/mov",
      "video/avi",
    ];
    const invalidFiles = files.filter(
      (file) => !validTypes.includes(file.type)
    );

    if (invalidFiles.length > 0) {
      toast.error("Please upload only image or video files.");
      return;
    }

    // Update form state with new files
    setForm((prev) => ({
      ...prev,
      media: [...prev.media, ...files],
    }));

    // Create preview URLs for new files
    const newPreviews = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
      type: file.type.startsWith("video") ? "video" : "image",
    }));

    setMediaPreviews((prev) => [...prev, ...newPreviews]);
    e.target.value = "";
  };

  const handleRemoveNewMedia = (idx) => {
    if (mediaPreviews[idx]?.url) {
      URL.revokeObjectURL(mediaPreviews[idx].url);
    }

    setForm((prev) => ({
      ...prev,
      media: prev.media.filter((_, i) => i !== idx),
    }));

    setMediaPreviews((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleRemoveExistingMedia = (idx) => {
    setForm((prev) => ({
      ...prev,
      existingMedia: prev.existingMedia.filter((_, i) => i !== idx),
    }));
  };

  const handleAddFeature = () => {
    if (!newFeature.trim()) {
      toast.error("Please enter a feature");
      return;
    }

    if (form.features.includes(newFeature.trim())) {
      toast.error("Feature already exists");
      return;
    }

    setForm((prev) => ({
      ...prev,
      features: [...prev.features, newFeature.trim()],
    }));
    setNewFeature("");
  };

  const handleRemoveFeature = (idx) => {
    setForm((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== idx),
    }));
  };

  const handleAddSpecification = () => {
    if (!newSpec.key.trim() || !newSpec.value.trim()) {
      toast.error("Please enter both key and value for specification");
      return;
    }

    if (form.specifications.some(spec => spec.key === newSpec.key.trim())) {
      toast.error("Specification key already exists");
      return;
    }

    setForm((prev) => ({
      ...prev,
      specifications: [...prev.specifications, {
        key: newSpec.key.trim(),
        value: newSpec.value.trim()
      }],
    }));
    setNewSpec({ key: "", value: "" });
  };

  const handleRemoveSpecification = (idx) => {
    setForm((prev) => ({
      ...prev,
      specifications: prev.specifications.filter((_, i) => i !== idx),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { title, description, price, category, country, stock, flashDeals } = form;
    const totalMedia = form.media.length + form.existingMedia.length;

    if (!title || !description || !price || !category || !country || totalMedia === 0) {
      toast.error("All required fields must be filled");
      return;
    }

    // Validate price
    if (isNaN(price) || parseFloat(price) <= 0) {
      toast.error("Please enter a valid price");
      return;
    }

    // Validate stock if provided
    if (stock && (isNaN(stock) || parseInt(stock) < 0)) {
      toast.error("Stock must be a non-negative number");
      return;
    }

    // Validate flash deals
    if (flashDeals.isActive) {
      if (!flashDeals.discount || isNaN(flashDeals.discount) || 
          parseFloat(flashDeals.discount) <= 0 || parseFloat(flashDeals.discount) >= 100) {
        toast.error("Discount must be between 1 and 99");
        return;
      }
      if (!flashDeals.startDate || !flashDeals.endDate) {
        toast.error("Please provide both start and end dates for flash deals");
        return;
      }
      if (new Date(flashDeals.startDate) >= new Date(flashDeals.endDate)) {
        toast.error("End date must be after start date");
        return;
      }
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", title.trim());
      formData.append("description", description.trim());
      formData.append("price", parseFloat(price).toString());
      formData.append("category", category);
      formData.append("country", country.trim());

      // Add optional fields
      if (stock) {
        formData.append("stock", parseInt(stock).toString());
      }

      if (form.features.length > 0) {
        formData.append("features", JSON.stringify(form.features));
      }

      if (form.specifications.length > 0) {
        formData.append("specifications", JSON.stringify(form.specifications));
      }

      // Add flash deals data
      formData.append("flashDeals", JSON.stringify(flashDeals));

      // Calculate which media was removed by comparing original with current existing
      const originalMediaUrls = form.originalMedia.map(media => 
        typeof media === 'string' ? media : media.url
      );
      const currentMediaUrls = form.existingMedia.map(media => 
        typeof media === 'string' ? media : media.url
      );
      const removedMedia = originalMediaUrls.filter(url => !currentMediaUrls.includes(url));

      // Add existing media URLs to keep
      if (form.existingMedia.length > 0) {
        formData.append("existingMedia", JSON.stringify(form.existingMedia));
      }

      // Add removed media URLs for deletion
      if (removedMedia.length > 0) {
        formData.append("removedMedia", JSON.stringify(removedMedia));
      }

      // Append new media files
      form.media.forEach((file) => {
        formData.append("media", file);
      });
      
      await axios.put(`/api/v1/product/update/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        timeout: 30000,
      });

      toast.success("Product updated successfully");
      navigate("/products"); // Navigate back to products list
    } catch (err) {
      console.error("Update product error:", err);
      const errorMessage =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Failed to update product";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async () => {
    setDeleting(true);
    try {
      await axios.delete(`/api/v1/product/delete/${id}`);
      toast.success("Product deleted successfully");
      navigate("/products");
    } catch (err) {
      console.error("Delete product error:", err);
      const errorMessage =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Failed to delete product";
      toast.error(errorMessage);
    } finally {
      setDeleting(false);
      setShowDeleteModal(false);
    }
  };

  if (fetchingProduct) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-[#f4f2ed] flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin text-[#e1a95f] mx-auto mb-4" />
            <p className="text-[#1f3b73]">Loading product...</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-[#f4f2ed] flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg border border-[#e1a95f] p-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-[#1f3b73] flex items-center gap-2">
              <Edit className="w-7 h-7 text-[#e1a95f]" />
              Update Product
            </h1>
            <button
              onClick={() => setShowDeleteModal(true)}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center gap-2">
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium mb-2 text-[#1f3b73]">
                Title *
              </label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-[#e1a95f] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1f3b73] bg-[#f4f2ed] text-[#1f3b73]"
                placeholder="Product title"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-[#1f3b73]">
                Description *
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-[#e1a95f] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1f3b73] bg-[#f4f2ed] text-[#1f3b73]"
                placeholder="Product description"
                rows={4}
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-[#1f3b73]">
                  Price *
                </label>
                <input
                  type="number"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-[#e1a95f] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1f3b73] bg-[#f4f2ed] text-[#1f3b73]"
                  placeholder="Price"
                  min="0.01"
                  step="0.01"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-[#1f3b73]">
                  Stock (Optional)
                </label>
                <input
                  type="number"
                  name="stock"
                  value={form.stock}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-[#e1a95f] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1f3b73] bg-[#f4f2ed] text-[#1f3b73]"
                  placeholder="Available stock"
                  min="0"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-[#1f3b73]">
                  Category *
                </label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-[#e1a95f] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1f3b73] bg-[#f4f2ed] text-[#1f3b73]"
                  required>
                  <option value="">Select category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-[#1f3b73]">
                  Country *
                </label>
                <input
                  type="text"
                  name="country"
                  value={form.country}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-[#e1a95f] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1f3b73] bg-[#f4f2ed] text-[#1f3b73]"
                  placeholder="Country"
                  required
                />
              </div>
            </div>

            {/* Flash Deals Section */}
            <div className="border-2 border-[#e1a95f] rounded-lg p-4 bg-[#f4f2ed]">
              <div className="flex items-center gap-2 mb-4">
                <Percent className="w-5 h-5 text-[#e1a95f]" />
                <h3 className="text-lg font-semibold text-[#1f3b73]">Flash Deals</h3>
              </div>
              
              <div className="mb-4">
                <label className="flex items-center gap-2 text-[#1f3b73]">
                  <input
                    type="checkbox"
                    name="isActive"
                    checked={form.flashDeals.isActive}
                    onChange={handleFlashDealsChange}
                    className="w-4 h-4 text-[#e1a95f] border-2 border-[#e1a95f] rounded focus:ring-[#1f3b73]"
                  />
                  Enable Flash Deal
                </label>
              </div>

              {form.flashDeals.isActive && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-[#1f3b73]">
                      Discount (%)
                    </label>
                    <input
                      type="number"
                      name="discount"
                      value={form.flashDeals.discount}
                      onChange={handleFlashDealsChange}
                      className="w-full px-4 py-2 border-2 border-[#e1a95f] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1f3b73] bg-white text-[#1f3b73]"
                      placeholder="10"
                      min="1"
                      max="99"
                      required={form.flashDeals.isActive}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-[#1f3b73]">
                      Start Date
                    </label>
                    <input
                      type="date"
                      name="startDate"
                      value={form.flashDeals.startDate}
                      onChange={handleFlashDealsChange}
                      className="w-full px-4 py-2 border-2 border-[#e1a95f] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1f3b73] bg-white text-[#1f3b73]"
                      required={form.flashDeals.isActive}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-[#1f3b73]">
                      End Date
                    </label>
                    <input
                      type="date"
                      name="endDate"
                      value={form.flashDeals.endDate}
                      onChange={handleFlashDealsChange}
                      className="w-full px-4 py-2 border-2 border-[#e1a95f] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1f3b73] bg-white text-[#1f3b73]"
                      required={form.flashDeals.isActive}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Features Section */}
            <div>
              <label className="block text-sm font-medium mb-2 text-[#1f3b73]">
                Features (Optional)
              </label>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={newFeature}
                  onChange={(e) => setNewFeature(e.target.value)}
                  className="flex-1 px-4 py-2 border-2 border-[#e1a95f] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1f3b73] bg-[#f4f2ed] text-[#1f3b73]"
                  placeholder="Add a feature"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddFeature())}
                />
                <button
                  type="button"
                  onClick={handleAddFeature}
                  className="px-4 py-2 bg-[#e1a95f] text-white rounded-lg hover:bg-[#d19940] transition-colors">
                  Add
                </button>
              </div>
              {form.features.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {form.features.map((feature, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-[#1f3b73] text-white rounded-full text-sm">
                      {feature}
                      <button
                        type="button"
                        onClick={() => handleRemoveFeature(idx)}
                        className="ml-1 hover:text-red-300">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Specifications Section */}
            <div>
              <label className="block text-sm font-medium mb-2 text-[#1f3b73]">
                Specifications (Optional)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-3">
                <input
                  type="text"
                  value={newSpec.key}
                  onChange={(e) => setNewSpec(prev => ({ ...prev, key: e.target.value }))}
                  className="px-4 py-2 border-2 border-[#e1a95f] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1f3b73] bg-[#f4f2ed] text-[#1f3b73]"
                  placeholder="Key (e.g., Weight)"
                />
                <input
                  type="text"
                  value={newSpec.value}
                  onChange={(e) => setNewSpec(prev => ({ ...prev, value: e.target.value }))}
                  className="px-4 py-2 border-2 border-[#e1a95f] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1f3b73] bg-[#f4f2ed] text-[#1f3b73]"
                  placeholder="Value (e.g., 2.5kg)"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSpecification())}
                />
                <button
                  type="button"
                  onClick={handleAddSpecification}
                  className="px-4 py-2 bg-[#e1a95f] text-white rounded-lg hover:bg-[#d19940] transition-colors">
                  Add
                </button>
              </div>
              {form.specifications.length > 0 && (
                <div className="space-y-2">
                  {form.specifications.map((spec, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3 bg-[#f4f2ed] border border-[#e1a95f] rounded-lg">
                      <span className="text-[#1f3b73]">
                        <strong>{spec.key}:</strong> {spec.value}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleRemoveSpecification(idx)}
                        className="text-red-500 hover:text-red-700">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-[#1f3b73]">
                Media (max 5) - Images & Videos *
              </label>
              
              {/* Existing Media */}
              {form.existingMedia.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-[#1f3b73] mb-2">Current Media:</h4>
                  <div className="flex flex-wrap gap-3">
                    {form.existingMedia.map((media, idx) => {
                      const mediaUrl = typeof media === 'string' ? media : media.url;
                      const isVideo = mediaUrl.includes('.mp4') || mediaUrl.includes('.mov') || mediaUrl.includes('.avi') || media.type === 'video';
                      
                      return (
                        <div
                          key={idx}
                          className="relative w-20 h-20 rounded-lg overflow-hidden border-2 border-[#e1a95f] bg-[#f4f2ed]">
                          {isVideo ? (
                            <video
                              src={mediaUrl}
                              className="w-full h-full object-cover"
                              muted
                            />
                          ) : (
                            <img
                              src={mediaUrl}
                              alt={`Existing ${idx + 1}`}
                              className="w-full h-full object-cover"
                            />
                          )}
                          <button
                            type="button"
                            onClick={() => handleRemoveExistingMedia(idx)}
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors duration-200"
                            title="Remove media">
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Add New Media */}
              <input
                type="file"
                accept="image/*,video/*"
                multiple
                onChange={handleMediaChange}
                className="w-full px-2 py-2 border-2 border-[#e1a95f] rounded-lg bg-[#f4f2ed] text-[#1f3b73] file:bg-[#e1a95f] file:text-white file:rounded file:px-3 file:py-1 file:mr-2 file:border-0"
              />

              {/* New Media Previews */}
              {mediaPreviews.length > 0 && (
                <div className="mt-3">
                  <h4 className="text-sm font-medium text-[#1f3b73] mb-2">New Media:</h4>
                  <div className="flex flex-wrap gap-3">
                    {mediaPreviews.map((preview, idx) => (
                      <div
                        key={idx}
                        className="relative w-20 h-20 rounded-lg overflow-hidden border-2 border-[#e1a95f] bg-[#f4f2ed]">
                        {preview.type === "video" ? (
                          <video
                            src={preview.url}
                            className="w-full h-full object-cover"
                            muted
                          />
                        ) : (
                          <img
                            src={preview.url}
                            alt={`Preview ${idx + 1}`}
                            className="w-full h-full object-cover"
                          />
                        )}
                        <button
                          type="button"
                          onClick={() => handleRemoveNewMedia(idx)}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors duration-200"
                          title="Remove media">
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Media count info */}
              <p className="text-sm text-[#1f3b73] mt-2">
                {form.existingMedia.length + form.media.length} of 5 media files selected
              </p>
            </div>

            {/* Submit Button */}
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className={`flex-1 py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-[#1f3b73] hover:bg-[#2a4a8a] text-white"
                }`}>
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Updating...
                  </>
                ) : (
                  <>
                    <Edit className="w-5 h-5" />
                    Update Product
                  </>
                )}
              </button>
              
              <button
                type="button"
                onClick={() => navigate("/products")}
                className="px-6 py-3 border-2 border-[#e1a95f] text-[#1f3b73] rounded-lg hover:bg-[#e1a95f] hover:text-white transition-colors">
                Cancel
              </button>
            </div>
          </form>
        </div>

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl p-6 max-w-md w-full border border-[#e1a95f]">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="w-8 h-8 text-red-500" />
                <h2 className="text-xl font-bold text-[#1f3b73]">Delete Product</h2>
              </div>
              
              <p className="text-[#1f3b73] mb-6">
                Are you sure you want to delete this product? This action cannot be undone.
              </p>
              
              <div className="flex gap-3">
                <button
                  onClick={handleDeleteProduct}
                  disabled={deleting}
                  className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
                    deleting
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-red-500 hover:bg-red-600 text-white"
                  }`}>
                  {deleting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Deleting...
                    </>
                  ) : (
                    <>
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </>
                  )}
                </button>
                
                <button
                  onClick={() => setShowDeleteModal(false)}
                  disabled={deleting}
                  className="flex-1 py-2 px-4 border-2 border-[#e1a95f] text-[#1f3b73] rounded-lg hover:bg-[#e1a95f] hover:text-white transition-colors disabled:opacity-50">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}