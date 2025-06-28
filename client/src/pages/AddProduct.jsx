import React, { useState, useEffect } from "react";
import axios from "../api/axios";
import { Plus, UploadCloud, X, Loader2, Trash2 } from "lucide-react";
import Header from "../components/common/Header";
import { toast } from "sonner";

const initialState = {
  title: "",
  description: "",
  price: "",
  category: "",
  country: "",
  stock: "",
  features: [],
  specifications: [],
  media: [],
};

const categories = [
  "Furniture",
  "Electronics",
  "Clothing",
  "Books",
  "Toys",
  "Other",
];

export default function AddProduct() {
  const [form, setForm] = useState(initialState);
  const [mediaPreviews, setMediaPreviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newFeature, setNewFeature] = useState("");
  const [newSpec, setNewSpec] = useState({ key: "", value: "" });

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

  const handleMediaChange = (e) => {
    const files = Array.from(e.target.files);

    if (files.length + form.media.length > 5) {
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

    // Clear the input value to allow selecting the same files again if needed
    e.target.value = "";
  };

  const handleRemoveMedia = (idx) => {
    // Revoke the URL for the removed preview
    if (mediaPreviews[idx]?.url) {
      URL.revokeObjectURL(mediaPreviews[idx].url);
    }

    setForm((prev) => ({
      ...prev,
      media: prev.media.filter((_, i) => i !== idx),
    }));

    setMediaPreviews((prev) => prev.filter((_, i) => i !== idx));
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

    const { title, description, price, category, country, media, stock } = form;

    if (
      !title ||
      !description ||
      !price ||
      !category ||
      !country ||
      media.length === 0
    ) {
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

      // Append each media file with the same field name
      media.forEach((file) => {
        formData.append("media", file);
      });

      await axios.post("/api/v1/product/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        timeout: 30000,
      });

      await new Promise((res) => setTimeout(res, 1200));
      toast.success("Product added successfully");

      // Reset form and clean up previews
      mediaPreviews.forEach((preview) => {
        if (preview.url) {
          URL.revokeObjectURL(preview.url);
        }
      });

      setForm(initialState);
      setMediaPreviews([]);
      setNewFeature("");
      setNewSpec({ key: "", value: "" });
    } catch (err) {
      console.error("Add product error:", err);
      const errorMessage =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Failed to add product";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-[#f4f2ed] flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg border border-[#e1a95f] p-8">
          <h1 className="text-2xl font-bold mb-6 text-[#1f3b73] flex items-center gap-2">
            <Plus className="w-7 h-7 text-[#e1a95f]" />
            Add New Product
          </h1>
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
              <input
                type="file"
                accept="image/*,video/*"
                multiple
                onChange={handleMediaChange}
                className="w-full px-2 py-2 border-2 border-[#e1a95f] rounded-lg bg-[#f4f2ed] text-[#1f3b73] file:bg-[#e1a95f] file:text-white file:rounded file:px-3 file:py-1 file:mr-2 file:border-0"
              />

              {mediaPreviews.length > 0 && (
                <div className="flex flex-wrap gap-3 mt-3">
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
                        onClick={() => handleRemoveMedia(idx)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors duration-200"
                        title="Remove media">
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <p className="text-xs text-gray-500 mt-1">
                {form.media.length}/5 files selected
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-[#e1a95f]/40 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              style={{
                backgroundColor: "#1f3b73",
                boxShadow: "0 0 0 4px rgba(225, 169, 95, 0.10)",
              }}>
              {loading ? (
                <span className="flex items-center justify-center">
                  <Loader2 className="w-5 h-5 animate-spin mr-2" />
                  Adding Product...
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  <UploadCloud className="w-5 h-5 mr-2" />
                  Add Product
                </span>
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}