import { useState } from "react";
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
  Users,
  DollarSign,
  Eye,
  Plus
} from "lucide-react";
import Header from "../components/common/Header";
import { Link } from "react-router-dom";
import CombinedChartsBox from "../components/dashboard/supplier/AnalyticsCharts";

// Mock Header component for demo

// Mock Link component that simulates navigation


const user = {
  name: "Jane Doe",
  email: "jane.doe@email.com",
  avatar: "/avatars/user1.jpg",
  location: "New York, USA",
  phone: "+1 555-123-4567",
  memberSince: "2022-03-15",
  bio: "Home decor enthusiast. Love to shop and share ideas!",
  rating: 4.8,
  followers: 1200,
  following: 180,
  isVerified: false,
  role: "supplier" // or "supplier"
};

// Sample data for supplier
const supplierStats = {
  totalProducts: 45,
  totalSales: 15420,
  monthlyRevenue: 3250,
  activeOrders: 12
};

const supplierProducts = [
  { id: 1, name: "Modern Sofa Collection", price: "$499-899", image: "/products/sofa.jpg", sales: 45, views: 320 },
  { id: 2, name: "Wooden Coffee Tables", price: "$199-399", image: "/products/coffee-table.jpg", sales: 28, views: 180 }
];

// Sample data for consumer
const orders = [
  { id: "#ORD-2024-001", date: "2024-01-15", status: "Delivered", amount: "$299.99", items: 3 },
  { id: "#ORD-2024-002", date: "2024-01-20", status: "Processing", amount: "$149.50", items: 1 },
  { id: "#ORD-2024-003", date: "2024-01-25", status: "Shipped", amount: "$89.99", items: 2 }
];

const favorites = [
  { name: "Modern Sofa", price: "$499", image: "/products/sofa.jpg" },
  { name: "Wooden Coffee Table", price: "$199", image: "/products/coffee-table.jpg" },
  { name: "Designer Lamp", price: "$89", image: "/products/lamp.jpg" },
  { name: "Vintage Chair", price: "$249", image: "/products/chair.jpg" }
];

