import React, { useState, useRef } from "react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Users,
  ShoppingCart,
  TrendingUp,
  Package,
  MessageSquare,
  Gift,
  Settings2,
  Bell,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  Plus,
  Download,
  Calendar,
  DollarSign,
  Activity,
  Award,
  Star,
  Mail,
  Phone,
  MapPin,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  BarChart3,
  PieChart,
  Target,
  Zap,
} from "lucide-react";
import usePDFExport from "../hooks/useExportToPdf";
import CategoryManagement from "../components/dashboard/admin/CategoryManagement";
const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedItems, setSelectedItems] = useState([]);
  const contentRef = useRef();
  const { exportToPDF } = usePDFExport();


  // Sample data for charts
  const areaData = [
    { name: "Jan", sales: 4000, revenue: 2400, orders: 240 },
    { name: "Feb", sales: 3000, revenue: 1398, orders: 221 },
    { name: "Mar", sales: 2000, revenue: 9800, orders: 229 },
    { name: "Apr", sales: 2780, revenue: 3908, orders: 200 },
    { name: "May", sales: 1890, revenue: 4800, orders: 218 },
    { name: "Jun", sales: 2390, revenue: 3800, orders: 250 },
  ];

  const barData = [
    { name: "Electronics", sales: 4000, target: 3500 },
    { name: "Clothing", sales: 3000, target: 2800 },
    { name: "Books", sales: 2000, target: 2200 },
    { name: "Home", sales: 2780, target: 2500 },
    { name: "Sports", sales: 1890, target: 2100 },
    { name: "Beauty", sales: 2390, target: 2300 },
  ];

  const radarData = [
    { subject: "Sales", A: 120, B: 110, fullMark: 150 },
    { subject: "Marketing", A: 98, B: 130, fullMark: 150 },
    { subject: "Development", A: 86, B: 130, fullMark: 150 },
    { subject: "Customer Support", A: 99, B: 100, fullMark: 150 },
    { subject: "Information Technology", A: 85, B: 90, fullMark: 150 },
    { subject: "Administration", A: 65, B: 85, fullMark: 150 },
  ];

  const scatterData = [
    { x: 100, y: 200, z: 200 },
    { x: 120, y: 100, z: 260 },
    { x: 170, y: 300, z: 400 },
    { x: 140, y: 250, z: 280 },
    { x: 150, y: 400, z: 500 },
    { x: 110, y: 280, z: 200 },
  ];

  // Sample data for tables
  const usersData = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      role: "Customer",
      status: "Active",
      joined: "2024-01-15",
      orders: 12,
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      role: "Admin",
      status: "Active",
      joined: "2024-02-20",
      orders: 8,
    },
    {
      id: 3,
      name: "Bob Johnson",
      email: "bob@example.com",
      role: "Customer",
      status: "Inactive",
      joined: "2024-03-10",
      orders: 3,
    },
    {
      id: 4,
      name: "Alice Brown",
      email: "alice@example.com",
      role: "Moderator",
      status: "Active",
      joined: "2024-01-05",
      orders: 15,
    },
  ];

  const requestsData = [
    {
      id: 1,
      user: "John Doe",
      type: "Support",
      subject: "Login Issue",
      status: "Pending",
      date: "2024-06-20",
      priority: "High",
    },
    {
      id: 2,
      user: "Jane Smith",
      type: "Refund",
      subject: "Product Return",
      status: "Approved",
      date: "2024-06-19",
      priority: "Medium",
    },
    {
      id: 3,
      user: "Bob Johnson",
      type: "Technical",
      subject: "Bug Report",
      status: "In Progress",
      date: "2024-06-18",
      priority: "Low",
    },
    {
      id: 4,
      user: "Alice Brown",
      type: "Feature",
      subject: "New Feature Request",
      status: "Rejected",
      date: "2024-06-17",
      priority: "Medium",
    },
  ];

  const promotionsData = [
    {
      id: 1,
      name: "Summer Sale",
      discount: "25%",
      code: "SUMMER25",
      status: "Active",
      startDate: "2024-06-01",
      endDate: "2024-08-31",
      used: 156,
    },
    {
      id: 2,
      name: "New User Discount",
      discount: "10%",
      code: "WELCOME10",
      status: "Active",
      startDate: "2024-01-01",
      endDate: "2024-12-31",
      used: 89,
    },
    {
      id: 3,
      name: "Black Friday",
      discount: "50%",
      code: "BLACK50",
      status: "Expired",
      startDate: "2024-11-24",
      endDate: "2024-11-30",
      used: 234,
    },
    {
      id: 4,
      name: "Student Discount",
      discount: "15%",
      code: "STUDENT15",
      status: "Active",
      startDate: "2024-03-01",
      endDate: "2024-05-31",
      used: 67,
    },
  ];

  const productsData = [
    {
      id: 1,
      name: "Laptop Pro",
      category: "Electronics",
      price: 1299,
      stock: 45,
      status: "Active",
      rating: 4.5,
      sales: 123,
    },
    {
      id: 2,
      name: "Wireless Headphones",
      category: "Electronics",
      price: 199,
      stock: 0,
      status: "Out of Stock",
      rating: 4.2,
      sales: 89,
    },
    {
      id: 3,
      name: "Running Shoes",
      category: "Sports",
      price: 129,
      stock: 78,
      status: "Active",
      rating: 4.7,
      sales: 156,
    },
    {
      id: 4,
      name: "Coffee Maker",
      category: "Home",
      price: 89,
      stock: 23,
      status: "Low Stock",
      rating: 4.1,
      sales: 67,
    },
  ];

  // Navigation Sidebar Component
  const NavigationSidebar = () => (
    <div className="w-64 h-screen bg-[#1f3b73] text-white fixed left-0 top-0 overflow-y-auto">
      <div className="p-6 border-b border-[#e1a95f]">
        <h1 className="text-2xl font-bold text-[#e1a95f]">Admin Panel</h1>
        <p className="text-sm text-gray-300 mt-1">Management Dashboard</p>
      </div>

      <nav className="mt-6">
        {[
          { id: "dashboard", label: "Dashboard", icon: BarChart3 },
          { id: "users", label: "User Management", icon: Users },
          { id: "requests", label: "Requests Management", icon: MessageSquare },
          { id: "promotions", label: "Promotion Management", icon: Gift },
          { id: "products", label: "Product Management", icon: Package },
          { id: "categories", label: "Manage Categories", icon: Star },
          { id: "analytics", label: "Analytics", icon: TrendingUp },
          { id: "orders", label: "Order Management", icon: ShoppingCart },
          { id: "reports", label: "Reports", icon: PieChart },
          { id: "settings", label: "Settings", icon: Settings2 },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center px-6 py-3 text-left hover:bg-[#e1a95f] hover:text-[#1f3b73] transition-colors ${
                activeTab === item.id
                  ? "bg-[#e1a95f] text-[#1f3b73] border-r-4 border-[#f4f2ed]"
                  : ""
              }`}>
              <Icon className="w-5 h-5 mr-3" />
              {item.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
 

 const handleSearch = () => {
  let filteredData = [];
  switch (activeTab) {
    case "users":
      filteredData = usersData.filter((item) =>
        Object.values(item).some((val) =>
          String(val).toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
      // setData for users if you have a state for it, e.g. setUsers(filteredData);
      break;
    case "requests":
      filteredData = requestsData.filter((item) =>
        Object.values(item).some((val) =>
          String(val).toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
      // setData for requests if you have a state for it, e.g. setRequests(filteredData);
      break;
    case "promotions":
      filteredData = promotionsData.filter((item) =>
        Object.values(item).some((val) =>
          String(val).toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
      // setData for promotions if you have a state for it, e.g. setPromotions(filteredData);
      break;
    case "products":
      filteredData = productsData.filter((item) =>
        Object.values(item).some((val) =>
          String(val).toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
      // setData for products if you have a state for it, e.g. setProducts(filteredData);
      break;
    default:
      // Optionally handle other tabs
      break;
  }
};
  // Header Component
  const Header = () => (
    <div className="ml-64 bg-[#f4f2ed] border-b border-[#e1a95f] px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h2 className="text-2xl font-bold text-[#1f3b73] capitalize">
            {activeTab.replace("-", " ")}
          </h2>
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-3 text-[#1f3b73]" />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="pl-10 pr-4 py-2 border border-[#e1a95f] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1f3b73]"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button className="relative p-2 bg-[#1f3b73] text-white rounded-lg hover:bg-opacity-90">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </button>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-[#e1a95f] rounded-full flex items-center justify-center">
              <Users className="w-4 h-4 text-[#1f3b73]" />
            </div>
            <span className="text-[#1f3b73] font-medium">Admin User</span>
          </div>
        </div>
      </div>
    </div>
  );

  // Dashboard Statistics Cards Component
  const StatsCards = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {[
        {
          title: "Total Users",
          value: "12,345",
          change: "+12%",
          icon: Users,
          color: "bg-blue-500",
        },
        {
          title: "Total Orders",
          value: "8,765",
          change: "+8%",
          icon: ShoppingCart,
          color: "bg-green-500",
        },
        {
          title: "Revenue",
          value: "$45,678",
          change: "+15%",
          icon: DollarSign,
          color: "bg-[#e1a95f]",
        },
        {
          title: "Products",
          value: "234",
          change: "+3%",
          icon: Package,
          color: "bg-purple-500",
        },
      ].map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-lg border border-[#e1a95f]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-[#1f3b73]">
                  {stat.value}
                </p>
                <p className="text-sm text-green-600">
                  {stat.change} from last month
                </p>
              </div>
              <div className={`p-3 rounded-full ${stat.color}`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );

  // Dashboard Charts Component
  const DashboardCharts = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      {/* Area Chart */}
      <div className="bg-white p-6 rounded-lg shadow-lg border border-[#e1a95f]">
        <h3 className="text-lg font-semibold text-[#1f3b73] mb-4">
          Sales & Revenue Trend
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={areaData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area
              type="monotone"
              dataKey="sales"
              stackId="1"
              stroke="#1f3b73"
              fill="#1f3b73"
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stackId="1"
              stroke="#e1a95f"
              fill="#e1a95f"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Bar Chart */}
      <div className="bg-white p-6 rounded-lg shadow-lg border border-[#e1a95f]">
        <h3 className="text-lg font-semibold text-[#1f3b73] mb-4">
          Category Performance
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="sales" fill="#1f3b73" />
            <Bar dataKey="target" fill="#e1a95f" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Radar Chart */}
      <div className="bg-white p-6 rounded-lg shadow-lg border border-[#e1a95f]">
        <h3 className="text-lg font-semibold text-[#1f3b73] mb-4">
          Department Performance
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <RadarChart data={radarData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" />
            <PolarRadiusAxis />
            <Radar
              dataKey="A"
              stroke="#1f3b73"
              fill="#1f3b73"
              fillOpacity={0.6}
            />
            <Radar
              dataKey="B"
              stroke="#e1a95f"
              fill="#e1a95f"
              fillOpacity={0.6}
            />
            <Tooltip />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Scatter Chart */}
      <div className="bg-white p-6 rounded-lg shadow-lg border border-[#e1a95f]">
        <h3 className="text-lg font-semibold text-[#1f3b73] mb-4">
          Customer Engagement
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <ScatterChart data={scatterData}>
            <CartesianGrid />
            <XAxis dataKey="x" name="engagement" />
            <YAxis dataKey="y" name="satisfaction" />
            <Tooltip cursor={{ strokeDasharray: "3 3" }} />
            <Scatter dataKey="z" fill="#1f3b73" />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  // Table Component (Reusable)
  const TableComponent = ({ data, columns, actions = true }) => (
    <div className="bg-white rounded-lg shadow-lg border border-[#e1a95f] overflow-hidden">
      <div className="p-6 border-b border-[#e1a95f]">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-[#e1a95f] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1f3b73]">
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="pending">Pending</option>
            </select>
            <Filter className="w-5 h-5 text-[#1f3b73]" />
          </div>
          <div className="flex items-center space-x-2">
            <button className="px-4 py-2 bg-[#1f3b73] text-white rounded-lg hover:bg-opacity-90 flex items-center">
              <Plus className="w-4 h-4 mr-2" />
              Add New
            </button>
            <button
              className="px-4 py-2 bg-[#e1a95f] text-[#1f3b73] rounded-lg hover:bg-opacity-90 flex items-center"
              onClick={() => exportToPDF(contentRef, "Users.pdf")}>
              <Download className="w-4 h-4 mr-2" />
              Export
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto" ref={contentRef}>
        <table className="w-full">
          <thead className="bg-[#f4f2ed]">
            <tr>
              {actions && (
                <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-[#1f3b73] rounded"
                  />
                </th>
              )}
              {columns.map((column, index) => (
                <th
                  key={index}
                  className="px-6 py-3 text-left text-sm font-medium text-[#1f3b73] uppercase tracking-wider">
                  {column.header}
                </th>
              ))}
              {actions && (
                <th className="px-6 py-3 text-left text-sm font-medium text-[#1f3b73] uppercase tracking-wider">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e1a95f]">
            {data.map((row, index) => (
              <tr key={index} className="hover:bg-[#f4f2ed] transition-colors">
                {actions && (
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-[#1f3b73] rounded"
                    />
                  </td>
                )}
                {columns.map((column, colIndex) => (
                  <td
                    key={colIndex}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {column.render
                      ? column.render(row[column.key], row)
                      : row[column.key]}
                  </td>
                ))}
                {actions && (
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button className="text-[#1f3b73] hover:text-[#e1a95f]">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-[#1f3b73] hover:text-[#e1a95f]">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-800">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  // User Management Component
  const UserManagement = () => {
    const userColumns = [
      { key: "id", header: "ID" },
      { key: "name", header: "Name" },
      { key: "email", header: "Email" },
      { key: "role", header: "Role" },
      {
        key: "status",
        header: "Status",
        render: (status) => (
          <span
            className={`px-2 py-1 rounded-full text-xs ${
              status === "Active"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}>
            {status}
          </span>
        ),
      },
      { key: "joined", header: "Joined Date" },
      { key: "orders", header: "Orders" },
    ];

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-lg border border-[#e1a95f]">
            <div className="flex items-center">
              <Users className="w-8 h-8 text-[#1f3b73]" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-[#1f3b73]">12,345</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg border border-[#e1a95f]">
            <div className="flex items-center">
              <CheckCircle className="w-8 h-8 text-green-500" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">Active Users</p>
                <p className="text-2xl font-bold text-[#1f3b73]">11,234</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg border border-[#e1a95f]">
            <div className="flex items-center">
              <XCircle className="w-8 h-8 text-red-500" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">Inactive Users</p>
                <p className="text-2xl font-bold text-[#1f3b73]">1,111</p>
              </div>
            </div>
          </div>
        </div>

        <TableComponent data={usersData} columns={userColumns} />
      </div>
    );
  };

  // Requests Management Component
  const RequestsManagement = () => {
    const requestColumns = [
      { key: "id", header: "ID" },
      { key: "user", header: "User" },
      { key: "type", header: "Type" },
      { key: "subject", header: "Subject" },
      {
        key: "status",
        header: "Status",
        render: (status) => (
          <span
            className={`px-2 py-1 rounded-full text-xs ${
              status === "Approved"
                ? "bg-green-100 text-green-800"
                : status === "Pending"
                ? "bg-yellow-100 text-yellow-800"
                : status === "In Progress"
                ? "bg-blue-100 text-blue-800"
                : "bg-red-100 text-red-800"
            }`}>
            {status}
          </span>
        ),
      },
      { key: "date", header: "Date" },
      {
        key: "priority",
        header: "Priority",
        render: (priority) => (
          <span
            className={`px-2 py-1 rounded-full text-xs ${
              priority === "High"
                ? "bg-red-100 text-red-800"
                : priority === "Medium"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-green-100 text-green-800"
            }`}>
            {priority}
          </span>
        ),
      },
    ];

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-lg border border-[#e1a95f]">
            <div className="flex items-center">
              <MessageSquare className="w-8 h-8 text-[#1f3b73]" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">Total Requests</p>
                <p className="text-2xl font-bold text-[#1f3b73]">1,234</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg border border-[#e1a95f]">
            <div className="flex items-center">
              <Clock className="w-8 h-8 text-yellow-500" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-[#1f3b73]">123</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg border border-[#e1a95f]">
            <div className="flex items-center">
              <Activity className="w-8 h-8 text-blue-500" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">In Progress</p>
                <p className="text-2xl font-bold text-[#1f3b73]">89</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg border border-[#e1a95f]">
            <div className="flex items-center">
              <CheckCircle className="w-8 h-8 text-green-500" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-[#1f3b73]">1,022</p>
              </div>
            </div>
          </div>
        </div>

        <TableComponent data={requestsData} columns={requestColumns} />
      </div>
    );
  };

  // Promotion Management Component
  const PromotionManagement = () => {
    const promotionColumns = [
      { key: "id", header: "ID" },
      { key: "name", header: "Name" },
      { key: "discount", header: "Discount" },
      { key: "code", header: "Code" },
      {
        key: "status",
        header: "Status",
        render: (status) => (
          <span
            className={`px-2 py-1 rounded-full text-xs ${
              status === "Active"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}>
            {status}
          </span>
        ),
      },
      { key: "startDate", header: "Start Date" },
      { key: "endDate", header: "End Date" },
      { key: "used", header: "Used" },
    ];

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-lg border border-[#e1a95f]">
            <div className="flex items-center">
              <Gift className="w-8 h-8 text-[#1f3b73]" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">Total Promotions</p>
                <p className="text-2xl font-bold text-[#1f3b73]">24</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg border border-[#e1a95f]">
            <div className="flex items-center">
              <CheckCircle className="w-8 h-8 text-green-500" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">Active</p>
                <p className="text-2xl font-bold text-[#1f3b73]">18</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg border border-[#e1a95f]">
            <div className="flex items-center">
              <XCircle className="w-8 h-8 text-red-500" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">Expired</p>
                <p className="text-2xl font-bold text-[#1f3b73]">6</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg border border-[#e1a95f]">
            <div className="flex items-center">
              <Target className="w-8 h-8 text-[#e1a95f]" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">Total Usage</p>
                <p className="text-2xl font-bold text-[#1f3b73]">546</p>
              </div>
            </div>
          </div>
        </div>

        <TableComponent data={promotionsData} columns={promotionColumns} />
      </div>
    );
  };

  // Product Management Component
  const ProductManagement = () => {
    const productColumns = [
      { key: "id", header: "ID" },
      { key: "name", header: "Name" },
      { key: "category", header: "Category" },
      { key: "price", header: "Price", render: (price) => `${price}` },
      { key: "stock", header: "Stock" },
      {
        key: "status",
        header: "Status",
        render: (status) => (
          <span
            className={`px-2 py-1 rounded-full text-xs ${
              status === "Active"
                ? "bg-green-100 text-green-800"
                : status === "Out of Stock"
                ? "bg-red-100 text-red-800"
                : "bg-yellow-100 text-yellow-800"
            }`}>
            {status}
          </span>
        ),
      },
      {
        key: "rating",
        header: "Rating",
        render: (rating) => (
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-500 fill-current" />
            <span className="ml-1">{rating}</span>
          </div>
        ),
      },
      { key: "sales", header: "Sales" },
    ];

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-lg border border-[#e1a95f]">
            <div className="flex items-center">
              <Package className="w-8 h-8 text-[#1f3b73]" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">Total Products</p>
                <p className="text-2xl font-bold text-[#1f3b73]">1,234</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg border border-[#e1a95f]">
            <div className="flex items-center">
              <CheckCircle className="w-8 h-8 text-green-500" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">In Stock</p>
                <p className="text-2xl font-bold text-[#1f3b73]">1,089</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg border border-[#e1a95f]">
            <div className="flex items-center">
              <AlertCircle className="w-8 h-8 text-yellow-500" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">Low Stock</p>
                <p className="text-2xl font-bold text-[#1f3b73]">89</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg border border-[#e1a95f]">
            <div className="flex items-center">
              <XCircle className="w-8 h-8 text-red-500" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">Out of Stock</p>
                <p className="text-2xl font-bold text-[#1f3b73]">56</p>
              </div>
            </div>
          </div>
        </div>

        <TableComponent data={productsData} columns={productColumns} />
      </div>
    );
  };

  // Analytics Component
  const Analytics = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-lg border border-[#e1a95f]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Conversion Rate</p>
              <p className="text-2xl font-bold text-[#1f3b73]">3.24%</p>
              <p className="text-sm text-green-600">+0.5% from last month</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg border border-[#e1a95f]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg. Order Value</p>
              <p className="text-2xl font-bold text-[#1f3b73]">$87.32</p>
              <p className="text-sm text-green-600">+$5.12 from last month</p>
            </div>
            <DollarSign className="w-8 h-8 text-[#e1a95f]" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg border border-[#e1a95f]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Customer Lifetime Value</p>
              <p className="text-2xl font-bold text-[#1f3b73]">$324.56</p>
              <p className="text-sm text-green-600">+$12.34 from last month</p>
            </div>
            <Award className="w-8 h-8 text-purple-500" />
          </div>
        </div>
      </div>

      <DashboardCharts />
    </div>
  );

  // Orders Management Component
  const OrdersManagement = () => {
    const ordersData = [
      {
        id: 1,
        customer: "John Doe",
        amount: "$125.99",
        status: "Delivered",
        date: "2024-06-20",
        items: 3,
      },
      {
        id: 2,
        customer: "Jane Smith",
        amount: "$89.50",
        status: "Processing",
        date: "2024-06-19",
        items: 2,
      },
      {
        id: 3,
        customer: "Bob Johnson",
        amount: "$234.75",
        status: "Shipped",
        date: "2024-06-18",
        items: 5,
      },
      {
        id: 4,
        customer: "Alice Brown",
        amount: "$67.25",
        status: "Cancelled",
        date: "2024-06-17",
        items: 1,
      },
    ];

    const orderColumns = [
      { key: "id", header: "Order ID" },
      { key: "customer", header: "Customer" },
      { key: "amount", header: "Amount" },
      {
        key: "status",
        header: "Status",
        render: (status) => (
          <span
            className={`px-2 py-1 rounded-full text-xs ${
              status === "Delivered"
                ? "bg-green-100 text-green-800"
                : status === "Processing"
                ? "bg-blue-100 text-blue-800"
                : status === "Shipped"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-red-100 text-red-800"
            }`}>
            {status}
          </span>
        ),
      },
      { key: "date", header: "Date" },
      { key: "items", header: "Items" },
    ];

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-lg border border-[#e1a95f]">
            <div className="flex items-center">
              <ShoppingCart className="w-8 h-8 text-[#1f3b73]" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">Total Orders</p>
                <p className="text-2xl font-bold text-[#1f3b73]">8,765</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg border border-[#e1a95f]">
            <div className="flex items-center">
              <Activity className="w-8 h-8 text-blue-500" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">Processing</p>
                <p className="text-2xl font-bold text-[#1f3b73]">234</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg border border-[#e1a95f]">
            <div className="flex items-center">
              <CheckCircle className="w-8 h-8 text-green-500" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">Delivered</p>
                <p className="text-2xl font-bold text-[#1f3b73]">8,234</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg border border-[#e1a95f]">
            <div className="flex items-center">
              <XCircle className="w-8 h-8 text-red-500" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">Cancelled</p>
                <p className="text-2xl font-bold text-[#1f3b73]">297</p>
              </div>
            </div>
          </div>
        </div>

        <TableComponent data={ordersData} columns={orderColumns} />
      </div>
    );
  };

  // Reports Component
  const Reports = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-lg border border-[#e1a95f]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-[#1f3b73]">
              Sales Report
            </h3>
            <BarChart3 className="w-6 h-6 text-[#e1a95f]" />
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Generate detailed sales analytics and performance reports
          </p>
          <button className="w-full px-4 py-2 bg-[#1f3b73] text-white rounded-lg hover:bg-opacity-90">
            Generate Report
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg border border-[#e1a95f]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-[#1f3b73]">
              User Activity
            </h3>
            <Users className="w-6 h-6 text-[#e1a95f]" />
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Track user engagement and activity patterns
          </p>
          <button className="w-full px-4 py-2 bg-[#1f3b73] text-white rounded-lg hover:bg-opacity-90">
            Generate Report
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg border border-[#e1a95f]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-[#1f3b73]">
              Revenue Analysis
            </h3>
            <DollarSign className="w-6 h-6 text-[#e1a95f]" />
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Comprehensive revenue breakdown and trends
          </p>
          <button className="w-full px-4 py-2 bg-[#1f3b73] text-white rounded-lg hover:bg-opacity-90">
            Generate Report
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg border border-[#e1a95f]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-[#1f3b73]">
              Inventory Report
            </h3>
            <Package className="w-6 h-6 text-[#e1a95f]" />
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Stock levels, low inventory alerts, and product performance
          </p>
          <button className="w-full px-4 py-2 bg-[#1f3b73] text-white rounded-lg hover:bg-opacity-90">
            Generate Report
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg border border-[#e1a95f]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-[#1f3b73]">
              Customer Insights
            </h3>
            <Target className="w-6 h-6 text-[#e1a95f]" />
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Customer behavior, preferences, and satisfaction metrics
          </p>
          <button className="w-full px-4 py-2 bg-[#1f3b73] text-white rounded-lg hover:bg-opacity-90">
            Generate Report
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg border border-[#e1a95f]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-[#1f3b73]">
              Marketing Performance
            </h3>
            <Zap className="w-6 h-6 text-[#e1a95f]" />
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Campaign effectiveness and ROI analysis
          </p>
          <button className="w-full px-4 py-2 bg-[#1f3b73] text-white rounded-lg hover:bg-opacity-90">
            Generate Report
          </button>
        </div>
      </div>
    </div>
  );
 
  // Settings Component
  const Settings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-lg border border-[#e1a95f]">
          <h3 className="text-lg font-semibold text-[#1f3b73] mb-4">
            General Settings
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Site Name
              </label>
              <input
                type="text"
                defaultValue="Admin Dashboard"
                className="w-full px-3 py-2 border border-[#e1a95f] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1f3b73]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Admin Email
              </label>
              <input
                type="email"
                defaultValue="admin@example.com"
                className="w-full px-3 py-2 border border-[#e1a95f] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1f3b73]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Timezone
              </label>
              <select className="w-full px-3 py-2 border border-[#e1a95f] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1f3b73]">
                <option>UTC</option>
                <option>EST</option>
                <option>PST</option>
                <option>GMT</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg border border-[#e1a95f]">
          <h3 className="text-lg font-semibold text-[#1f3b73] mb-4">
            Notification Settings
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">
                Email Notifications
              </label>
              <input
                type="checkbox"
                defaultChecked
                className="w-4 h-4 text-[#1f3b73] rounded"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">
                SMS Notifications
              </label>
              <input
                type="checkbox"
                className="w-4 h-4 text-[#1f3b73] rounded"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">
                Push Notifications
              </label>
              <input
                type="checkbox"
                defaultChecked
                className="w-4 h-4 text-[#1f3b73] rounded"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">
                Order Alerts
              </label>
              <input
                type="checkbox"
                defaultChecked
                className="w-4 h-4 text-[#1f3b73] rounded"
              />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg border border-[#e1a95f]">
          <h3 className="text-lg font-semibold text-[#1f3b73] mb-4">
            Security Settings
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Password
              </label>
              <input
                type="password"
                className="w-full px-3 py-2 border border-[#e1a95f] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1f3b73]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                New Password
              </label>
              <input
                type="password"
                className="w-full px-3 py-2 border border-[#e1a95f] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1f3b73]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                className="w-full px-3 py-2 border border-[#e1a95f] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1f3b73]"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">
                Two-Factor Authentication
              </label>
              <input
                type="checkbox"
                className="w-4 h-4 text-[#1f3b73] rounded"
              />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg border border-[#e1a95f]">
          <h3 className="text-lg font-semibold text-[#1f3b73] mb-4">
            System Preferences
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Items Per Page
              </label>
              <select className="w-full px-3 py-2 border border-[#e1a95f] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1f3b73]">
                <option>10</option>
                <option>25</option>
                <option>50</option>
                <option>100</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Default Currency
              </label>
              <select className="w-full px-3 py-2 border border-[#e1a95f] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1f3b73]">
                <option>USD</option>
                <option>EUR</option>
                <option>GBP</option>
                <option>JPY</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">
                Dark Mode
              </label>
              <input
                type="checkbox"
                className="w-4 h-4 text-[#1f3b73] rounded"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <button className="px-6 py-2 border border-[#e1a95f] text-[#1f3b73] rounded-lg hover:bg-[#f4f2ed]">
          Cancel
        </button>
        <button className="px-6 py-2 bg-[#1f3b73] text-white rounded-lg hover:bg-opacity-90">
          Save Changes
        </button>
      </div>
    </div>
  );

  // Main render function
  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <div>
            <StatsCards />
            <DashboardCharts />
          </div>
        );
      case "users":
        return <UserManagement />;
      case "requests":
        return <RequestsManagement />;
      case "promotions":
        return <PromotionManagement />;
      case "products":
        return <ProductManagement />;
      case "analytics":
        return <Analytics />;
      case "orders":
        return <OrdersManagement />;
      case "reports":
        return <Reports />;
      case "settings":
        return <Settings />;
      case "categories":
        return <CategoryManagement />;  
      default:
        return (
          <div>
            <StatsCards />
            <DashboardCharts />
          </div>
        );
    }
  };

  return (
    <div className="bg-[#f4f2ed] min-h-screen">
      <NavigationSidebar />
      <div className="ml-64">
        <Header />
        <main className="p-6">{renderContent()}</main>
      </div>
    </div>
  );
};

export default AdminDashboard;
