import React, { useState, useEffect } from 'react';
import { Home, Search, Store, ShoppingBag, ArrowLeft, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { slugify } from '../utils/slugify';

export default function NotFound() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);

  const popularCategories = [
    { name: 'Building Materials', icon: '🪨' },
    { name: 'Electrical & Lighting', icon: '⚡' },
    { name: 'Flooring & Wall Coverings', icon: '🏡' },
    { name: 'Doors & Windows', icon: '🪟' },
    { name: 'kitchen & Fixtures', icon: '👨‍🍳' },
    { name: 'Home Appliances', icon: '🛋️' },
  ];


  useEffect(() => {
    setIsAnimating(true);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    // Handle search logic here
    console.log('Searching for:', searchTerm);
  };

  return (
    <div className="min-h-screen bg[#e1a95f] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-32 h-32 bg-[#1f3b73] rounded-full opacity-5 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-[#e1a95f] rounded-full opacity-10 animate-bounce"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-[#1f3b73] rounded-full opacity-5 animate-pulse delay-1000"></div>
        <div className="absolute bottom-40 right-1/3 w-20 h-20 bg-[#e1a95f] rounded-full opacity-10 animate-bounce delay-500"></div>
      </div>

      <div className={`max-w-4xl w-full text-center transition-all duration-1000 ${isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {/* 404 Hero Section */}
        <div className="mb-12">
          <div className="relative inline-block">
            <h1 className="text-9xl md:text-[12rem] font-bold text-[#1f3b73] opacity-20 select-none">
              404
            </h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <Sparkles className="w-16 h-16 text-[#e1a95f] animate-spin" strokeWidth={1.5} />
            </div>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-[#1f3b73] mb-4">
            Oops! Store Not Found
          </h2>
          <p className="text-lg text-[#1f3b73] opacity-80 max-w-2xl mx-auto mb-8">
            The product or vendor you're looking for seems to have wandered off to another marketplace. 
            But don't worry – we have thousands of amazing vendors waiting for you!
          </p>
        </div>

        {/* Search Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 mb-12 shadow-lg border border-[#e1a95f]/20">
          <h3 className="text-xl font-semibold text-[#1f3b73] mb-4 flex items-center justify-center gap-2">
            <Search className="w-5 h-5" />
            Find What You're Looking For
          </h3>
          
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="text"
              placeholder="Search products, stores, or categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-4 py-3 rounded-lg border-2 border-[#e1a95f]/30 focus:border-[#1f3b73] focus:outline-none transition-colors"
              onKeyPress={(e) => e.key === 'Enter' && handleSearch(e)}
            />
            <button
              onClick={handleSearch}
              className="px-6 py-3 bg-[#1f3b73] text-white rounded-lg hover:bg-[#1f3b73]/90 transition-colors font-medium"
            >
              Search
            </button>
          </div>
        </div>

        {/* Popular Categories */}
        <div className="mb-12">
          <h3 className="text-xl font-semibold text-[#1f3b73] mb-6">Popular Categories</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {popularCategories.map((category, index) => (
              <Link
                to={`/products/${slugify(category.name)}`}
                key={category.name}
                className="bg-white/60 backdrop-blur-sm rounded-xl p-4 hover:bg-white/80 transition-all duration-300 cursor-pointer group hover:scale-105 border border-[#e1a95f]/20"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">
                  {category.icon}
                </div>
                <p className="text-sm font-medium text-[#1f3b73]">{category.name}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link to="/" className="flex cursor-pointer items-center gap-2 px-8 py-3 bg-[#1f3b73] text-white rounded-lg hover:bg-[#1f3b73]/90 transition-all duration-300 font-medium min-w-[200px] justify-center group">
            <Home className="w-5 h-5 group-hover:scale-110 transition-transform" />
            Back to Homepage
          </Link>
          
          <Link to="/stores" className="flex cursor-pointer items-center gap-2 px-8 py-3 bg-white/80 text-[#1f3b73] rounded-lg hover:bg-white transition-all duration-300 font-medium min-w-[200px] justify-center group border-2 border-[#e1a95f]/30">
            <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
            Browse All Stores
          </Link>
        </div>

        {/* Help Text */}
        <div className="mt-8 text-sm text-[#1f3b73] opacity-70">
          <p>Still can't find what you're looking for? 
            <Link to="/contact" className="text-[#e1a95f]   font-medium cursor-pointer hover:underline ml-1">
              Contact our support team
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}