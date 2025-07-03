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
  AlertTriangle,
  X,
  Trash,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import Header from "../components/common/Header";
import NotFound from "./NotFound";
import axios from "../api/axios";
import { toast } from "sonner";
import useUserStore from "../store/UserStore";
import useCartProduct from "../hooks/useSaveProduct";
import useLikeProduct from "../hooks/useLikeProduct";
export default function ProductDetails() {
  // For demo purposes, using the first product
  const [product, setProduct] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [loading, setLoading] = useState(false);
  const [showAllert, setShowAllert] = useState(false);
  const [message, setMessage] = useState("");
  const { id } = useParams();
  const {createQuotation}=useUserStore();
  const {handleLike, liked} = useLikeProduct(product?._id);
  const {handleCartToggle, inCart} = useCartProduct(product?._id);
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

const handleBuyNow = async () => {
  try {
    await createQuotation({
      product: product._id,
      message: `I want to buy ${quantity} of ${product.title},\n${message}`,
    });

    toast.success("Your purchase request has been sent.");
    setShowAllert(false); // أغلق التنبيه بعد نجاح العملية
  } catch (error) {
    console.error("Error sending purchase request:", error);
    toast.error("Failed to send your purchase request.");
  }
};


  useEffect(() => {
    if (id) {
      getProduct();
    }
  }, [id]); 

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
    const handleCancel = () => {
    setShowAllert(false);
  };

  return (
    <div className="min-h-screen bg-[#f4f2ed]">
      <Header />
      {showAllert && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md transform animate-in duration-300 scale-100">
            
            {/* Warning Header */}
            <div className="bg-gradient-to-r from-orange-500 to-red-500 px-6 py-4 rounded-t-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="bg-white bg-opacity-20 p-2 rounded-full">
                    <AlertTriangle className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-xl font-bold text-white">Purchase Confirmation</h2>
                </div>
                <button
                  onClick={handleCancel}
                  className="text-white hover:bg-white hover:bg-opacity-20 p-1 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Warning Message */}
            <div className="px-6 py-4">
              <div className="bg-orange-50 border-l-4 border-orange-400 p-4 rounded-r-lg mb-4">
                <div className="flex">
                  <AlertTriangle className="w-5 h-5 text-orange-400 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="text-sm font-semibold text-orange-800 mb-1">
                      Important Notice
                    </h3>
                    <p className="text-sm text-orange-700">
                      Please review your purchase carefully. This action cannot be undone and payment will be processed immediately.
                    </p>
                  </div>
                </div>
              </div>

              {/* Message Input */}
              <div className="mb-6">
                <label htmlFor="purchase-message" className="block text-sm font-semibold text-gray-700 mb-2">
                  Add a message (optional):
                </label>
                <textarea
                  id="purchase-message"
                  rows="4"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Enter any special instructions, delivery notes, or comments about your purchase..."
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all resize-none text-sm"
                />
                <div className="text-xs text-gray-500 mt-1">
                  {message.length}/500 characters
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="px-6 pb-6">
              <div className="flex space-x-3">
                <button
                  onClick={handleCancel}
                  className="flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-semibold hover:bg-gray-200 transition-colors border border-gray-200"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleBuyNow()}
                  className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 px-4 rounded-lg font-semibold hover:from-orange-600 hover:to-red-600 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Confirm Purchase
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
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
                {product?.price && product?.flashDeals?.isActive && (
                  <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {product?.flashDeals?.discount} % OFF
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
                    onClick={handleLike}
                    className={`p-2 rounded-full transition-colors ${
                      liked
                        ? "bg-red-50 text-red-500"
                        : "bg-gray-50 text-gray-400 hover:bg-red-50 hover:text-red-500"
                    }`}>
                    <Heart
                      size={20}
                      fill={liked ? "currentColor" : "none"}
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
                    {product?.flashDeals?.isActive ? (
                      <>
                        <span className="text-3xl font-bold text-[#e1a95f]">
                          {product.flashDeals.discountPrice} DZD
                        </span>
                      </>
                    ) : (
                      <>{product.price} DZD</>
                    )}
                  </span>
                  {product?.price && product?.flashDeals?.isActive && (
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
                      {product?.rating}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">
                    ({product?.views} reviews)
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
                    disabled={product?.stock <= 0}
                    onClick={handleCartToggle}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-[#e1a95f] text-white rounded-lg font-semibold hover:bg-[#d89a4b] transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                    {inCart ? (
                      <>
                        <Trash size={20} />
                        <span>Remove from Cart</span>
                      </>
                    ) : (
                      <>
                        <ShoppingCart size={20} />
                        <span>Add to Cart</span>
                      </>
                    )
                    }
                  </button>
                  <button onClick={() => setShowAllert(true)} className="px-6 py-3 bg-[#1f3b73] text-white rounded-lg font-semibold hover:bg-[#1f3b73]/90 transition-colors">
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
                        <span>
                          {product?.supplier?.supplierProfile?.rating || "N/A"}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Truck size={16} />
                    <span>
                      {product?.supplier?.supplierProfile?.dileveryTime ||
                        "N/A"}
                    </span>
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
                  {product?.specifications.map(({ key, value }) => (
                    <div
                      key={key}
                      className="flex justify-between py-2 border-b border-gray-100">
                      <span className="font-medium text-[#1f3b73]">{key}:</span>
                      <span className="text-gray-700">{value}</span>
                    </div>
                  ))}
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
                      {product?.rating}
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
