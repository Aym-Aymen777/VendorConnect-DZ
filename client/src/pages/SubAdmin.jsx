import React, { useState, useRef } from "react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
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
  Eye,
  Plus,
  Download,
  Calendar,
  DollarSign,
  Activity,
  Award,
  Star,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  BarChart3,
  PieChart as PieChartIcon,
  Target,
  FileText,
  UserCheck,
  ShieldCheck,
  HelpCircle,
  Archive,
  Bookmark,
} from "lucide-react";

const SubAdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const contentRef = useRef();

  // Sample data for charts - sub-admin focused
  const salesData = [
    { name: "Jan", orders: 145, revenue: 12400 },
    { name: "Feb", orders: 167, revenue: 15200 },
    { name: "Mar", orders: 189, revenue: 18900 },
    { name: "Apr", orders: 156, revenue: 14300 },
    { name: "May", orders: 201, revenue: 22100 },
    { name: "Jun", orders: 223, revenue: 25600 },
  ];

  const categoryData = [
    { name: "Electronics", value: 35, color: "#1f3b73" },
    { name: "Clothing", value: 25, color: "#e1a95f" },
    { name: "Books", value: 20, color: "#8884d8" },
    { name: "Home", value: 15, color: "#82ca9d" },
    { name: "Sports", value: 5, color: "#ffc658" },
  ];

  const customerData = [
    { name: "Week 1", newCustomers: 23, returning: 145 },
    { name: "Week 2", newCustomers: 35, returning: 167 },
    { name: "Week 3", newCustomers: 28, returning: 189 },
    { name: "Week 4", newCustomers: 42, returning: 201 },
  ];

  // Sample data for tables - sub-admin scope
  const ordersData = [
    {
      id: "ORD-001",
      customer: "John Smith",
      amount: "$145.99",
      status: "Processing",
      date: "2024-06-22",
      items: 3,
      priority: "Normal",
    },
    {
      id: "ORD-002",
      customer: "Emma Johnson",
      amount: "$89.50",
      status: "Shipped",
      date: "2024-06-21",
      items: 2,
      priority: "High",
    },
    {
      id: "ORD-003",
      customer: "Michael Brown",
      amount: "$234.75",
      status: "Delivered",
      date: "2024-06-20",
      items: 5,
      priority: "Normal",
    },
    {
      id: "ORD-004",
      customer: "Sarah Davis",
      amount: "$67.25",
      status: "Pending",
      date: "2024-06-22",
      items: 1,
      priority: "Low",
    },
  ];

  const supportTicketsData = [
    {
      id: "TKT-001",
      customer: "Alice Wilson",
      subject: "Product inquiry",
      status: "Open",
      priority: "Medium",
      assignedTo: "Me",
      created: "2024-06-22",
    },
    {
      id: "TKT-002",
      customer: "Bob Miller",
      subject: "Shipping delay",
      status: "In Progress",
      priority: "High",
      assignedTo: "Me",
      created: "2024-06-21",
    },
    {
      id: "TKT-003",
      customer: "Carol Taylor",
      subject: "Refund request",
      status: "Resolved",
      priority: "Low",
      assignedTo: "Team Lead",
      created: "2024-06-20",
    },
  ];

  const inventoryData = [
    {
      id: "PRD-001",
      name: "Wireless Earbuds",
      sku: "WE-001",
      stock: 25,
      status: "Low Stock",
      category: "Electronics",
      lastUpdated: "2024-06-22",
    },
    {
      id: "PRD-002",
      name: "Cotton T-Shirt",
      sku: "CT-002",
      stock: 150,
      status: "In Stock",
      category: "Clothing",
      lastUpdated: "2024-06-21",
    },
    {
      id: "PRD-003",
      name: "Coffee Mug",
      sku: "CM-003",
      stock: 0,
      status: "Out of Stock",
      category: "Home",
      lastUpdated: "2024-06-20",
    },
  ];

  // Navigation Sidebar Component
  const NavigationSidebar = () => (
    <div className="w-64 h-screen bg-[#1f3b73] text-white fixed left-0 top-0 overflow-y-auto">
      <div className="p-6 border-b border-[#e1a95f]">
        <h1 className="text-2xl font-bold text-[#e1a95f]">Sub-Admin</h1>
        <p className="text-sm text-gray-300 mt-1">Operations Dashboard</p>
      </div>

      <nav className="mt-6">
        {[
          { id: "dashboard", label: "Dashboard", icon: BarChart3 },
          { id: "orders", label: "Order Management", icon: ShoppingCart },
          { id: "support", label: "Customer Support", icon: MessageSquare },
          { id: "inventory", label: "Inventory Monitor", icon: Package },
          { id: "customers", label: "Customer Info", icon: Users },
          { id: "reports", label: "My Reports", icon: FileText },
          { id: "tasks", label: "Task Management", icon: CheckCircle },
          { id: "analytics", label: "Performance", icon: TrendingUp },
          { id: "profile", label: "My Profile", icon: UserCheck },
          { id: "help", label: "Help & Support", icon: HelpCircle },
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

      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[#e1a95f]">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-[#e1a95f] rounded-full flex items-center justify-center">
            <ShieldCheck className="w-4 h-4 text-[#1f3b73]" />
          </div>
          <div>
            <p className="text-sm font-medium">Sub-Admin</p>
            <p className="text-xs text-gray-300">Limited Access</p>
          </div>
        </div>
      </div>
    </div>
  );

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
              <ShieldCheck className="w-4 h-4 text-[#1f3b73]" />
            </div>
            <div>
              <span className="text-[#1f3b73] font-medium">Alex Johnson</span>
              <p className="text-xs text-gray-600">Sub-Administrator</p>
            </div>
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
          title: "Orders Today",
          value: "47",
          change: "+8%",
          icon: ShoppingCart,
          color: "bg-blue-500",
        },
        {
          title: "Support Tickets",
          value: "12",
          change: "-3%",
          icon: MessageSquare,
          color: "bg-green-500",
        },
        {
          title: "Low Stock Items",
          value: "8",
          change: "+2",
          icon: AlertCircle,
          color: "bg-yellow-500",
        },
        {
          title: "Completed Tasks",
          value: "23",
          change: "+5%",
          icon: CheckCircle,
          color: "bg-[#e1a95f]",
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
                <p className={`text-sm ${stat.change.includes('-') ? 'text-red-600' : 'text-green-600'}`}>
                  {stat.change} from yesterday
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
      {/* Sales Trend */}
      <div className="bg-white p-6 rounded-lg shadow-lg border border-[#e1a95f]">
        <h3 className="text-lg font-semibold text-[#1f3b73] mb-4">
          Orders & Revenue Trend
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area
              type="monotone"
              dataKey="orders"
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

      {/* Category Distribution */}
      <div className="bg-white p-6 rounded-lg shadow-lg border border-[#e1a95f]">
        <h3 className="text-lg font-semibold text-[#1f3b73] mb-4">
          Order Categories
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={categoryData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {categoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Customer Analytics */}
      <div className="bg-white p-6 rounded-lg shadow-lg border border-[#e1a95f] lg:col-span-2">
        <h3 className="text-lg font-semibold text-[#1f3b73] mb-4">
          Customer Growth
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={customerData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="newCustomers" fill="#1f3b73" name="New Customers" />
            <Bar dataKey="returning" fill="#e1a95f" name="Returning Customers" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  // Reusable Table Component
  const TableComponent = ({ data, columns, title, showActions = true }) => (
    <div className="bg-white rounded-lg shadow-lg border border-[#e1a95f] overflow-hidden">
      <div className="p-6 border-b border-[#e1a95f]">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-[#1f3b73]">{title}</h3>
          <div className="flex items-center space-x-2">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-[#e1a95f] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1f3b73]">
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
            <button className="px-4 py-2 bg-[#e1a95f] text-[#1f3b73] rounded-lg hover:bg-opacity-90 flex items-center">
              <Download className="w-4 h-4 mr-2" />
              Export
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-[#f4f2ed]">
            <tr>
              {columns.map((column, index) => (
                <th
                  key={index}
                  className="px-6 py-3 text-left text-sm font-medium text-[#1f3b73] uppercase tracking-wider">
                  {column.header}
                </th>
              ))}
              {showActions && (
                <th className="px-6 py-3 text-left text-sm font-medium text-[#1f3b73] uppercase tracking-wider">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e1a95f]">
            {data.map((row, index) => (
              <tr key={index} className="hover:bg-[#f4f2ed] transition-colors">
                {columns.map((column, colIndex) => (
                  <td
                    key={colIndex}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {column.render
                      ? column.render(row[column.key], row)
                      : row[column.key]}
                  </td>
                ))}
                {showActions && (
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button className="text-[#1f3b73] hover:text-[#e1a95f]">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-[#1f3b73] hover:text-[#e1a95f]">
                        <Edit className="w-4 h-4" />
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

  // Order Management Component
  const OrderManagement = () => {
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
                : "bg-gray-100 text-gray-800"
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
                : priority === "Normal"
                ? "bg-blue-100 text-blue-800"
                : "bg-gray-100 text-gray-800"
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
              <ShoppingCart className="w-8 h-8 text-[#1f3b73]" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">Today's Orders</p>
                <p className="text-2xl font-bold text-[#1f3b73]">47</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg border border-[#e1a95f]">
            <div className="flex items-center">
              <Clock className="w-8 h-8 text-yellow-500" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">Processing</p>
                <p className="text-2xl font-bold text-[#1f3b73]">12</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg border border-[#e1a95f]">
            <div className="flex items-center">
              <Package className="w-8 h-8 text-blue-500" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">Shipped</p>
                <p className="text-2xl font-bold text-[#1f3b73]">28</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg border border-[#e1a95f]">
            <div className="flex items-center">
              <CheckCircle className="w-8 h-8 text-green-500" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">Delivered</p>
                <p className="text-2xl font-bold text-[#1f3b73]">156</p>
              </div>
            </div>
          </div>
        </div>

        <TableComponent 
          data={ordersData} 
          columns={orderColumns} 
          title="Recent Orders"
        />
      </div>
    );
  };

  // Support Tickets Component
  const SupportTickets = () => {
    const ticketColumns = [
      { key: "id", header: "Ticket ID" },
      { key: "customer", header: "Customer" },
      { key: "subject", header: "Subject" },
      {
        key: "status",
        header: "Status",
        render: (status) => (
          <span
            className={`px-2 py-1 rounded-full text-xs ${
              status === "Open"
                ? "bg-red-100 text-red-800"
                : status === "In Progress"
                ? "bg-blue-100 text-blue-800"
                : "bg-green-100 text-green-800"
            }`}>
            {status}
          </span>
        ),
      },
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
      { key: "assignedTo", header: "Assigned To" },
    ];

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-lg border border-[#e1a95f]">
            <div className="flex items-center">
              <MessageSquare className="w-8 h-8 text-[#1f3b73]" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">Open Tickets</p>
                <p className="text-2xl font-bold text-[#1f3b73]">8</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg border border-[#e1a95f]">
            <div className="flex items-center">
              <Activity className="w-8 h-8 text-blue-500" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">In Progress</p>
                <p className="text-2xl font-bold text-[#1f3b73]">4</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg border border-[#e1a95f]">
            <div className="flex items-center">
              <CheckCircle className="w-8 h-8 text-green-500" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">Resolved Today</p>
                <p className="text-2xl font-bold text-[#1f3b73]">15</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg border border-[#e1a95f]">
            <div className="flex items-center">
              <Target className="w-8 h-8 text-[#e1a95f]" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">My Tickets</p>
                <p className="text-2xl font-bold text-[#1f3b73]">12</p>
              </div>
            </div>
          </div>
        </div>

        <TableComponent 
          data={supportTicketsData} 
          columns={ticketColumns} 
          title="Support Tickets"
        />
      </div>
    );
  };

  // Inventory Monitor Component
  const InventoryMonitor = () => {
    const inventoryColumns = [
      { key: "name", header: "Product Name" },
      { key: "sku", header: "SKU" },
      { key: "category", header: "Category" },
      { key: "stock", header: "Stock Level" },
      {
        key: "status",
        header: "Status",
        render: (status) => (
          <span
            className={`px-2 py-1 rounded-full text-xs ${
              status === "In Stock"
                ? "bg-green-100 text-green-800"
                : status === "Low Stock"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-red-100 text-red-800"
            }`}>
            {status}
          </span>
        ),
      },
      { key: "lastUpdated", header: "Last Updated" },
    ];

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-lg border border-[#e1a95f]">
            <div className="flex items-center">
              <Package className="w-8 h-8 text-[#1f3b73]" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">Total Products</p>
                <p className="text-2xl font-bold text-[#1f3b73]">342</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg border border-[#e1a95f]">
            <div className="flex items-center">
              <AlertCircle className="w-8 h-8 text-yellow-500" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">Low Stock</p>
                <p className="text-2xl font-bold text-[#1f3b73]">8</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg border border-[#e1a95f]">
            <div className="flex items-center">
              <XCircle className="w-8 h-8 text-red-500" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">Out of Stock</p>
                <p className="text-2xl font-bold text-[#1f3b73]">3</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg border border-[#e1a95f]">
            <div className="flex items-center">
              <Bookmark className="w-8 h-8 text-[#e1a95f]" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">Need Reorder</p>
                <p className="text-2xl font-bold text-[#1f3b73]">5</p>
              </div>
            </div>
          </div>
        </div>

        <TableComponent 
          data={inventoryData} 
          columns={inventoryColumns} 
          title="Inventory Status"
        />
      </div>
    );
  };

  // Quick Actions Component
  const QuickActions = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
    <div className="bg-white p-6 rounded-lg shadow-lg border border-[#e1a95f]">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Plus className="w-8 h-8 text-[#1f3b73]" />
          <div className="ml-4">
            <p className="text-sm text-gray-600">Add Product</p>
            <p className="text-lg font-bold text-[#1f3b73]">Quick Add</p>
          </div>
        </div>
        <button className="bg-[#e1a95f] text-white px-4 py-2 rounded-lg hover:bg-[#d89a4b] transition">
          Add
        </button>
      </div>
    </div>
    <div className="bg-white p-6 rounded-lg shadow-lg border border-[#e1a95f]">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Download className="w-8 h-8 text-[#e1a95f]" />
          <div className="ml-4">
            <p className="text-sm text-gray-600">Export Data</p>
            <p className="text-lg font-bold text-[#1f3b73]">Download</p>
          </div>
        </div>
        <button className="bg-[#1f3b73] text-white px-4 py-2 rounded-lg hover:bg-[#16305a] transition">
          Export
        </button>
      </div>
    </div>
    <div className="bg-white p-6 rounded-lg shadow-lg border border-[#e1a95f]">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Filter className="w-8 h-8 text-[#1f3b73]" />
          <div className="ml-4">
            <p className="text-sm text-gray-600">Filter Orders</p>
            <p className="text-lg font-bold text-[#1f3b73]">Advanced</p>
          </div>
        </div>
        <button className="bg-[#e1a95f] text-white px-4 py-2 rounded-lg hover:bg-[#d89a4b] transition">
          Filter
        </button>
      </div>
    </div>
  </div>
);

// Main Content Renderer
const renderContent = () => {
  switch (activeTab) {
    case "dashboard":
      return (
        <div>
          <StatsCards />
          <DashboardCharts />
          <QuickActions />
        </div>
      );
    case "orders":
      return <OrderManagement />;
    case "support":
      return <SupportTickets />;
    case "inventory":
      return <InventoryMonitor />;
    // Add more cases for other tabs as needed
    default:
      return (
        <div className="p-8 text-center text-[#1f3b73]">
          <h2 className="text-2xl font-bold mb-2">Welcome to the Sub-Admin Dashboard</h2>
          <p className="text-gray-600">Select a section from the sidebar to get started.</p>
        </div>
      );
  }
};

// Main Layout
return (
  <div className="min-h-screen bg-[#f4f2ed]">
    <NavigationSidebar />
    <div className="ml-64">
      <Header />
      <main className="p-8" ref={contentRef}>
        {renderContent()}
      </main>
    </div>
  </div>
);
};

export default SubAdminDashboard;