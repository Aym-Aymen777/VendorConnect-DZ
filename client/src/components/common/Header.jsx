import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Menu,
  X,
  Search,
  ShoppingCart,
  User,
  ChevronDown,
  Heart,
} from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const user = false;

  const categories = [
    "All",
    "Furniture",
    "Lighting",
    "Decor",
    "Textiles",
    "Storage",
  ];

  const navItems = [
    { name: "All Departments", href: "/departments", hasDropdown: true },
    { name: "Home", href: "/home", hasDropdown: true },
    { name: "Promotions", href: "/promotions", hasDropdown: true },
    { name: "Shop", href: "/shop", hasDropdown: true },
    { name: "Blog", href: "/blog", hasDropdown: true },
    { name: "Page", href: "/page", hasDropdown: true },
    { name: "Elements", href: "/elements", hasDropdown: true },
  ];

  const navItemsForUnauthenticated = [
    { name: "Home", href: "/", hasDropdown: false },
    { name: "About Us", href: "#about", hasDropdown: false },
    { name: "Join Us", href: "#joinUs", hasDropdown: false },
    { name: "Services", href: "#services", hasDropdown: false },
    { name: "Contact", href: "#contact", hasDropdown: false },
  ];

  return (
    <header className="bg-gradient-to-r from-[#f4f2ed] via-[#f6b868] to-[#1f3b73] to-[#1f3b73] shadow-lg sticky top-0 z-50">
      {/* Top Row - Logo, Search, Actions */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
                     <img src="/logo.png" alt="" className='w-40 mx-auto md:mx-0 md:w-44 '/>


          {/* Desktop Search Bar */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <div className="flex w-full bg-slate-800 rounded-lg overflow-hidden">
              <input
                type="text"
                placeholder="Search in 20,000+ products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 bg-transparent text-white placeholder-gray-400 px-4 py-3 border-none outline-none"
              />
              <div className="flex">
                <button className=" bg-[#e1a95f] hover:bg-[#f6b868] px-6 py-3 text-slate-800 font-medium transition-colors">
                  Search
                </button>
              </div>
            </div>
          </div>

          {/* Desktop User Actions */}
          {user ? (
            <div className="hidden md:flex items-center space-x-4">
              {/* Wishlist */}
              <button className="p-2 text-white hover:text-[#1f3b73] transition-colors relative">
                <Heart className="h-6 w-6" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </button>

              {/* Cart */}
              <button className="p-2 text-white hover:text-[#1f3b73] transition-colors relative">
                <ShoppingCart className="h-6 w-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Profile */}
              <button className="p-2 text-white hover:text-yellow-200 transition-colors">
                <User className="h-6 w-6" />
              </button>
            </div>
          ) : (
            <div className="hidden md:flex items-center space-x-3">
              <Button
                variant="ghost"
                className="text-white hover:text-[#1f3b73]">
                Sign In
              </Button>
           <Button className="bg-[#e1a95f] text-[#1f3b73] hover:bg-[#f6b868]">
                Sign Up
              </Button>
            </div>
          )}

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            {user && (
              <>
                <button className="p-2 text-white hover:text-[#1f3b73] relative">
                  <Heart className="h-5 w-5" />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                      {wishlistCount}
                    </span>
                  )}
                </button>
                <button className="p-2 text-white hover:text-[#1f3b73] relative">
                  <ShoppingCart className="h-5 w-5" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </button>
                <button className="p-2 text-white hover:text-yellow-200">
                  <User className="h-5 w-5" />
                </button>
              </>
            )}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-white hover:text-[#1f3b73]">
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
              className="flex-1 bg-transparent text-white placeholder-gray-400 px-4 py-3 border-none outline-none"
            />
            <button className="bg-[#e1a95f] hover:bg-[#f6b868] px-4 py-3 text-slate-800">
              <Search className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Row - Navigation */}
      <div className="from-gray-950 via-gray-900 to-gray-800 border-t border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-between h-12">
            <div className="flex items-center space-x-8">
              <>
                {(user ? navItems : navItemsForUnauthenticated).map(
                  (item, index) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className={`flex items-center space-x-1 text-sm font-medium transition-colors duration-200 hover:text-[#e1a95f] ${
                        index === 0 ? "text-[#e1a95f]" : "text-[#1f3b73]"
                      }`}>
                      <span>{item.name}</span>
                      {item.hasDropdown && <ChevronDown className="h-4 w-4" />}
                    </a>
                  )
                )}
              </>
            </div>
            <div className="flex items-center space-x-1 tex-[#1f3b73]">
              <span className="text-sm">english</span>
              <ChevronDown className="h-4 w-4" />
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-3 border-t border-slate-700">
              <div className="space-y-1">
                {(user ? navItems : navItemsForUnauthenticated).map(
                  (item, index) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className={`flex items-center space-x-1 text-lg font-medium transition-colors duration-200 hover:text-[#e1a95f] ${
                        index === 0 ? "text-[#e1a95f]" : "text-[#1f3b73]"
                      }`}>
                      <span>{item.name}</span>
                      {item.hasDropdown && <ChevronDown className="h-4 w-4" />}
                    </a>
                  )
                )}
                <div className="border-t border-slate-700 pt-3 mt-3">
                  <a
                    href="/recent"
                    className="flex items-center justify-between px-3 py-2 rounded-md text-[#1f3b73] hover:text-white hover:bg-slate-700">
                    <span>english</span>
                    <ChevronDown className="h-4 w-4" />
                  </a>
                </div>
                {!user && (
                  <div className="border-t border-slate-700 pt-3 mt-3 space-y-2">
                    <Button
                      variant="ghost"
                      className="w-full text-[#1f3b73] hover:text-white">
                      Sign In
                    </Button>
                   <Button className="w-full bg-[#e1a95f] hover:bg-[#f6b868] text-[#1f3b73]">

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