export default function Profile() {
  const [tab, setTab] = useState("overview");

  const getTabOptions = () => {
    if (user.role === "supplier") {
      return [
        { key: "overview", label: "Dashboard" },
        { key: "products", label: "My Products" },
        { key: "orders", label: "Orders" },
        { key: "analytics", label: "Analytics" }
      ];
    } else {
      return [
        { key: "overview", label: "Overview" },
        { key: "orders", label: "My Orders" },
        { key: "favorites", label: "Favorites" },
        { key: "wishlist", label: "Wishlist" }
      ];
    }
  };

  const renderSupplierOverview = () => (
    <div className="space-y-6">
      <h3 className="text-xl lg:text-2xl font-bold text-[#1f3b73] mb-4">Supplier Dashboard</h3>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 lg:p-6 rounded-xl shadow">
          <div className="flex items-center gap-3">
            <Package className="text-[#e1a95f]" size={24} />
            <div>
              <div className="text-lg lg:text-2xl font-bold text-[#1f3b73]">{supplierStats.totalProducts}</div>
              <div className="text-xs lg:text-sm text-gray-500">Products</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 lg:p-6 rounded-xl shadow">
          <div className="flex items-center gap-3">
            <TrendingUp className="text-[#e1a95f]" size={24} />
            <div>
              <div className="text-lg lg:text-2xl font-bold text-[#1f3b73]">{supplierStats.totalSales}</div>
              <div className="text-xs lg:text-sm text-gray-500">Total Sales</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 lg:p-6 rounded-xl shadow">
          <div className="flex items-center gap-3">
            <DollarSign className="text-[#e1a95f]" size={24} />
            <div>
              <div className="text-lg lg:text-2xl font-bold text-[#1f3b73]">${supplierStats.monthlyRevenue}</div>
              <div className="text-xs lg:text-sm text-gray-500">This Month</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 lg:p-6 rounded-xl shadow">
          <div className="flex items-center gap-3">
            <ShoppingCart className="text-[#e1a95f]" size={24} />
            <div>
              <div className="text-lg lg:text-2xl font-bold text-[#1f3b73]">{supplierStats.activeOrders}</div>
              <div className="text-xs lg:text-sm text-gray-500">Active Orders</div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 lg:p-6 rounded-xl shadow">
        <h4 className="text-lg font-semibold text-[#1f3b73] mb-4">Quick Actions</h4>
        <div className="flex flex-wrap gap-3">
          <Link
            to="/add-product"
            className="inline-flex items-center gap-2 bg-[#e1a95f] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#d89a4b] transition-colors"
          >
            <Plus size={18} /> Add Product
          </Link>
          <Link
            to="/manage-orders"
            className="inline-flex items-center gap-2 bg-[#1f3b73] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#16305a] transition-colors"
          >
            <Package size={18} /> Manage Orders
          </Link>
        </div>
      </div>
    </div>
  );

  const renderConsumerOverview = () => (
    <div className="space-y-6">
      <h3 className="text-xl lg:text-2xl font-bold text-[#1f3b73] mb-4">Welcome back, {user.name}!</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        <div className="bg-white p-4 lg:p-6 rounded-xl shadow">
          <div className="flex items-center gap-3 mb-2">
            <ShoppingCart className="text-[#e1a95f]" size={24} />
            <h4 className="font-semibold text-[#1f3b73]">Recent Orders</h4>
          </div>
          <p className="text-2xl lg:text-3xl font-bold text-[#1f3b73]">{orders.length}</p>
          <p className="text-sm text-gray-500">This month</p>
        </div>
        
        <div className="bg-white p-4 lg:p-6 rounded-xl shadow">
          <div className="flex items-center gap-3 mb-2">
            <Heart className="text-[#e1a95f]" size={24} />
            <h4 className="font-semibold text-[#1f3b73]">Favorites</h4>
          </div>
          <p className="text-2xl lg:text-3xl font-bold text-[#1f3b73]">{favorites.length}</p>
          <p className="text-sm text-gray-500">Saved items</p>
        </div>
        
        <div className="bg-white p-4 lg:p-6 rounded-xl shadow md:col-span-2 lg:col-span-1">
          <div className="flex items-center gap-3 mb-2">
            <Star className="text-[#e1a95f]" size={24} />
            <h4 className="font-semibold text-[#1f3b73]">Your Rating</h4>
          </div>
          <p className="text-2xl lg:text-3xl font-bold text-[#1f3b73]">{user.rating}</p>
          <p className="text-sm text-gray-500">Average rating</p>
        </div>
      </div>

      <div className="bg-white p-4 lg:p-6 rounded-xl shadow">
        <h4 className="text-lg font-semibold text-[#1f3b73] mb-4">Recent Activity</h4>
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 bg-[#f4f2ed] rounded-lg">
            <ShoppingCart className="text-[#e1a95f]" size={20} />
            <div className="flex-1">
              <p className="font-medium text-[#1f3b73]">Order #ORD-2024-002 is being processed</p>
              <p className="text-sm text-gray-500">2 hours ago</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-[#f4f2ed] rounded-lg">
            <Heart className="text-[#e1a95f]" size={20} />
            <div className="flex-1">
              <p className="font-medium text-[#1f3b73]">Added Modern Sofa to favorites</p>
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
        <h3 className="text-xl lg:text-2xl font-bold text-[#1f3b73]">My Products</h3>
        <Link
          to="/add-product"
          className="inline-flex items-center gap-2 bg-[#e1a95f] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#d89a4b] transition-colors"
        >
          <Plus size={18} /> Add New Product
        </Link>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
        {supplierProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-xl shadow p-4 lg:p-6">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-32 lg:h-40 object-cover rounded-lg mb-4"
            />
            <h4 className="font-semibold text-[#1f3b73] mb-2">{product.name}</h4>
            <p className="text-[#e1a95f] font-bold text-lg mb-3">{product.price}</p>
            
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
              <button className="flex-1 px-3 py-2 bg-[#1f3b73] text-white rounded-lg text-sm font-medium hover:bg-[#16305a] transition">
                Edit
              </button>
              <button className="flex-1 px-3 py-2 bg-[#e1a95f] text-white rounded-lg text-sm font-medium hover:bg-[#d89a4b] transition">
                View
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderOrders = () => (
    <div className="space-y-6">
      <h3 className="text-xl lg:text-2xl font-bold text-[#1f3b73]">
        {user.role === "supplier" ? "Customer Orders" : "My Orders"}
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
                <tr key={order.id} className={`border-b last:border-b-0 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                  <td className="py-3 px-4 font-medium">{order.id}</td>
                  <td className="py-3 px-4">{order.date}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                      order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-semibold">{order.amount}</td>
                  <td className="py-3 px-4">{order.items}</td>
                  <td className="py-3 px-4">
                    <button className="px-3 py-1 bg-[#e1a95f] text-white rounded text-sm font-medium hover:bg-[#d89a4b] transition">
                      View
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
      <h3 className="text-xl lg:text-2xl font-bold text-[#1f3b73]">Favorite Products</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
        {favorites.map((item, index) => (
          <div key={index} className="bg-white rounded-xl shadow p-4 flex flex-col">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-32 lg:h-40 object-cover rounded-lg mb-3"
            />
            <h4 className="font-semibold text-[#1f3b73] mb-2 flex-1">{item.name}</h4>
            <p className="text-[#e1a95f] font-bold text-lg mb-3">{item.price}</p>
            <div className="flex gap-2">
              <button className="flex-1 px-3 py-2 bg-[#e1a95f] text-white rounded-lg text-sm font-medium hover:bg-[#d89a4b] transition">
                View
              </button>
              <button className="px-3 py-2 bg-red-100 text-red-600 rounded-lg text-sm font-medium hover:bg-red-200 transition">
                <Heart size={16} fill="currentColor" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderTabContent = () => {
    if (user.role === "supplier") {
      switch (tab) {
        case "overview":
          return renderSupplierOverview();
        case "products":
          return renderSupplierProducts();
        case "orders":
          return renderOrders();
        case "analytics":
          return <CombinedChartsBox/>
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
          return (
            <div className="text-center py-12">
              <Heart size={48} className="text-[#e1a95f] mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-[#1f3b73] mb-2">Wishlist Coming Soon</h3>
              <p className="text-gray-600">Save items for later and track price changes.</p>
            </div>
          );
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
                src={user.avatar}
                alt={user.name}
                className="w-20 h-20 lg:w-28 lg:h-28 rounded-full object-cover border-4 border-[#e1a95f]"
              />
              {user.isVerified && (
                <div className="absolute -top-1 -right-1 bg-[#1f3b73] rounded-full p-1">
                  <CheckCircle size={16} className="text-white" />
                </div>
              )}
            </div>
            
            <h2 className="text-xl lg:text-2xl font-bold text-[#1f3b73] mb-1 text-center">{user.name}</h2>
            
            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center gap-1 text-[#e1a95f]">
                <Star size={16} />
                <span className="font-semibold text-sm lg:text-base">{user.rating}</span>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                user.role === 'supplier' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
              }`}>
                {user.role === 'supplier' ? 'Supplier' : 'Customer'}
              </span>
            </div>

            {!user.isVerified && (
              <Link
                to="/verify"
                className="inline-flex items-center gap-1 text-[#e1a95f] hover:text-[#d89a4b] text-sm font-medium mb-2 transition-colors"
              >
                <Shield size={14} />
                Verify Account
              </Link>
            )}
            
            <p className="text-gray-600 text-center text-sm lg:text-base mb-3">{user.bio}</p>
            
            <div className="flex gap-6 mb-4">
              <div className="text-center">
                <div className="font-bold text-[#1f3b73] text-lg lg:text-xl">{user.followers}</div>
                <div className="text-xs text-gray-500">Followers</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-[#1f3b73] text-lg lg:text-xl">{user.following}</div>
                <div className="text-xs text-gray-500">Following</div>
              </div>
            </div>
            
            <div className="w-full border-t border-gray-200 my-4" />
            
            <div className="w-full flex flex-col gap-2 text-sm text-gray-700 mb-6">
              <div className="flex items-center gap-2">
                <Mail size={14} className="flex-shrink-0" /> 
                <span className="truncate">{user.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={14} className="flex-shrink-0" /> 
                <span>{user.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={14} className="flex-shrink-0" /> 
                <span>{user.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <User size={14} className="flex-shrink-0" /> 
                <span>Member since {user.memberSince}</span>
              </div>
            </div>
            
            <div className="w-full space-y-3">
              <Link
                to="/account"
                className="w-full inline-flex items-center justify-center gap-2 bg-[#e1a95f] text-white font-semibold px-4 py-2 lg:py-3 rounded-lg shadow hover:bg-[#d89a4b] transition-colors text-sm lg:text-base"
              >
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
                  onClick={() => setTab(option.key)}
                >
                  {option.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="min-h-[400px]">
              {renderTabContent()}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}