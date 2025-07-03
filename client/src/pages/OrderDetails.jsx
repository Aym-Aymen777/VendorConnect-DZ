import React, { useEffect, useState } from "react";
import {
  MessageCircle,
  Calendar,
  Package,
  DollarSign,
  User,
  MapPin,
  Phone,
  Mail,
  Clock,
  CheckCircle,
  XCircle,
  Truck,
  Shield,
} from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import { toast } from "sonner";

const OrderDetail = () => {
  const [orderStatus, setOrderStatus] = useState("pending");
  const [showChatModal, setShowChatModal] = useState(false);
  const [orderData, setOrderData] = useState(null);

  const orderId = useParams().id;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrderDetails = async () => {
      const response = await axios.get(`/api/v1/quotation/details/${orderId}`);
      setOrderData(response.data);
    };

    fetchOrderDetails();
  }, [orderId]);

  const statusOptions = [
    {
      value: "pending",
      label: "Pending",
      color: "bg-yellow-100 text-yellow-800",
      icon: Clock,
    },
    {
      value: "confirmed",
      label: "Confirmed",
      color: "bg-blue-100 text-blue-800",
      icon: CheckCircle,
    },
    {
      value: "processing",
      label: "Processing",
      color: "bg-orange-100 text-orange-800",
      icon: Package,
    },
    {
      value: "shipped",
      label: "Shipped",
      color: "bg-purple-100 text-purple-800",
      icon: Truck,
    },
    {
      value: "delivered",
      label: "Delivered",
      color: "bg-green-100 text-green-800",
      icon: CheckCircle,
    },
    {
      value: "cancelled",
      label: "Cancelled",
      color: "bg-red-100 text-red-800",
      icon: XCircle,
    },
  ];

  const getCurrentStatus = () => {
    return statusOptions.find((status) => status.value === orderStatus);
  };

  const handleStatusUpdate = async (newStatus) => {
    setOrderStatus(newStatus);
    await axios.put(`/api/v1/quotation/update/${orderId}`, {
      status: newStatus,
    });
    switch (newStatus) {
      case "pending":
        toast.info("Status updated to 'Pending'");
        break;
      case "confirmed":
        toast.info("Status updated to 'Confirmed'");
        break;
      case "processing":
        toast.info("Status updated to 'Processing'");
        break;
      case "shipped":
        toast.info("Status updated to 'Shipped'");
        break;
      case "delivered":
        toast.success("Status updated to 'Delivered'");
        break;
      case "cancelled":
        toast.error("Status updated to 'Cancelled'");
        break;
      default:
        break;
    }
  };

  const handleStartChat = async () => {
    const startedChat = await axios.post(`/api/v1/chat/start`, {
      userId: orderData?.consumer._id,
      supplierId: orderData?.product.supplier,
    });
    toast.info("Chat started!");
    navigate(`/messages/${startedChat.data.chat._id}`);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const currentStatus = getCurrentStatus();
  const StatusIcon = currentStatus.icon;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Order #{orderData?._id}
              </h1>
              <div className="flex items-center text-gray-600 mt-2">
                <Calendar className="w-4 h-4 mr-2" />
                <span>Ordered on {formatDate(orderData?.createdAt)}</span>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div
                className={`px-3 py-1 rounded-full text-sm font-medium flex items-center ${currentStatus.color}`}>
                <StatusIcon className="w-4 h-4 mr-1" />
                {currentStatus.label}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <button
              onClick={handleStartChat}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <MessageCircle className="w-4 h-4 mr-2" />
              Chat with Customer
            </button>

            <div className="relative">
              <select
                value={orderStatus}
                onChange={(e) => handleStatusUpdate(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-gray-700 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                {statusOptions.map((status) => (
                  <option key={status.value} value={status.value}>
                    Update to {status.label}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Customer Information */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <User className="w-5 h-5 mr-2 text-blue-600" />
                Customer Information
              </h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <User className="w-4 h-4 text-gray-400 mr-3" />
                  <span className="font-medium text-gray-900">
                    {orderData?.consumer.name || orderData?.consumer.username}
                  </span>
                </div>
                <div className="flex items-center">
                  <Mail className="w-4 h-4 text-gray-400 mr-3" />
                  <span className="text-gray-600">
                    {orderData?.consumer.email}
                  </span>
                </div>
                <div className="flex items-center">
                  <Phone className="w-4 h-4 text-gray-400 mr-3" />
                  <span className="text-gray-600">
                    {orderData?.consumer.phone || "N/A"}
                  </span>
                </div>
                <div className="flex items-start">
                  <MapPin className="w-4 h-4 text-gray-400 mr-3 mt-1" />
                  <span className="text-gray-600">
                    {orderData?.consumer.country}
                  </span>
                </div>
                <div className="flex items-center">
                  <Shield className="w-4 h-4 text-gray-400 mr-3" />
                  <span className="text-gray-600">
                    {orderData?.consumer.isVerified
                      ? "Verified ✅"
                      : "Not Verified ❌"}
                  </span>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <DollarSign className="w-5 h-5 mr-2 text-green-600" />
                Order Summary
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between text-gray-600">
                  <span>Items</span>
                  <span>
                    {orderData?.product.flashDeals?.discountPrice
                      ? orderData?.product.flashDeals?.discountPrice
                      : orderData?.product.price}{" "}
                    DZD
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Package className="w-5 h-5 mr-2 text-orange-600" />
                Order Items
              </h3>
              <div className="space-y-6">
                <div
                  key={orderData?.product.id}
                  className="flex space-x-4 p-4 border border-gray-100 rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex-shrink-0">
                    <img
                      src={orderData?.product.media[0].url}
                      alt={orderData?.product.title}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex-grow">
                    <h4 className="font-semibold text-gray-900 mb-2">
                      {orderData?.product.title}
                    </h4>
                    <p className="text-gray-600 text-sm mb-3 leading-relaxed">
                      {orderData?.product.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-500">
                          Qty: {orderData?.product.quantity}
                        </span>
                        <span className="font-semibold text-gray-900">
                          {orderData?.product.price} DZD
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                {/*received message  */}
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-500">
                    Received Message:
                  </span>
                  <span className=" text-gray-900">{orderData?.message}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Modal */}
        {showChatModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Start Chat with Customer
              </h3>
              <p className="text-gray-600 mb-4">
                This will open a chat conversation with{" "}
                {orderData?.consumer.name || orderData?.consumer.username}{" "}
                regarding order #{orderId}.
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowChatModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setShowChatModal(false);
                    handleStartChat();
                  }}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Start Chat
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderDetail;
