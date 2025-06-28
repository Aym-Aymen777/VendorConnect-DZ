import React, { useEffect, useState } from "react";
import {
  Star,
  Heart,
  ShoppingCart,
  ArrowLeft,
  Home,
  Package,
  Truck,
  Shield,
  Award,
  MessageCircle,
  Share2,
  Plus,
  Minus,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import Header from "../components/common/Header";
import NotFound from "./NotFound";
import axios from "../api/axios";
import { toast } from "sonner";

export default function ProductDetails() {
  // For demo purposes, using the first product
  const [product, setProduct] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState("description");
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const getProduct = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/api/v1/product/details/${id}`);
      setProduct(res.data); // Adjust based on your API response structure
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to view this product"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      getProduct();
    }
  }, [id]); // Dependency array with id

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <NotFound />;
  }
  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % product.media.length);
  };

  const prevImage = () => {
    setSelectedImageIndex(
      (prev) => (prev - 1 + product.media.length) % product.media.length
    );
  };

  const updateQuantity = (change) => {
    setQuantity((prev) => Math.max(1, prev + change));
  };

  return (
    <div className="min-h-screen bg-[#f4f2ed]">
      <Header />
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center gap-2 text-sm text-gray-600">
          <button className="hover:text-[#e1a95f] transition-colors">
            Home
          </button>
          <span>/</span>
          <span className="text-[#1f3b73]">{product?.category}</span>
          <span>/</span>
          <span className="text-[#1f3b73] font-medium">{product?.title}</span>
        </nav>
      </div>

      <div className="container mx-auto px-4 pb-8">
        <button className="inline-flex items-center gap-2 text-[#e1a95f] font-semibold hover:underline mb-6 transition-colors">
          <ArrowLeft size={18} /> Back to Products
        </button>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative bg-white rounded-2xl p-4 shadow-lg border border-[#1f3b73]/10">
              <div className="relative overflow-hidden rounded-xl">
                <img
                  src={product?.media[selectedImageIndex].url}
                  alt={product?.title}
                  className="w-full h-96 object-cover bg-[#f4f2ed] transition-transform duration-300 hover:scale-105"
                />

                {/* Image Navigation */}
                {product?.media?.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition-colors">
                      <ChevronLeft size={20} className="text-[#1f3b73]" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition-colors">
                      <ChevronRight size={20} className="text-[#1f3b73]" />
                    </button>
                  </>
                )}

                {/* Discount Badge */}
                {product?.price && product?.flashDealed?.isFlashDealed && (
                  <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {product?.flashDealed?.discount} % OFF
                  </div>
                )}
              </div>

              {/* Thumbnail Gallery */}
              {product?.media.length > 1 && (
                <div className="flex gap-2 mt-4 justify-center">
                  {product?.media.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                        selectedImageIndex === index
                          ? "border-[#e1a95f]"
                          : "border-transparent hover:border-[#e1a95f]/50"
                      }`}>
                      <img
                        src={image.url}
                        alt={`${product?.title} ${index + 1}`}
                        className="w-full h-full object-cover bg-[#f4f2ed]"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-[#1f3b73]/10">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-[#1f3b73] mb-2">
                    {product?.title}
                  </h1>
                  <div className="flex items-center gap-2 mb-2">
                    <Package size={18} className="text-[#1f3b73]" />
                    <span className="text-[#1f3b73] font-medium">
                      {product?.category}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    className={`p-2 rounded-full transition-colors ${
                      isWishlisted
                        ? "bg-red-50 text-red-500"
                        : "bg-gray-50 text-gray-400 hover:bg-red-50 hover:text-red-500"
                    }`}>
                    <Heart
                      size={20}
                      fill={isWishlisted ? "currentColor" : "none"}
                    />
                  </button>
                  <button className="p-2 rounded-full bg-gray-50 text-gray-400 hover:bg-[#e1a95f]/10 hover:text-[#e1a95f] transition-colors">
                    <Share2 size={20} />
                  </button>
                </div>
              </div>

              {/* Price and Rating */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-3xl font-bold text-[#e1a95f]">
                    {product?.price} DZD
                  </span>
                  {product?.price && (
                    <span className="text-lg text-gray-500 line-through">
                      {product?.price} DZD
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 bg-[#e1a95f]/10 px-3 py-1 rounded-full">
                    <Star
                      size={16}
                      className="text-[#e1a95f]"
                      fill="currentColor"
                    />
                    <span className="font-semibold text-[#e1a95f]">
                      {product?.rating }
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">
                    ({product?.views } reviews)
                  </span>
                </div>
              </div>

              {/* Stock Status */}
              <div className="flex items-center gap-2 mb-4">
                <div
                  className={`w-3 h-3 rounded-full ${
                    product?.stock > 0 ? "bg-green-500" : "bg-red-500"
                  }`}></div>
                <span
                  className={`font-medium ${
                    product?.stock > 0 ? "text-green-600" : "text-red-600"
                  }`}>
                  {product?.stock > 0
                    ? `In Stock (${product?.stock} available)`
                    : "Out of Stock"}
                </span>
              </div>

              {/* Features */}
              <div className="mb-6">
                <h3 className="font-semibold text-[#1f3b73] mb-3">
                  Key Features
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {product?.features?.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 text-sm text-gray-700">
                      <Award size={14} className="text-[#e1a95f]" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quantity and Actions */}
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="font-medium text-[#1f3b73]">Quantity:</span>
                  <div className="flex items-center border border-[#1f3b73]/20 rounded-lg">
                    <button
                      onClick={() => updateQuantity(-1)}
                      className="p-2 hover:bg-gray-50 transition-colors">
                      <Minus size={16} className="text-[#1f3b73]" />
                    </button>
                    <span className="px-4 py-2 font-semibold text-[#1f3b73]">
                      {quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(1)}
                      className="p-2 hover:bg-gray-50 transition-colors">
                      <Plus size={16} className="text-[#1f3b73]" />
                    </button>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    disabled={product?.stock<=0}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-[#e1a95f] text-white rounded-lg font-semibold hover:bg-[#d89a4b] transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                    <ShoppingCart size={18} /> Add to Cart
                  </button>
                  <button className="px-6 py-3 bg-[#1f3b73] text-white rounded-lg font-semibold hover:bg-[#1f3b73]/90 transition-colors">
                    Buy Now
                  </button>
                </div>
              </div>

              {/* Supplier Info */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Home size={20} className="text-[#e1a95f]" />
                    <div>
                      <Link
                        to={`/suppliers/${product?.supplier._id}`}
                        className="font-semibold text-[#1f3b73] hover:text-[#e1a95f] transition-colors">
                        {product?.supplier?.supplierProfile?.companyName}
                      </Link>
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Star
                          size={12}
                          className="text-[#e1a95f]"
                          fill="currentColor"
                        />
                        <span>{product?.supplier?.supplierProfile?.rating || "N/A"}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Truck size={16} />
                    <span>{product?.supplier?.supplierProfile?.dileveryTime || "N/A"}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-[#1f3b73]/10">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="flex flex-col items-center gap-2">
                  <Shield size={24} className="text-[#e1a95f]" />
                  <span className="text-sm font-medium text-[#1f3b73]">
                    Secure Payment
                  </span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Truck size={24} className="text-[#e1a95f]" />
                  <span className="text-sm font-medium text-[#1f3b73]">
                    Fast Delivery
                  </span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Award size={24} className="text-[#e1a95f]" />
                  <span className="text-sm font-medium text-[#1f3b73]">
                    Quality Assured
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="bg-white rounded-2xl shadow-lg border border-[#1f3b73]/10 overflow-hidden mb-8">
          <div className="flex border-b border-gray-200">
            {["description", "specifications", "reviews"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-4 font-medium transition-colors capitalize ${
                  activeTab === tab
                    ? "text-[#e1a95f] border-b-2 border-[#e1a95f] bg-[#e1a95f]/5"
                    : "text-gray-600 hover:text-[#1f3b73]"
                }`}>
                {tab}
              </button>
            ))}
          </div>

          <div className="p-6">
            {activeTab === "description" && (
              <div>
                <h3 className="text-xl font-semibold text-[#1f3b73] mb-4">
                  Product Description
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {product?.description}
                </p>
              </div>
            )}

            {activeTab === "specifications" && (
              <div>
                <h3 className="text-xl font-semibold text-[#1f3b73] mb-4">
                  Specifications
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {product?.specifications.map(
                    ({key,value}) => (
                      <div
                        key={key}
                        className="flex justify-between py-2 border-b border-gray-100">
                        <span className="font-medium text-[#1f3b73]">
                          {key}:
                        </span>
                        <span className="text-gray-700">{value}</span>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}

            {activeTab === "reviews" && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-[#1f3b73]">
                    Customer Reviews
                  </h3>
                  <button className="flex items-center gap-2 px-4 py-2 border border-[#e1a95f] text-[#e1a95f] rounded-lg hover:bg-[#e1a95f]/10 transition-colors">
                    <MessageCircle size={16} />
                    Write Review
                  </button>
                </div>

                <div className="flex items-center gap-4 mb-6 p-4 bg-[#f4f2ed] rounded-lg">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[#e1a95f]">
                      {product?.rating }
                    </div>
                    <div className="flex items-center gap-1 mt-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={16}
                          className={
                            star <= Math.floor(product?.rating || 0)
                              ? "text-[#e1a95f]"
                              : "text-gray-300"
                          }
                          fill="currentColor"
                        />
                      ))}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      {product?.views} reviews
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-gray-600 mb-2">
                      Based on {product?.views} verified purchases
                    </div>
                  </div>
                </div>

                <div className="text-center py-8 text-gray-500">
                  <MessageCircle
                    size={48}
                    className="mx-auto mb-4 opacity-50"
                  />
                  <p>No reviews yet. Be the first to review this product!</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
