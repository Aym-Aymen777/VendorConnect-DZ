import { useState, useEffect, useCallback, useRef } from "react";
import {
  User,
  Edit3,
  Heart,
  ShoppingCart,
  LogOut,
  Mail,
  MapPin,
  Phone,
  Star,
  CheckCircle,
  Shield,
  Package,
  TrendingUp,
  DollarSign,
  Eye,
  Plus,
  Camera,
  Loader2,
  Trash,
  Trash2,
} from "lucide-react";

import Header from "../components/common/Header";
import { Link } from "react-router-dom";
import CombinedChartsBox from "../components/dashboard/supplier/AnalyticsCharts";
import { useAuthCheck } from "../hooks/useAuthCheck";
import useUserStore from "../store/UserStore";
import { formatDate } from "../utils/formatDate";
import { ProductMediaSlider } from "../components/ui/ProductMediaSlider";
import { toast } from "sonner";
import CartWishlistProductCard from "../components/product/CartWishlistProductCard";
import axios from "../api/axios";

// Sample data for supplier
const supplierStats = {
  totalProducts: 45,
  totalSales: 15420,
  monthlyRevenue: 3250,
  activeOrders: 12,
};

export default function Profile() {
  const [tab, setTab] = useState("overview");
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);

  // const [loading, setLoading] = useState(false);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [productsLoading, setProductsLoading] = useState(false);
  const [cartLoaded, setCartLoaded] = useState(false);
  const [wishlistLoaded, setWishlistLoaded] = useState(false);

  // Avatar upload states
  const [avatarUploading, setAvatarUploading] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const avatarRef = useRef(null);

  const { user, setUser } = useAuthCheck();
  const {
    getOrders,
    getProducts,
    updateUser,
    cartProducts,
    likedProducts,
    listMyCartAndWishlist,
  } = useUserStore();

  // Convert file to base64 for backend
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  // Handle avatar file selection
  const handleAvatarChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size must be less than 5MB");
      return;
    }

    setAvatarUploading(true);
    try {
      // Convert file to base64
      const base64Image = await convertToBase64(file);

      // Create preview
      setAvatarPreview(base64Image);

      // Update user profile with new avatar using your backend
      const updatedUser = await updateUser({
        profile: {
          ...user?.profile,
          avatar: base64Image,
        },
      });

      // Update local user state
      if (setUser) {
        setUser(updatedUser);
      }
      setAvatarPreview(null);

      toast.success("Avatar updated successfully!");
    } catch (error) {
      console.error("Avatar upload failed:", error);
      toast.error("Failed to update avatar. Please try again.");
      setAvatarPreview(null);
    } finally {
      setAvatarUploading(false);
      // Reset file input
      if (avatarRef.current) {
        avatarRef.current.value = "";
      }
    }
  };

  // Trigger file input click
  const handleAvatarClick = () => {
    avatarRef.current?.click();
  };

  const handleGetOrders = useCallback(async () => {
    if (ordersLoading) return;
    setOrdersLoading(true);
    try {
      const fetchedOrders = await getOrders();
      setOrders(fetchedOrders || []);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch orders");
      setOrders([]);
    } finally {
      setOrdersLoading(false);
    }
  }, [getOrders]);

  const handleGetProducts = useCallback(async () => {
    if (productsLoading) return;
    setProductsLoading(true);
    try {
      const fetchedProducts = await getProducts();
      setProducts(fetchedProducts || []);
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    } finally {
      setProductsLoading(false);
    }
  }, [getProducts]);

  useEffect(() => {
    if (tab === "orders") {
      handleGetOrders();
    }
  }, [tab, handleGetOrders]);

  useEffect(() => {
    if (tab === "products" && user?.role === "supplier") {
      handleGetProducts();
    }
  }, [tab, handleGetProducts, user?.role]);

