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
} from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [cartCount, setCartCount] = useState(3);
  const [wishlistCount, setWishlistCount] = useState(7);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(null);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const hoverTimeout = useRef(null);
  const user = true; // Toggle this to test authenticated/unauthenticated states

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

  const navItems = [
    {
      name: "Home",
      href: "/",
      hasDropdown: false,
      icon: null,
    },
    {
      name: "Explore",
      href: "/",
      hasDropdown: true,
      icon: null,
      dropdownType: "categories", // Special type for category dropdown
    },
    {
      name: "Deals",
      href: "/deals",
      hasDropdown: false,
      icon: null,
    },
    {
      name: "My Orders",
      href: "/orders",
      hasDropdown: false,
      icon: null,
    },
    {
      name: "Favorites",
      href: "/favorites",
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
      href: "/account",
      hasDropdown: true,
      icon: null,
      dropdownItems: [
        { name: "Profile", href: "/account/profile", icon: User },
        { name: "Settings", href: "/account/settings", icon: Settings },
        { name: "Help Center", href: "/account/help", icon: HelpCircle },
        { name: "Logout", href: "/logout", icon: LogOut },
      ],
    },
  ];

  const navItemsForUnauthenticated = [
    { name: "Home", href: "/", hasDropdown: false },
    { name: "About Us", href: "#about", hasDropdown: false },
    { name: "Join Us", href: "#joinUs", hasDropdown: false },
    { name: "Services", href: "#services", hasDropdown: false },
    { name: "Contact", href: "#contact", hasDropdown: false },
  ];

  const languages = [
    { code: "en", name: "English" },
    { code: "es", name: "Español" },
    { code: "fr", name: "Français" },
    { code: "de", name: "Deutsch" },
  ];

  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);

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
    <header className="bg-gradient-to-r from-[#f4f2ed] via-[#f6b868] to-[#1f3b73] shadow-lg sticky top-0 z-50">
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
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <div
              className={`flex w-full bg-slate-800 rounded-lg overflow-hidden transition-all duration-200 ${
                isSearchFocused ? "ring-2 ring-[#e1a95f]" : ""
              }`}>
              <input
                type="text"
                placeholder="Search in 20,000+ products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch(e)}
                className="flex-1 bg-transparent text-white placeholder-gray-400 px-4 py-3 border-none outline-none"
              />
              <button
                onClick={handleSearch}
                className="bg-[#e1a95f] hover:bg-[#f6b868] px-6 py-3 text-slate-800 font-medium transition-colors duration-200 flex items-center space-x-2">
                <Search className="h-4 w-4" />
                <span className="hidden lg:inline">Search</span>
              </button>
            </div>
          </div>

          {/* Desktop User Actions */}
          {user ? (
            <div className="hidden md:flex items-center space-x-4">
              {/* Wishlist */}
              <button className="p-2 text-white hover:text-[#e1a95f] transition-colors duration-200 relative group">
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
              <button className="p-2 text-white hover:text-[#e1a95f] transition-colors duration-200 relative group">
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
              <button className="p-2 text-white hover:text-[#e1a95f] transition-colors duration-200 relative group">
                <User className="h-6 w-6" />
                <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  Profile
                </span>
              </button>
            </div>
          ) : (
            <div className="hidden md:flex items-center space-x-3">
              <Button
                variant="ghost"
                className="text-white hover:text-[#e1a95f] hover:bg-white/10 transition-all duration-200">
                Sign In
              </Button>
              <Button className="bg-[#e1a95f] text-[#1f3b73] hover:bg-[#f6b868] transition-all duration-200 shadow-md hover:shadow-lg">
                Sign Up
              </Button>
            </div>
          )}

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            {user && (
              <>
                <button className="p-2 text-white hover:text-[#e1a95f] transition-colors relative">
                  <Heart className="h-5 w-5" />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                      {wishlistCount}
                    </span>
                  )}
                </button>
                <button className="p-2 text-white hover:text-[#e1a95f] transition-colors relative">
                  <ShoppingCart className="h-5 w-5" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </button>
                <button className="p-2 text-white hover:text-[#e1a95f] transition-colors">
                  <User className="h-5 w-5" />
                </button>
              </>
            )}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-white hover:text-[#e1a95f] transition-colors duration-200">
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
                    <a
                      href={item.href}
                      className={`flex items-center space-x-1 text-sm font-medium transition-colors duration-200 hover:text-[#e1a95f] ${
                        index === 0 ? "text-[#e1a95f]" : "text-white"
                      }`}>
                      <span>{item.name}</span>
                      {item.hasDropdown && <ChevronDown className="h-4 w-4" />}
                    </a>

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

                    {/* Regular Dropdown Menu for other items */}
                    {item.hasDropdown &&
                      hoveredItem === item.name &&
                      item.dropdownItems && (
                        <div
                          className="absolute top-full left-0 bg-gradient-to-r from-gray-950 via-gray-900 to-gray-800 border border-slate-700 rounded-lg mt-2 min-w-[200px] z-50 shadow-xl"
                          onMouseEnter={() => handleMouseEnter(item.name)}
                          onMouseLeave={handleMouseLeave}>
                          {item.dropdownItems.map((dropdownItem, idx) => (
                            <a
                              key={dropdownItem.name}
                              href={dropdownItem.href}
                              className="flex items-center space-x-3 px-4 py-3 text-sm text-white hover:text-[#e1a95f] hover:bg-slate-800/50 transition-colors duration-200 first:rounded-t-lg last:rounded-b-lg">
                              {dropdownItem.icon && (
                                <dropdownItem.icon className="h-4 w-4" />
                              )}
                              <span>{dropdownItem.name}</span>
                            </a>
                          ))}
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
                        <a
                          href={item.href}
                          className={`flex items-center space-x-2 px-3 py-2 text-lg font-medium transition-colors duration-200 hover:text-[#e1a95f] flex-1 ${
                            index === 0 ? "text-[#e1a95f]" : "text-white"
                          }`}>
                          <span>{item.name}</span>
                        </a>
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
                                    <a
                                      key={subcategory}
                                      href={`/products/${createSlug(
                                        category.category
                                      )}/${createSlug(subcategory)}`}
                                      className="block text-gray-300 hover:text-[#e1a95f] text-sm transition-colors duration-200 py-1">
                                      {subcategory}
                                    </a>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                      {/* Mobile Regular Dropdown Items */}
                      {item.hasDropdown &&
                        mobileDropdownOpen === item.name &&
                        item.dropdownItems && (
                          <div className="ml-4 mt-2 space-y-1 border-l-2 border-slate-700 pl-4">
                            {item.dropdownItems.map((dropdownItem) => (
                              <a
                                key={dropdownItem.name}
                                href={dropdownItem.href}
                                className="flex items-center space-x-3 px-3 py-2 text-base text-gray-300 hover:text-[#e1a95f] transition-colors duration-200">
                                {dropdownItem.icon && (
                                  <dropdownItem.icon className="h-4 w-4" />
                                )}
                                <span>{dropdownItem.name}</span>
                              </a>
                            ))}
                          </div>
                        )}
                    </div>
                  )
                )}

                {/* Mobile Language Selector */}
                <div className="border-t border-slate-700 pt-3 mt-3">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-2 text-white flex items-center space-x-2">
                      <Globe className="h-4 w-4" />
                      <span>Language</span>
                    </span>
                    <button
                      onClick={() => toggleMobileDropdown("language")}
                      className="p-2 text-white hover:text-[#e1a95f] transition-colors">
                      <ChevronDown
                        className={`h-4 w-4 transition-transform duration-200 ${
                          mobileDropdownOpen === "language" ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  </div>
                  {mobileDropdownOpen === "language" && (
                    <div className="ml-4 mt-2 space-y-1 border-l-2 border-slate-700 pl-4">
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => {
                            setSelectedLanguage(lang);
                            setMobileDropdownOpen(null);
                          }}
                          className="block w-full text-left px-3 py-2 text-base text-gray-300 hover:text-[#e1a95f] transition-colors duration-200">
                          {lang.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Mobile Auth Buttons */}
                {!user && (
                  <div className="border-t border-slate-700 pt-3 mt-3 space-y-2">
                    <Button
                      variant="ghost"
                      className="w-full text-white hover:text-[#e1a95f] hover:bg-white/10 transition-all duration-200">
                      Sign In
                    </Button>
                    <Button className="w-full bg-[#e1a95f] hover:bg-[#f6b868] text-[#1f3b73] transition-all duration-200">
                      Sign Up
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
