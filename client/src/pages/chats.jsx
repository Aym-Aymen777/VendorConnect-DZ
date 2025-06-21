import { useState, useRef, useEffect } from "react";
import {
  User,
  MessageCircle,
  Search,
  ArrowRight,
  Filter,
  Plus,
  MoreVertical,
  Pin,
  Archive,
  Trash2,
} from "lucide-react";
import Header from "../components/common/Header";
import { Link } from "react-router-dom";

const mockChats = [
  {
    id: 1,
    name: "Support Team",
    avatar: "/avatars/support.png",
    lastMessage: "Your order has shipped! Track it here: #SP-2024-0156",
    time: "09:15 AM",
    unread: 2,
    pinned: true,
    online: true,
    type: "support",
  },
  {
    id: 2,
    name: "BuildPro Supplies",
    avatar: "/avatars/supplier1.png",
    lastMessage: "We sent your invoice. Payment due in 30 days.",
    time: "Yesterday",
    unread: 0,
    pinned: false,
    online: false,
    type: "supplier",
  },
  {
    id: 3,
    name: "HomeStyle Furnishings",
    avatar: "/avatars/supplier2.png",
    lastMessage: "Thank you for your feedback on our latest collection!",
    time: "2 days ago",
    unread: 0,
    pinned: false,
    online: true,
    type: "supplier",
  },
  {
    id: 4,
    name: "Tech Solutions Inc",
    avatar: "/avatars/supplier3.png",
    lastMessage: "New software update available for download",
    time: "3 days ago",
    unread: 1,
    pinned: false,
    online: false,
    type: "vendor",
  },
  {
    id: 5,
    name: "Customer Service",
    avatar: "/avatars/customer.png",
    lastMessage: "How can we help you today?",
    time: "1 week ago",
    unread: 0,
    pinned: true,
    online: true,
    type: "support",
  },
];