const  handleDeleteOrder = async (orderId) => {
  if (
    !window.confirm(
      "⚠️ Are you sure you want to delete this order? This action cannot be undone."
    )
  ) {
    toast.info("Order deletion cancelled.");
    return;
  }
  try {
    await axios.delete(`/api/v1/quotation/delete/${orderId}`);
    toast.success("Order deleted successfully!");
    handleGetOrders();
  } catch (error) {
    console.error("Error deleting order:", error);
    toast.error("Failed to delete order. Please try again.");
  }
};

  const getTabOptions = () => {
    if (user?.role === "supplier") {
      return [
        { key: "overview", label: "Dashboard" },
        { key: "products", label: "My Products" },
        { key: "orders", label: "Orders" },
        { key: "analytics", label: "Analytics" },
      ];
    } else {
      return [
        { key: "overview", label: "Overview" },
        { key: "orders", label: "My Orders" },
        { key: "favorites", label: "Cart" },
        { key: "wishlist", label: "Wishlist" },
      ];
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      const loadCartAndWishlist = async () => {
        try {
          // Call only if not loaded yet
          if (tab === "favorites" && !cartLoaded) {
            await listMyCartAndWishlist();
            setCartLoaded(true);
          } else if (tab === "wishlist" && !wishlistLoaded) {
            await listMyCartAndWishlist();
            setWishlistLoaded(true);
          }
        } catch (error) {
          console.error("Failed to load cart/wishlist:", error);
        }
      };

      if (tab === "favorites" || tab === "wishlist") {
        loadCartAndWishlist();
      }
    }, 300); // 300ms debounce

    return () => clearTimeout(timeout);
  }, [tab, cartLoaded, wishlistLoaded, listMyCartAndWishlist]);

  const renderSupplierOverview = () => (
    <div className="space-y-6">
      <h3 className="text-xl lg:text-2xl font-bold text-[#1f3b73] mb-4">
        Supplier Dashboard
      </h3>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 lg:p-6 rounded-xl shadow">
          <div className="flex items-center gap-3">
            <Package className="text-[#e1a95f]" size={24} />
            <div>
              <div className="text-lg lg:text-2xl font-bold text-[#1f3b73]">
                {user.profile.products.length}
              </div>
              <div className="text-xs lg:text-sm text-gray-500">Products</div>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 lg:p-6 rounded-xl shadow">
          <div className="flex items-center gap-3">
            <TrendingUp className="text-[#e1a95f]" size={24} />
            <div>
              <div className="text-lg lg:text-2xl font-bold text-[#1f3b73]">
                {supplierStats.totalSales}
              </div>
              <div className="text-xs lg:text-sm text-gray-500">
                Total Sales
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 lg:p-6 rounded-xl shadow">
          <div className="flex items-center gap-3">
            <DollarSign className="text-[#e1a95f]" size={24} />
            <div>
              <div className="text-lg lg:text-2xl font-bold text-[#1f3b73]">
                ${supplierStats.monthlyRevenue}
              </div>
              <div className="text-xs lg:text-sm text-gray-500">This Month</div>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 lg:p-6 rounded-xl shadow">
          <div className="flex items-center gap-3">
            <ShoppingCart className="text-[#e1a95f]" size={24} />
            <div>
              <div className="text-lg lg:text-2xl font-bold text-[#1f3b73]">
                {supplierStats.activeOrders}
              </div>
              <div className="text-xs lg:text-sm text-gray-500">
                Active Orders
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 lg:p-6 rounded-xl shadow">
        <h4 className="text-lg font-semibold text-[#1f3b73] mb-4">
          Quick Actions
        </h4>
        <div className="flex flex-wrap gap-3">
          <Link
            to="/product/add"
            className="inline-flex items-center gap-2 bg-[#e1a95f] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#d89a4b] transition-colors">
            <Plus size={18} /> Add Product
          </Link>
          <Link
            to="/manage-orders"
            className="inline-flex items-center gap-2 bg-[#1f3b73] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#16305a] transition-colors">
            <Package size={18} /> Manage Orders
          </Link>
        </div>
      </div>
    </div>
  );

  const renderConsumerOverview = () => (
    <div className="space-y-6">
      <h3 className="text-xl lg:text-2xl font-bold text-[#1f3b73] mb-4">
        Welcome To Our Community, {user?.name}!
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        <div className="bg-white p-4 lg:p-6 rounded-xl shadow">
          <div className="flex items-center gap-3 mb-2">
            <ShoppingCart className="text-[#e1a95f]" size={24} />
            <h4 className="font-semibold text-[#1f3b73]">Recent Orders</h4>
          </div>
          <p className="text-2xl lg:text-3xl font-bold text-[#1f3b73]">
            {orders.length}
          </p>
          <p className="text-sm text-gray-500">This month</p>
        </div>

        <div className="bg-white p-4 lg:p-6 rounded-xl shadow">
          <div className="flex items-center gap-3 mb-2">
            <Heart className="text-[#e1a95f]" size={24} />
            <h4 className="font-semibold text-[#1f3b73]">Favorites</h4>
          </div>
          <p className="text-2xl lg:text-3xl font-bold text-[#1f3b73]">
            {user?.wishlist.length}
          </p>
          <p className="text-sm text-gray-500">Saved items</p>
        </div>

        <div className="bg-white p-4 lg:p-6 rounded-xl shadow md:col-span-2 lg:col-span-1">
          <div className="flex items-center gap-3 mb-2">
            <Star className="text-[#e1a95f]" size={24} />
            <h4 className="font-semibold text-[#1f3b73]">Your Rating</h4>
          </div>
          <p className="text-2xl lg:text-3xl font-bold text-[#1f3b73]">
            {user?.rating || "N/A"}
          </p>
          <p className="text-sm text-gray-500">Average rating</p>
        </div>
      </div>

      <div className="bg-white p-4 lg:p-6 rounded-xl shadow">
        <h4 className="text-lg font-semibold text-[#1f3b73] mb-4">
          Recent Activity
        </h4>
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 bg-[#f4f2ed] rounded-lg">
            <ShoppingCart className="text-[#e1a95f]" size={20} />
            <div className="flex-1">
              <p className="font-medium text-[#1f3b73]">
                Order #ORD-2024-002 is being processed
              </p>
              <p className="text-sm text-gray-500">2 hours ago</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-[#f4f2ed] rounded-lg">
            <Heart className="text-[#e1a95f]" size={20} />
            <div className="flex-1">
              <p className="font-medium text-[#1f3b73]">
                Added Modern Sofa to favorites
              </p>
              <p className="text-sm text-gray-500">1 day ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSupplierProducts = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h3 className="text-xl lg:text-2xl font-bold text-[#1f3b73]">
          My Products
        </h3>
        <Link
          to="/product/add"
          className="inline-flex items-center gap-2 bg-[#e1a95f] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#d89a4b] transition-colors">
          <Plus size={18} /> Add New Product
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-xl shadow p-4 lg:p-6">
            <ProductMediaSlider media={product.media} title={product.title} />
            <h4 className="font-semibold text-[#1f3b73] mb-2">
              {product.title}
            </h4>
            <p className="text-[#e1a95f] font-bold text-lg mb-3">
              {product.price} DZD
            </p>

            <div className="flex justify-between text-sm text-gray-600 mb-4">
              <div className="flex items-center gap-1">
                <ShoppingCart size={16} />
                <span>{product.sales} sales</span>
              </div>
              <div className="flex items-center gap-1">
                <Eye size={16} />
                <span>{product.views} views</span>
              </div>
            </div>

            <div className="flex gap-2">
              <Link to={`/product/update/${product._id}`}>
                <button className="flex-1 px-3 py-2 bg-[#1f3b73] text-white rounded-lg text-sm font-medium hover:bg-[#16305a] transition">
                  Edit
                </button>
              </Link>

              <Link to={`/product/${product._id}`}>
                <button className="flex-1 px-3 py-2 bg-[#e1a95f] text-white rounded-lg text-sm font-medium hover:bg-[#d89a4b] transition">
                  View
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderOrders = () => (
    <div className="space-y-6">
      <h3 className="text-xl lg:text-2xl font-bold text-[#1f3b73]">
        {user?.role === "supplier" ? "Customer Orders" : "My Orders"}
      </h3>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-[#f4f2ed]">
              <tr className="text-[#1f3b73]">
                <th className="py-3 px-4 text-left font-semibold">Order ID</th>
                <th className="py-3 px-4 text-left font-semibold">Date</th>
                <th className="py-3 px-4 text-left font-semibold">Status</th>
                <th className="py-3 px-4 text-left font-semibold">Amount</th>
                <th className="py-3 px-4 text-left font-semibold">Items</th>
                <th className="py-3 px-4 text-left font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr
                  key={order._id}
                  className={`border-b last:border-b-0 ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}>
                  <td className="py-3 px-4 font-medium">
                    {order._id.slice(0, 8)}
                  </td>
                  <td className="py-3 px-4">{formatDate(order.createdAt)}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        order.status === "responded"
                          ? "bg-green-100 text-green-800"
                          : order.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-400 text-red-800"
                      }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-semibold">
                    {order.product.price} DZD
                  </td>
                  <td className="py-3 px-4">{order.product.title}</td>
                  <td className="py-3 px-4 flex  gap-2 ">
                    <Link
                      to={user.role === "supplier" ? `/order/${order._id}` : `/product/${order.product._id}`}
                      className="inline-flex items-center gap-2 w-fit">
                      <button className="px-3 py-1 bg-[#e1a95f] text-white rounded text-sm font-medium hover:bg-[#d89a4b] transition">
                        View
                      </button>
                    </Link>
                      <button
                        className="px-3 py-1 bg-red-200 text-white rounded text-sm font-medium hover:bg-red-300 transition"
                        onClick={() => handleDeleteOrder(order._id)}
                       >
                        <Trash2 size={16} className="text-red-600" />
                      </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderFavorites = () => (
    <div className="space-y-6">
      <h3 className="text-xl lg:text-2xl font-bold text-[#1f3b73]">
        Cart Products
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
        {cartProducts.map((item, index) => 
        ( 
          <CartWishlistProductCard key={index} product={item} Type="cart" />
        ))}
      </div>
    </div>
  );

  const renderWishlist = () => (
    <div className="space-y-6">
      <h3 className="text-xl lg:text-2xl font-bold text-[#1f3b73]">Wishlist</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
        {likedProducts.map((item, index) => (
          <CartWishlistProductCard key={index} product={item} Type="wishlist" />
        ))}
      </div>
    </div>
  );

  const renderTabContent = () => {
    if (user?.role === "supplier") {
      switch (tab) {
        case "overview":
          return renderSupplierOverview();
        case "products":
          return renderSupplierProducts();
        case "orders":
          return renderOrders();
        case "analytics":
          return <CombinedChartsBox />;
        default:
          return renderSupplierOverview();
      }
    } else {
      switch (tab) {
        case "overview":
          return renderConsumerOverview();
        case "orders":
          return renderOrders();
        case "favorites":
          return renderFavorites();
        case "wishlist":
          return renderWishlist();
        default:
          return renderConsumerOverview();
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f2ed]">
      <Header />
      <div className="container mx-auto px-4 py-4 lg:py-8">
        <div className="flex flex-col xl:flex-row gap-6 lg:gap-8">
          {/* Sidebar/Profile Card */}
          <aside className="bg-white rounded-2xl shadow-lg p-4 lg:p-6 w-full xl:w-80 flex flex-col items-center">
            <div className="relative mb-4">
              <img
                src={
                  avatarPreview ||
                  user?.profile?.avatar ||
                  "/default-avatar.png"
                }
                alt={user?.name}
                className="w-20 h-20 lg:w-28 lg:h-28 rounded-full object-cover border-4 border-[#e1a95f]"
              />

              {/* Hidden file input */}
              <input
                type="file"
                ref={avatarRef}
                onChange={handleAvatarChange}
                accept="image/*"
                className="hidden"
              />

              {/* Upload button */}
              <button
                onClick={handleAvatarClick}
                disabled={avatarUploading}
                className="absolute -bottom-2 -right-2 bg-[#e1a95f] hover:bg-[#d89a4b] text-white p-2 rounded-full shadow-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                title="Change avatar">
                {avatarUploading ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <Camera size={16} />
                )}
              </button>

              {user?.isVerified && (
                <div className="absolute -top-1 -right-1 bg-[#1f3b73] rounded-full p-1">
                  <CheckCircle size={16} className="text-white" />
                </div>
              )}
            </div>

            <h2 className="text-xl lg:text-2xl font-bold text-[#1f3b73] mb-1 text-center">
              {user?.name}
            </h2>

            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center gap-1 text-[#e1a95f]">
                <Star size={16} />
                <span className="font-semibold text-sm lg:text-base">
                  {user?.rating}
                </span>
              </div>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  user?.role === "supplier"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-green-100 text-green-800"
                }`}>
                {user?.role === "supplier" ? "Supplier" : "Customer"}
              </span>
            </div>

            {!user?.isVerified && (
              <Link
                to="/verify"
                className="inline-flex items-center gap-1 text-[#e1a95f] hover:text-[#d89a4b] text-sm font-medium mb-2 transition-colors">
                <Shield size={14} />
                Verify Account
              </Link>
            )}

            <p className="text-gray-600 text-center text-sm lg:text-base mb-3">
              {user?.profile.bio}
            </p>

            <div className="flex gap-4 flex-wrap items-center">
              {user?.profile?.socialLinks?.length > 0 &&
                user.profile.socialLinks.map((link, index) => {
                  const colorMap = {
                    Facebook: "text-[#1877F2]",
                    X: "text-[#1DA1F2]",
                    Instagram: "text-[#E1306C]",
                    Linkedin: "text-[#0077B5]",
                    Youtube: "text-[#FF0000]",
                    Tiktok: "text-[#010101]",
                  };

                  const getIcon = (platform) => {
                    switch (platform?.toLowerCase()) {
                      case "facebook":
                        return "M22.675 0H1.325C.593 0 0 .593 0 1.326v21.348C0 23.406.593 24 1.325 24h11.495v-9.294H9.691v-3.622h3.129V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.794.143v3.24l-1.918.001c-1.504 0-1.796.715-1.796 1.763v2.311h3.59l-.467 3.622h-3.123V24h6.116C23.407 24 24 23.406 24 22.674V1.326C24 .593 23.407 0 22.675 0z";
                      case "instagram":
                        return "M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zm8.75 2a.75.75 0 0 1 .75.75v.5a.75.75 0 0 1-1.5 0v-.5a.75.75 0 0 1 .75-.75zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7z";
                      case "x":
                        return "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z";
                      case "youtube":
                        return "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z";
                      case "linkedin":
                        return "M20.447 20.452h-3.554v-5.569c0-1.327-.472-2.234-1.654-2.234-.902 0-1.438.607-1.674 1.194-.086.209-.108.5-.108.792v5.817h-3.553s.047-9.44 0-10.417h3.554v1.475c.472-.731 1.316-1.775 3.202-1.775 2.337 0 4.092 1.528 4.092 4.812v6.905zM5.337 7.433c-1.144 0-1.892-.755-1.892-1.699 0-.962.767-1.699 1.934-1.699 1.166 0 1.891.737 1.908 1.699 0 .944-.742 1.699-1.95 1.699zM3.675 20.452h3.553V10.035H3.675v10.417zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.226.792 24 1.771 24h20.451C23.2 24 24 23.226 24 22.271V1.729C24 .774 23.2 0 22.225 0z";
                      case "tiktok":
                        return "M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z";
                      default:
                        return "";
                    }
                  };

                  const iconPath = getIcon(link.platform);
                  if (!iconPath) return null;
                  return (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group p-2 rounded-full hover:bg-white/20 bg-white/10 ${
                        colorMap[link.platform] ?? "text-gray-500"
                      }`}>
                      <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-5 h-5 transition-all duration-200 ease-in-out group-hover:scale-110">
                        <path d={iconPath} />
                      </svg>
                    </a>
                  );
                })}
            </div>

            <div className="w-full border-t border-gray-200 my-4" />

            <div className="w-full flex flex-col gap-2 text-sm text-gray-700 mb-6">
              <div className="flex items-center gap-2">
                <Mail size={14} className="flex-shrink-0" />
                <span className="truncate">{user?.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={14} className="flex-shrink-0" />
                <span>{user?.profile.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={14} className="flex-shrink-0" />
                <span>{user?.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <User size={14} className="flex-shrink-0" />
                <span>
                  Member since {formatDate(user?.createdAt).split("-")[0]}
                </span>
              </div>
            </div>

            <div className="w-full space-y-3">
              <Link
                to="/account/account-infos"
                className="w-full inline-flex items-center justify-center gap-2 bg-[#e1a95f] text-white font-semibold px-4 py-2 lg:py-3 rounded-lg shadow hover:bg-[#d89a4b] transition-colors text-sm lg:text-base">
                <Edit3 size={16} /> Edit Profile
              </Link>
              <button className="w-full inline-flex items-center justify-center gap-2 bg-[#1f3b73] text-white font-semibold px-4 py-2 lg:py-3 rounded-lg shadow hover:bg-[#16305a] transition-colors text-sm lg:text-base">
                <LogOut size={16} /> Logout
              </button>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {/* Tabs */}
            <div className="flex gap-2 lg:gap-4 mb-6 overflow-x-auto pb-2">
              {getTabOptions().map((option) => (
                <button
                  key={option.key}
                  className={`px-3 lg:px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition-colors text-sm lg:text-base ${
                    tab === option.key
                      ? "bg-[#1f3b73] text-white"
                      : "bg-white text-[#1f3b73] hover:bg-[#e1a95f]/10"
                  }`}
                  onClick={() => setTab(option.key)}>
                  {option.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="min-h-[400px]">{renderTabContent()}</div>
          </main>
        </div>
      </div>
    </div>
  );
}
