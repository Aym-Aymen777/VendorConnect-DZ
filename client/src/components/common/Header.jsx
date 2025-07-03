import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Menu,
  X,
  Search,
  ShoppingCart,
  User,
  ChevronDown,
  Heart,
  Globe,
  Package,
  MessageCircle,
  HelpCircle,
  Settings,
  LogOut,
  TrendingUp,
  Star,
  Sparkles,
  UserCircle,
  CreditCard,
  MapPin,
  Bell,
  BarChart3,
  Package2,
  PenTool,
  FileText,
  Shield,
  Phone,
  BookOpen,
  Coins,
} from "lucide-react";
import { Link , useNavigate} from "react-router-dom";
import { useTranslation } from "react-i18next";
import SearchBar from "../marketplace/SearchBar";
import useSearchStore from "../../store/SearchStore";
import { useAuthCheck } from "../../hooks/useAuthCheck";
import  useAuthStore  from "../../store/AuthStore";


const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { searchTerm, setSearchTerm } = useSearchStore();
  const [cartCount, setCartCount] = useState(3);
  const [wishlistCount, setWishlistCount] = useState(7);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(null);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const navigate = useNavigate();

  const hoverTimeout = useRef(null);
    const { user, isAuthenticated, loading } = useAuthCheck()
  const {logout} = useAuthStore();

  const categories = [
    {
      category: "Building Materials",
      subcategories: [
        "Cement",
        "Bricks & Blocks",
        "Sand & Gravel",
        "Iron & Steel",
        "Insulation Materials",
        "Adhesives & Sealants",
        "Gypsum Products",
      ],
    },
    {
      category: "Flooring & Wall Coverings",
      subcategories: [
        "Ceramic Tiles",
        "Marble & Granite",
        "Porcelain",
        "Parquet",
        "Wallpaper",
        "Paints & Coatings",
      ],
    },
    {
      category: "Electrical & Lighting",
      subcategories: [
        "Wires & Cables",
        "Circuit Breakers",
        "Lighting Fixtures (LED, Ceiling, Wall)",
        "Chandeliers",
        "Switches & Sockets",
        "Solar Energy Systems",
      ],
    },
    {
      category: "Plumbing & Bathrooms",
      subcategories: [
        "Faucets",
        "Sinks & Washbasins",
        "Toilets",
        "Showers & Accessories",
        "Water Mixers",
        "Pipes & Fittings",
      ],
    },
    {
      category: "Doors & Windows",
      subcategories: [
        "Wooden Doors",
        "Metal Doors",
        "Aluminum Windows",
        "PVC Windows",
        "Security Systems",
        "Interior & Exterior Doors",
      ],
    },
    {
      category: "Kitchen & Fixtures",
      subcategories: [
        "Kitchen Cabinets",
        "Countertops (Marble, Corian)",
        "Kitchen Sinks",
        "Built-in Appliances",
        "Hoods & Ventilation",
        "Kitchen Accessories",
      ],
    },
    {
      category: "Furniture",
      subcategories: [
        "Living Room Sets",
        "Beds & Bedrooms",
        "Dining Tables",
        "Chairs & Seating",
        "Wardrobes",
        "Office Desks",
      ],
    },
    {
      category: "Home Appliances",
      subcategories: [
        "Refrigerators",
        "Washing Machines",
        "Air Conditioners",
        "Electric Ovens",
        "Water Heaters",
        "Small Appliances (Microwave, Kettle, etc.)",
      ],
    },
    {
      category: "Outdoor & Garden",
      subcategories: [
        "Outdoor Flooring",
        "Garden Furniture",
        "Pergolas & Shades",
        "Outdoor Lighting",
        "Planters & Pots",
        "Fountains & Decor",
      ],
    },
    {
      category: "Security & Surveillance",
      subcategories: [
        "Security Cameras",
        "Alarm Systems",
        "Smart Doorbells",
        "Smart Locks",
        "Electric Gates",
      ],
    },
  ];

  // Split categories into 3 columns for the dropdown
  const splitCategoriesIntoColumns = (categories) => {
    const itemsPerColumn = Math.ceil(categories.length / 3);
    const columns = [];
    for (let i = 0; i < 3; i++) {
      columns.push(
        categories.slice(i * itemsPerColumn, (i + 1) * itemsPerColumn)
      );
    }
    return columns;
  };
  const categoryColumns = splitCategoriesIntoColumns(categories);

  // Enhanced Account dropdown structure with 4 sections
  const accountDropdownSections = [
    {
      title: "Profile",
      items: [
        { name: "My Profile", href: "/profile", icon: UserCircle },
        { name: "Account Settings", href: "/account/account-infos", icon: User },
        {
          name: "Billing Information",
          href: "/account/billing",
          icon: CreditCard,
        },
        { name: "Addresses", href: "/account/account-infos", icon: MapPin },
        { name: "Notifications", href: "/account/notifications", icon: Bell },
      ],
    },
    {
      title: "Dashboard for Suppliers",
      items: [
        { name: "Analytics", href: "/supplier/analytics", icon: BarChart3 },
        { name: "My Products", href: "/supplier/products", icon: Package2 },
        { name: "Inventory", href: "/supplier/inventory", icon: Package },
        { name: "Blog Posts", href: "/supplier/blogs", icon: PenTool },
        { name: "Orders", href: "/supplier/orders", icon: FileText },
      ],
    },
    {
      title: "Settings",
      items: [
        { name: "General Settings", href: "/account/account-infos", icon: Settings },
        { name: "Privacy & Security", href: "/account/security", icon: Shield },
        {
          name: "Documents",
          href: "/account/documents",
          icon: FileText,
        },
      ],
    },
    {
      title: "Help Center",
      items: [
        { name: "Support Center", href: "/help/support", icon: HelpCircle },
        { name: "Contact Us", href: "/help/contact", icon: Phone },
        { name: "Documentation", href: "/help/docs", icon: BookOpen },
      ],
    },
  ];

  const navItems = [
    {
      name: "Home",
      href: "/",
      hasDropdown: false,
      icon: null,
    },
    {
      name: "Explore",
      href: "/products",
      hasDropdown: true,
      icon: null,
      dropdownType: "categories", // Special type for category dropdown
    },
    {
      name: "Stores",
      href: "/suppliers",
      hasDropdown: false,
      icon: null,
    },
    {
      name: "My Orders",
      href: "/account/orders",
      hasDropdown: false,
      icon: null,
    },
    {
      name: "Blogs",
      href: "/blogs",
      hasDropdown: false,
      icon: null,
    },
    {
      name: "Messages",
      href: "/messages",
      hasDropdown: false,
      icon: null,
    },
    {
      name: "Support",
      href: "/support",
      hasDropdown: false,
      icon: null,
    },
    {
      name: "Account",
      href: "/account/account-infos",
      hasDropdown: true,
      icon: null,
      dropdownType: "account", // Special type for account dropdown
    },
  ];

  const navItemsForUnauthenticated = [
    { name: "Home", href: "/", hasDropdown: false },
    { name: "About Us", href: "#about", hasDropdown: false },
    { name: "Join Us", href: "#joinUs", hasDropdown: false },
    { name: "Services", href: "#services", hasDropdown: false },
    { name: "Contact", href: "#contact", hasDropdown: false },
    { name: "Login", href: "/login", hasDropdown: false, isAuth: true },
    { name: "Register", href: "/register", hasDropdown: false, isAuth: true },
  ];

  const languages = [
    { code: "en", name: "English" },
    { code: "fr", name: "Français" },
    { code: "ar", name: "العربية" },
  ];

  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const { i18n } = useTranslation();

  // Enhanced mouse enter/leave handlers with timeout for better UX
  const handleMouseEnter = (itemName) => {
    if (hoverTimeout.current) {
      clearTimeout(hoverTimeout.current);
    }
    setHoveredItem(itemName);
  };

  const handleMouseLeave = () => {
    hoverTimeout.current = setTimeout(() => {
      setHoveredItem(null);
    }, 150); // Small delay to prevent flickering
  };

  // Handle mobile dropdown toggle
  const toggleMobileDropdown = (itemName) => {
    setMobileDropdownOpen(mobileDropdownOpen === itemName ? null : itemName);
  };

  // Handle search submission
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      console.log("Searching for:", searchTerm);
      // Implement search logic here
    }
  };

  // Convert category/subcategory to URL-friendly format
  const createSlug = (text) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "") // Remove special characters except spaces and hyphens
      .replace(/\s+/g, "-") // Replace spaces with hyphens
      .replace(/-+/g, "-") // Replace multiple hyphens with single hyphen
      .trim("-"); // Remove leading/trailing hyphens
  };

  // Handle logout function
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Handle click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".language-dropdown")) {
        setIsLanguageOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeout.current) {
        clearTimeout(hoverTimeout.current);
      }
    };
  }, []);

  return (
    <header className="bg-gradient-to-r from-[#f4f2ed] to-[#f9f7f2] shadow-lg sticky top-0 z-50">
      {/* Top Row - Logo, Search, Actions */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="flex-shrink-0">
            <img
              src="/logo.png"
              alt="Company Logo"
              className="w-40 mx-auto md:mx-0 md:w-44 cursor-pointer hover:opacity-90 transition-opacity"
              onClick={() => (window.location.href = "/")}
            />
          </div>

          {/* Desktop Search Bar */}
          <SearchBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            isSearchFocused={isSearchFocused}
            setIsSearchFocused={setIsSearchFocused}
            onSearch={handleSearch}
          />

          {/* Desktop User Actions */}
          {user ? (
            <div className="hidden md:flex items-center space-x-4">
              <div className="p-2 cursor-pointer flex items-center justify-center gap-2 text-[#1f3b73] transition-colors duration-200 relative group">
                <Coins className="h-6 w-6 text-[#1f3b73]" />
                <span className="text-[#1f3b73]">
                  {user.coinsBalance}
                </span>
              </div>
              {/* Wishlist */}
              <button 
                className="p-2 text-[#1f3b73] hover:text-[#e1a95f] transition-colors duration-200 relative group"
                onClick={() => navigate("/account/saved")}
              >
                <Heart className="h-6 w-6" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                    {wishlistCount}
                  </span>
                )}
                <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  Wishlist
                </span>
              </button>

              {/* Cart */}
              <button 
                className="p-2 text-[#1f3b73] hover:text-[#e1a95f] transition-colors duration-200 relative group"
                onClick={() => navigate("/profile")}
              >
                <ShoppingCart className="h-6 w-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                    {cartCount}
                  </span>
                )}
                <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  Cart
                </span>
              </button>

              {/* Profile */}
              <Link
                to="/profile"
                className="p-2 cursor-pointer text-[#1f3b73] hover:text-[#e1a95f] transition-colors duration-200 relative group">
                <User className="h-6 w-6" />
                <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  Profile
                </span>
              </Link>
            </div>
          ) : (
            <div className="hidden md:flex items-center space-x-3">
              <Link to="/login">
                <Button className="bg-[#e1a95f] text-[#1f3b73] hover:bg-[#f6b868] transition-all duration-200 shadow-md hover:shadow-lg">
                  Log In
                </Button>
              </Link>
              <Link to="/register">
                <Button className="bg-[#e1a95f] text-[#1f3b73] hover:bg-[#f6b868] transition-all duration-200 shadow-md hover:shadow-lg">
                  Register
                </Button>
              </Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            {user && (
              <>
                <button className="p-2 text-[#1f3b73] hover:text-[#e1a95f] transition-colors relative" onClick={() => navigate("/account/saved")}>
                  <Heart className="h-5 w-5" />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                      {wishlistCount}
                    </span>
                  )}
                </button>
                <button className="p-2 text-[#1f3b73] hover:text-[#e1a95f] transition-colors relative" onClick={() => navigate("/profile")}>
                  <ShoppingCart className="h-5 w-5" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </button>
                <Link
                  to="/profile"
                  className="p-2 text-[#1f3b73] hover:text-[#e1a95f] transition-colors">
                  <User className="h-5 w-5" />
                </Link>
              </>
            )}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-[#1f3b73] hover:text-[#e1a95f] transition-colors duration-200">
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden pb-4">
          <div className="flex bg-slate-800 rounded-lg overflow-hidden">
            <input
              type="text"
              placeholder="Search in 20,000+ products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch(e)}
              className="flex-1 bg-transparent text-white placeholder-gray-400 px-4 py-3 border-none outline-none"
            />
            <button
              onClick={handleSearch}
              className="bg-[#e1a95f] hover:bg-[#f6b868] px-4 py-3 text-slate-800 transition-colors duration-200">
              <Search className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Row - Navigation */}
      <div className="bg-gradient-to-r from-gray-950 via-gray-900 to-gray-800 border-t border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-between h-12">
            <div className="flex items-center space-x-8">
              {(user ? navItems : navItemsForUnauthenticated).map(
                (item, index) => (
                  <div
                    key={item.name}
                    onMouseEnter={() =>
                      item.hasDropdown && handleMouseEnter(item.name)
                    }
                    onMouseLeave={() => item.hasDropdown && handleMouseLeave()}
                    className="relative">
                    <Link
                      to={item.href}
                      className={`flex items-center space-x-1 text-sm font-medium transition-colors duration-200 hover:text-[#e1a95f] ${
                        index === 0 ? "text-[#e1a95f]" : "text-white"
                      }`}>
                      <span>{item.name}</span>
                      {item.hasDropdown && <ChevronDown className="h-4 w-4" />}
                    </Link>

                    {/* Enhanced Categories Dropdown for Explore */}
                    {item.hasDropdown &&
                      hoveredItem === item.name &&
                      item.dropdownType === "categories" && (
                        <div
                          className="absolute top-full left-0 border border-slate-700 rounded-lg mt-2 w-[1000px] z-50 shadow-xl p-6"
                          style={{
                            background:
                              "linear-gradient(to right, rgba(3, 7, 18, 0.9), rgba(17, 24, 39, 0.85), rgba(31, 41, 55, 0.9))",
                          }}
                          onMouseEnter={() => handleMouseEnter(item.name)}
                          onMouseLeave={handleMouseLeave}>
                          <div className="grid grid-cols-3 gap-8">
                            {categoryColumns.map((column, columnIndex) => (
                              <div
                                key={columnIndex}
                                className={`${
                                  columnIndex < 2
                                    ? "border-r border-[#cd9456] pr-8"
                                    : ""
                                }`}>
                                {column.map((category) => (
                                  <div key={category.category} className="mb-6">
                                    <h3 className="text-[#e1a95f] font-semibold text-sm mb-3 uppercase tracking-wide">
                                      {category.category}
                                    </h3>
                                    <div className="space-y-2">
                                      {category.subcategories
                                        .slice(0, 4)
                                        .map((subcategory) => (
                                          <Link
                                            key={subcategory}
                                            to={`/products/${createSlug(
                                              category.category
                                            )}/${createSlug(subcategory)}`}
                                            className="block text-gray-300 hover:text-white text-sm transition-colors duration-200 hover:translate-x-1 transform">
                                            {subcategory}
                                          </Link>
                                        ))}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                    {/* Enhanced Account Dropdown with 4 Sections */}
                    {item.hasDropdown &&
                      hoveredItem === item.name &&
                      item.dropdownType === "account" && (
                        <div
                          className="absolute top-full right-0 border border-slate-700 rounded-lg mt-2 w-[800px] z-50 shadow-xl p-6"
                          style={{
                            background:
                              "linear-gradient(to right, rgba(3, 7, 18, 0.95), rgba(17, 24, 39, 0.9), rgba(31, 41, 55, 0.95))",
                          }}
                          onMouseEnter={() => handleMouseEnter(item.name)}
                          onMouseLeave={handleMouseLeave}>
                          <div className="grid grid-cols-4 gap-6">
                            {accountDropdownSections.map(
                              (section, sectionIndex) => (
                                <div
                                  key={section.title}
                                  className={`${
                                    sectionIndex < 3
                                      ? "border-r border-slate-600 pr-6"
                                      : ""
                                  }`}>
                                  <h3 className="text-[#e1a95f] font-semibold text-sm mb-4 uppercase tracking-wide">
                                    {section.title}
                                  </h3>
                                  <div className="space-y-3">
                                    {section.items.map((dropdownItem) => (
                                      <Link
                                        key={dropdownItem.name}
                                        to={dropdownItem.href}
                                        className="flex items-center space-x-3 text-gray-300 hover:text-white text-sm transition-all duration-200 hover:translate-x-1 transform group">
                                        <dropdownItem.icon className="h-4 w-4 text-gray-400 group-hover:text-[#e1a95f] transition-colors" />
                                        <span>{dropdownItem.name}</span>
                                      </Link>
                                    ))}
                                  </div>
                                </div>
                              )
                            )}
                          </div>

                          {/* Logout Button at the Bottom */}
                          <div className="border-t border-slate-600 mt-6 pt-4">
                            <button
                              onClick={handleLogout}
                              className="flex items-center space-x-3 text-red-400 hover:text-red-300 text-sm font-medium transition-all duration-200 hover:translate-x-1 transform group">
                              <LogOut className="h-4 w-4 group-hover:text-red-300 transition-colors" />
                              <span>Logout</span>
                            </button>
                          </div>
                        </div>
                      )}
                  </div>
                )
              )}
            </div>

            {/* Language Selector */}
            <div className="relative language-dropdown">
              <button
                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                className="flex items-center space-x-1 text-sm text-white hover:text-[#e1a95f] transition-colors duration-200">
                <Globe className="h-4 w-4" />
                <span>{selectedLanguage.name}</span>
                <ChevronDown className="h-4 w-4" />
              </button>

              {isLanguageOpen && (
                <div className="absolute top-full right-0 bg-gradient-to-r from-gray-950 via-gray-900 to-gray-800 border border-slate-700 rounded-lg mt-2 min-w-[150px] z-50 shadow-xl">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setSelectedLanguage(lang);
                        setIsLanguageOpen(false);
                        i18n.changeLanguage(lang.code);
                      }}
                      className="w-full text-left px-4 py-3 text-sm text-white hover:text-[#e1a95f] hover:bg-slate-800/50 transition-colors duration-200 first:rounded-t-lg last:rounded-b-lg">
                      {lang.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Enhanced Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-3 border-t border-slate-700">
              <div className="space-y-1">
                {(user ? navItems : navItemsForUnauthenticated).map(
                  (item, index) => (
                    <div key={item.name}>
                      <div className="flex items-center justify-between">
                        <Link
                          to={item.href}
                          className={`flex items-center space-x-2 px-3 py-2 text-lg font-medium transition-colors duration-200 hover:text-[#e1a95f] flex-1 ${
                            index === 0 ? "text-[#e1a95f]" : item.isAuth ? "bg-[#e1a95f] text-[#1f3b73] rounded-lg hover:bg-[#f6b868] hover:text-[#1f3b73]" : "text-white"
                          }`}>
                          <span>{item.name}</span>
                        </Link>
                        {item.hasDropdown && (
                          <button
                            onClick={() => toggleMobileDropdown(item.name)}
                            className="p-2 text-white hover:text-[#e1a95f] transition-colors">
                            <ChevronDown
                              className={`h-4 w-4 transition-transform duration-200 ${
                                mobileDropdownOpen === item.name
                                  ? "rotate-180"
                                  : ""
                              }`}
                            />
                          </button>
                        )}
                      </div>

                      {/* Mobile Categories Dropdown for Explore */}
                      {item.hasDropdown &&
                        mobileDropdownOpen === item.name &&
                        item.dropdownType === "categories" && (
                          <div className="ml-4 mt-2 space-y-4 border-l-2 border-slate-700 pl-4 max-h-96 overflow-y-auto">
                            {categories.map((category) => (
                              <div
                                key={category.category}
                                className="space-y-2">
                                <h4 className="text-[#e1a95f] font-semibold text-sm uppercase tracking-wide">
                                  {category.category}
                                </h4>
                                <div className="ml-2 space-y-1">
                                  {category.subcategories.map((subcategory) => (
                                    <Link
                                      key={subcategory}
                                      to={`/products/${createSlug(
                                        category.category
                                      )}/${createSlug(subcategory)}`}
                                      className="block text-gray-300 hover:text-[#e1a95f] text-sm transition-colors duration-200 py-1">
                                      {subcategory}
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                      {/* Mobile Account Dropdown with Sections */}
                      {item.hasDropdown &&
                        mobileDropdownOpen === item.name &&
                        item.dropdownType === "account" && (
                          <div className="ml-4 mt-2 space-y-6 border-l-2 border-slate-700 pl-4 max-h-96 overflow-y-auto">
                            {accountDropdownSections.map((section) => (
                              <div key={section.title} className="space-y-2">
                                <h4 className="text-[#e1a95f] font-semibold text-sm uppercase tracking-wide">
                                  {section.title}
                                </h4>
                                <div className="ml-2 space-y-1">
                                  {section.items.map((dropdownItem) => (
                                    <Link
                                      key={dropdownItem.name}
                                      to={dropdownItem.href}
                                      className="flex items-center space-x-3 text-gray-300 hover:text-[#e1a95f] text-sm transition-colors duration-200 py-1">
                                      <dropdownItem.icon className="h-4 w-4" />
                                      <span>{dropdownItem.name}</span>
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            ))}
                            
                            {/* Mobile Logout Button */}
                            <div className="border-t border-slate-700 pt-4 mt-4">
                              <button
                                onClick={handleLogout}
                                className="flex items-center space-x-3 text-red-400 hover:text-red-300 text-sm font-medium transition-colors duration-200">
                                <LogOut className="h-4 w-4" />
                                <span>Logout</span>
                              </button>
                            </div>
                          </div>
                        )}
                    </div>
                  )
                )}

                {/* Language Selector for Mobile */}
                <div className="border-t border-slate-700 pt-4 mt-4">
                  <button
                    onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                    className="flex items-center justify-between w-full px-3 py-2 text-lg font-medium text-white hover:text-[#e1a95f] transition-colors duration-200">
                    <div className="flex items-center space-x-2">
                      <Globe className="h-5 w-5" />
                      <span>{selectedLanguage.name}</span>
                    </div>
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-200 ${
                        isLanguageOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isLanguageOpen && (
                    <div className="ml-4 mt-2 space-y-1 border-l-2 border-slate-700 pl-4">
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => {
                            setSelectedLanguage(lang);
                            setIsLanguageOpen(false);
                            i18n.changeLanguage(lang.code);
                          }}
                          className="block w-full text-left px-3 py-2 text-gray-300 hover:text-[#e1a95f] text-sm transition-colors duration-200">
                          {lang.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;