export default function Chats() {
  const [search, setSearch] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [searchFocused, setSearchFocused] = useState(false);
  const searchRef = useRef(null);
  const menuRef = useRef(null);

  const filters = [
    { id: "all", label: "All Chats", count: mockChats.length },
    {
      id: "unread",
      label: "Unread",
      count: mockChats.filter((c) => c.unread > 0).length,
    },
    {
      id: "pinned",
      label: "Pinned",
      count: mockChats.filter((c) => c.pinned).length,
    },
    {
      id: "support",
      label: "Support",
      count: mockChats.filter((c) => c.type === "support").length,
    },
    {
      id: "supplier",
      label: "Suppliers",
      count: mockChats.filter((c) => c.type === "supplier").length,
    },
  ];

  const filteredChats = mockChats
    .filter((chat) => {
      const matchesSearch =
        chat.name.toLowerCase().includes(search.toLowerCase()) ||
        chat.lastMessage.toLowerCase().includes(search.toLowerCase());

      if (selectedFilter === "all") return matchesSearch;
      if (selectedFilter === "unread") return matchesSearch && chat.unread > 0;
      if (selectedFilter === "pinned") return matchesSearch && chat.pinned;
      return matchesSearch && chat.type === selectedFilter;
    })
    .sort((a, b) => {
      // Pinned chats first
      if (a.pinned && !b.pinned) return -1;
      if (!a.pinned && b.pinned) return 1;
      // Then by unread count
      if (a.unread > 0 && b.unread === 0) return -1;
      if (a.unread === 0 && b.unread > 0) return 1;
      return 0;
    });

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setActiveMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMenuClick = (chatId, e) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveMenu(activeMenu === chatId ? null : chatId);
  };

  const ChatMenuItem = ({ icon: Icon, label, onClick, danger = false }) => (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
        danger ? "text-red-600 hover:bg-red-50" : "text-[#1f3b73]"
      }`}>
      {Icon && <Icon size={16} />}
      {label}
    </button>
  );

  const getAvatarFallback = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div tosName="min-h-screen bg-[#f4f2ed]">
      <Header />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#1f3b73] rounded-xl">
              <MessageCircle className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-[#1f3b73]">Messages</h1>
              <p className="text-[#1f3b73]/60 text-sm">
                {filteredChats.length}{" "}
                {filteredChats.length === 1 ? "conversation" : "conversations"}
              </p>
            </div>
          </div>
          <button className="flex items-center gap-2 bg-[#e1a95f] hover:bg-[#d4953f] text-white px-4 py-2 rounded-xl font-medium transition-all duration-200 hover:shadow-lg hover:scale-105">
            <Plus size={18} />
            New Chat
          </button>
        </div>

        {/* Search and Filters */}
        <div className="space-y-4 mb-6">
          <div
            className={`relative transition-all duration-300 ${
              searchFocused ? "transform scale-[1.02]" : ""
            }`}>
            <div
              className={`flex items-center bg-white rounded-2xl shadow-lg px-6 py-4 border-2 transition-all duration-300 ${
                searchFocused
                  ? "border-[#e1a95f] shadow-xl"
                  : "border-transparent"
              }`}>
              <Search
                className={`mr-3 transition-colors duration-300 ${
                  searchFocused ? "text-[#e1a95f]" : "text-[#1f3b73]/40"
                }`}
                size={20}
              />
              <input
                ref={searchRef}
                type="text"
                placeholder="Search conversations, messages, or contacts..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                className="flex-1 outline-none bg-transparent text-[#1f3b73] placeholder:text-[#1f3b73]/40 text-lg"
              />
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`ml-3 p-2 rounded-lg transition-all duration-200 ${
                  showFilters
                    ? "bg-[#e1a95f] text-white"
                    : "text-[#1f3b73]/60 hover:bg-[#f4f2ed]"
                }`}>
                <Filter size={18} />
              </button>
            </div>
          </div>

          {/* Filter Tags */}
          <div
            className={`flex flex-wrap gap-2 transition-all duration-300 ${
              showFilters
                ? "opacity-100 max-h-20"
                : "opacity-0 max-h-0 overflow-hidden"
            }`}>
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setSelectedFilter(filter.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedFilter === filter.id
                    ? "bg-[#1f3b73] text-white shadow-lg"
                    : "bg-white text-[#1f3b73] hover:bg-[#f4f2ed] border border-[#1f3b73]/20"
                }`}>
                {filter.label}
                {filter.count > 0 && (
                  <span
                    className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                      selectedFilter === filter.id
                        ? "bg-white/20 text-white"
                        : "bg-[#e1a95f] text-white"
                    }`}>
                    {filter.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Chat List */}
        <div className="bg-white rounded-3xl shadow-xl border border-[#1f3b73]/10 overflow-hidden">
          {filteredChats.length === 0 ? (
            <div className="p-12 text-center">
              <div className="w-20 h-20 bg-[#f4f2ed] rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="text-[#e1a95f]" size={32} />
              </div>
              <h3 className="text-lg font-semibold text-[#1f3b73] mb-2">
                No chats found
              </h3>
              <p className="text-[#1f3b73]/60">
                Try adjusting your search or filters
              </p>
            </div>
          ) : (
            <div className="divide-y divide-[#f4f2ed]">
              {filteredChats.map((chat, index) => (
                <div
                  key={chat.id}
                  className="relative group hover:bg-gradient-to-r hover:from-[#f4f2ed] hover:to-transparent transition-all duration-300"
                  style={{ animationDelay: `${index * 50}ms` }}>
                  <Link
                    to={`/messages/${chat.id}`}
                    className="flex items-center gap-4 px-6 py-6 transition-all duration-300 hover:translate-x-1">
                    {/* Avatar with online status */}
                    <div className="relative">
                      <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-[#e1a95f]/30 bg-gradient-to-br from-[#e1a95f]/20 to-[#1f3b73]/10 flex items-center justify-center font-semibold text-[#1f3b73]">
                        {getAvatarFallback(chat.name)}
                      </div>
                      {chat.online && (
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-2 border-white rounded-full animate-pulse"></div>
                      )}
                      {chat.pinned && (
                        <div className="absolute -top-1 -left-1 w-5 h-5 bg-[#e1a95f] border-2 border-white rounded-full flex items-center justify-center">
                          <Pin size={10} className="text-white" />
                        </div>
                      )}
                    </div>

                    {/* Chat Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-[#1f3b73] truncate text-lg">
                            {chat.name}
                          </span>
                          {chat.type === "support" && (
                            <span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full font-medium">
                              Support
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-[#e1a95f] font-medium">
                            {chat.time}
                          </span>
                          <button
                            onClick={(e) => handleMenuClick(chat.id, e)}
                            className="opacity-0 group-hover:opacity-100 p-1 hover:bg-white rounded-lg transition-all duration-200">
                            <MoreVertical
                              size={16}
                              className="text-[#1f3b73]/60"
                            />
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[#1f3b73]/70 truncate pr-4 leading-relaxed">
                          {chat.lastMessage}
                        </span>
                        <div className="flex items-center gap-2">
                          {chat.unread > 0 && (
                            <span className="bg-gradient-to-r from-[#e1a95f] to-[#d4953f] text-white text-xs px-3 py-1 rounded-full font-bold shadow-lg animate-pulse">
                              {chat.unread}
                            </span>
                          )}
                          <ArrowRight
                            className="text-[#e1a95f] opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1"
                            size={20}
                          />
                        </div>
                      </div>
                    </div>
                  </Link>

                  {/* Context Menu */}
                  {activeMenu === chat.id && (
                    <div
                      ref={menuRef}
                      className="absolute right-6 top-16 z-50 bg-white border border-gray-200 rounded-xl shadow-2xl py-2 min-w-48 animate-in slide-in-from-top-2 duration-200">
                      <ChatMenuItem
                        icon={Pin}
                        label={chat.pinned ? "Unpin" : "Pin Chat"}
                        onClick={() => setActiveMenu(null)}
                      />
                      <ChatMenuItem
                        icon={Archive}
                        label="Archive"
                        onClick={() => setActiveMenu(null)}
                      />
                      <div className="border-t border-gray-100 my-1"></div>
                      <ChatMenuItem
                        icon={Trash2}
                        label="Delete Chat"
                        onClick={() => setActiveMenu(null)}
                        danger
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-[#1f3b73]/10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#1f3b73]/60 text-sm">Total Conversations</p>
                <p className="text-2xl font-bold text-[#1f3b73]">
                  {mockChats.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-[#1f3b73]/10 rounded-xl flex items-center justify-center">
                <MessageCircle className="text-[#1f3b73]" size={24} />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-[#1f3b73]/10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#1f3b73]/60 text-sm">Unread Messages</p>
                <p className="text-2xl font-bold text-[#e1a95f]">
                  {mockChats.reduce((sum, chat) => sum + chat.unread, 0)}
                </p>
              </div>
              <div className="w-12 h-12 bg-[#e1a95f]/10 rounded-xl flex items-center justify-center">
                <User className="text-[#e1a95f]" size={24} />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-[#1f3b73]/10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#1f3b73]/60 text-sm">Online Contacts</p>
                <p className="text-2xl font-bold text-green-600">
                  {mockChats.filter((chat) => chat.online).length}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <div className="w-6 h-6 bg-green-500 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
