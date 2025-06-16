import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { PaintRoller, Menu, X, Search, ShoppingCart, User, Bell, ChevronDown } from "lucide-react"

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [cartCount, setCartCount] = useState(3);
  const user = false;

  const navItems = [
    { name: 'Marketplace', href: '/marketplace', active: true },
    { name: 'Products', href: '/products' },
    { name: 'Suppliers', href: '/suppliers' },
    { name: 'Contact', href: '/contact' }
  ];

  return (
    <header className=" shadow-lg sticky top-0 z-50 border-b border-gray-800">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <PaintRoller className="h-8 w-8 text-yellow-400" />
              <span className="text-white font-bold text-xl hidden sm:block">DEADECOR</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <ul className="flex items-center space-x-6">
              {navItems.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className={`text-sm font-medium transition-colors duration-200 hover:text-yellow-300 ${
                      item.active ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Desktop User Actions */}
          {user ? (
            <div className="hidden md:flex items-center space-x-4">
              {/* Search */}
              <div className="relative">
                {isSearchOpen ? (
                  <div className="flex items-center bg-slate-800 rounded-lg px-3 py-2">
                    <Search className="h-4 w-4 text-gray-400 mr-2" />
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="bg-transparent text-white placeholder-gray-400 border-none outline-none w-48"
                      autoFocus
                    />
                    <button
                      onClick={() => setIsSearchOpen(false)}
                      className="ml-2 text-gray-400 hover:text-white"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setIsSearchOpen(true)}
                    className="p-2 text-gray-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                  >
                    <Search className="h-5 w-5" />
                  </button>
                )}
              </div>

              {/* Notifications */}
              <button className="p-2 text-gray-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-yellow-400 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  2
                </span>
              </button>

              {/* Cart */}
              <button className="p-2 text-gray-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors relative">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-yellow-400 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Profile Dropdown */}
              <div className="relative group">
                <button className="flex items-center space-x-2 p-2 text-gray-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
                  <User className="h-5 w-5" />
                  <ChevronDown className="h-4 w-4" />
                </button>
                {/* Dropdown menu would go here */}
              </div>
            </div>
          ) : (
            <div className="hidden md:flex items-center space-x-3">
              <Button variant="ghost" className="text-gray-300 hover:text-white">
                Sign In
              </Button>
              <Button className="bg-yellow-400 hover:bg-yellow-300 text-white">
                Sign Up
              </Button>
            </div>
          )}

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            {user && (
              <>
                <button
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                  className="p-2 text-gray-300 hover:text-white"
                >
                  <Search className="h-5 w-5" />
                </button>
                <button className="p-2 text-gray-300 hover:text-white relative">
                  <ShoppingCart className="h-5 w-5" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-yellow-400 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </button>
              </>
            )}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-300 hover:text-white"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {isSearchOpen && (
          <div className="md:hidden py-3 border-t border-slate-700">
            <div className="flex items-center bg-slate-800 rounded-lg px-3 py-2">
              <Search className="h-4 w-4 text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-transparent text-white placeholder-gray-400 border-none outline-none flex-1"
              />
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 border-t border-slate-700">
              {user ? (
                <>
                  {navItems.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                        item.active
                          ? 'text-yellow-400 bg-slate-800'
                          : 'text-gray-300 hover:text-white hover:bg-slate-800'
                      }`}
                    >
                      {item.name}
                    </a>
                  ))}
                  <div className="border-t border-slate-700 pt-4 mt-4">
                    <button className="flex items-center space-x-3 px-3 py-2 rounded-md text-gray-300 hover:text-white hover:bg-slate-800 w-full">
                      <Bell className="h-5 w-5" />
                      <span>Notifications</span>
                      <span className="ml-auto bg-yellow-400 text-white text-xs rounded-full px-2 py-1">2</span>
                    </button>
                    <button className="flex items-center space-x-3 px-3 py-2 rounded-md text-gray-300 hover:text-white hover:bg-slate-800 w-full">
                      <User className="h-5 w-5" />
                      <span>Profile</span>
                    </button>
                  </div>
                </>
              ) : (
                <div className="space-y-2">
                  <Button variant="ghost" className="w-full text-gray-300 hover:text-white">
                    Sign In
                  </Button>
                  <Button className="w-full bg-yellow-400 hover:bg-yellow-300 text-white">
                    Sign Up
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;