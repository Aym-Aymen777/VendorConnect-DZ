import { useState } from "react";
import { Star, MapPin, Phone, Mail, Search, Filter, Award, Clock, ChevronRight, Heart, Share2 } from "lucide-react";
import Header from "../components/common/Header";

const suppliers = [
  {
    id: 1,
    name: "BuildPro Supplies",
    logo: "/suppliers/buildpro.png",
    rating: 4.7,
    reviews: 234,
    location: "Cairo, Egypt",
    phone: "+20 100 123 4567",
    email: "info@buildpro.com",
    categories: ["Building Materials", "Flooring"],
    featured: true,
    verified: true,
    responseTime: "< 2 hours",
    description: "Leading supplier for construction and finishing materials with fast delivery and premium quality assurance.",
    projects: 150,
    yearsInBusiness: 8
  },
  {
    id: 2,
    name: "HomeStyle Furnishings",
    logo: "/suppliers/homestyle.png",
    rating: 4.5,
    reviews: 189,
    location: "Alexandria, Egypt",
    phone: "+20 101 234 5678",
    email: "contact@homestyle.com",
    categories: ["Furniture", "Home Appliances"],
    featured: false,
    verified: true,
    responseTime: "< 4 hours",
    description: "Quality furniture and appliances for modern homes with contemporary designs.",
    projects: 98,
    yearsInBusiness: 5
  },
  {
    id: 3,
    name: "GreenScape Gardens",
    logo: "/suppliers/greenscape.png",
    rating: 4.9,
    reviews: 312,
    location: "Giza, Egypt",
    phone: "+20 102 345 6789",
    email: "sales@greenscape.com",
    categories: ["Outdoor & Garden"],
    featured: true,
    verified: true,
    responseTime: "< 1 hour",
    description: "Your partner for landscaping and outdoor solutions with eco-friendly approach.",
    projects: 220,
    yearsInBusiness: 12
  },
  {
    id: 4,
    name: "ElectroTech Solutions",
    logo: "/suppliers/electrotech.png",
    rating: 4.6,
    reviews: 156,
    location: "Cairo, Egypt",
    phone: "+20 103 456 7890",
    email: "info@electrotech.com",
    categories: ["Electrical", "Smart Home"],
    featured: false,
    verified: true,
    responseTime: "< 3 hours",
    description: "Modern electrical solutions and smart home automation systems.",
    projects: 85,
    yearsInBusiness: 6
  }
];

const categories = ["All", "Building Materials", "Flooring", "Furniture", "Home Appliances", "Outdoor & Garden", "Electrical", "Smart Home"];

export default function Suppliers() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showFilters, setShowFilters] = useState(false);
  const [likedSuppliers, setLikedSuppliers] = useState(new Set());

  const filtered = suppliers.filter((s) => {
    const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.categories.some((cat) => cat.toLowerCase().includes(search.toLowerCase()));
    const matchesCategory = selectedCategory === "All" || 
      s.categories.includes(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  const toggleLike = (id) => {
    setLikedSuppliers(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const featuredSuppliers = filtered.filter(s => s.featured);
  const regularSuppliers = filtered.filter(s => !s.featured);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f4f2ed] to-[#f9f7f2]">
      {/* Hero Section */}
      <Header />
      <div className="container mx-auto px-4 py-12">
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-[#1f3b73]/10 text-center hover:shadow-xl transition-all duration-300">
            <div className="text-3xl font-bold text-[#1f3b73] mb-2">{suppliers.length}+</div>
            <div className="text-[#1f3b73]/70">Verified Suppliers</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-[#1f3b73]/10 text-center hover:shadow-xl transition-all duration-300">
            <div className="text-3xl font-bold text-[#e1a95f] mb-2">500+</div>
            <div className="text-[#1f3b73]/70">Completed Projects</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-[#1f3b73]/10 text-center hover:shadow-xl transition-all duration-300">
            <div className="text-3xl font-bold text-[#1f3b73] mb-2">4.7★</div>
            <div className="text-[#1f3b73]/70">Average Rating</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-[#1f3b73]/10 text-center hover:shadow-xl transition-all duration-300">
            <div className="text-3xl font-bold text-[#e1a95f] mb-2">24/7</div>
            <div className="text-[#1f3b73]/70">Support Available</div>
          </div>
        </div>

        {/* Featured Suppliers */}
        {featuredSuppliers.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-8">
              <Award className="text-[#e1a95f]" size={28} />
              <h2 className="text-3xl font-bold text-[#1f3b73]">Featured Suppliers</h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredSuppliers.map((s) => (
                <div
                  key={s.id}
                  className="group relative bg-white rounded-3xl shadow-xl border border-[#1f3b73]/10 p-8 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden"
                >
                  {/* Featured Badge */}
                  <div className="absolute top-6 right-6 bg-gradient-to-r from-[#e1a95f] to-[#d89a4b] text-white text-sm px-4 py-2 rounded-full shadow-lg font-bold z-10">
                    ⭐ Featured
                  </div>

                  {/* Action Buttons */}
                  <div className="absolute top-6 left-6 flex gap-2 z-10">
                    <button
                      onClick={() => toggleLike(s.id)}
                      className={`p-2 rounded-full transition-all duration-300 ${
                        likedSuppliers.has(s.id)
                          ? "bg-red-500 text-white"
                          : "bg-white/80 text-[#1f3b73] hover:bg-red-500 hover:text-white"
                      }`}
                    >
                      <Heart size={16} fill={likedSuppliers.has(s.id) ? "currentColor" : "none"} />
                    </button>
                    <button className="p-2 bg-white/80 text-[#1f3b73] rounded-full hover:bg-[#e1a95f] hover:text-white transition-all duration-300">
                      <Share2 size={16} />
                    </button>
                  </div>

                  <div className="flex items-start gap-6 mb-6">
                    <div className="relative">
                      <img
                        src={s.logo}
                        alt={s.name}
                        className="w-20 h-20 rounded-2xl object-contain border-2 border-[#e1a95f]/30 bg-[#f4f2ed] group-hover:scale-110 transition-transform duration-300"
                      />
                      {s.verified && (
                        <div className="absolute -bottom-2 -right-2 bg-green-500 text-white rounded-full p-1">
                          <Award size={12} />
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-[#1f3b73] mb-2 group-hover:text-[#e1a95f] transition-colors">
                        {s.name}
                      </h3>
                      <div className="flex items-center gap-4 mb-3">
                        <div className="flex items-center gap-1 text-[#e1a95f]">
                          <Star size={18} fill="currentColor" />
                          <span className="font-bold text-lg">{s.rating}</span>
                          <span className="text-[#1f3b73]/60 text-sm">({s.reviews} reviews)</span>
                        </div>
                        <div className="flex items-center gap-1 text-green-600 text-sm">
                          <Clock size={14} />
                          <span>{s.responseTime}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="text-[#1f3b73]/80 mb-6 leading-relaxed">{s.description}</p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {s.categories.map((cat) => (
                      <span
                        key={cat}
                        className="bg-gradient-to-r from-[#e1a95f]/20 to-[#e1a95f]/10 text-[#e1a95f] px-4 py-2 rounded-full text-sm font-medium border border-[#e1a95f]/20"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-6 mb-6">
                    <div className="text-center p-4 bg-[#f4f2ed] rounded-xl">
                      <div className="text-2xl font-bold text-[#1f3b73]">{s.projects}</div>
                      <div className="text-sm text-[#1f3b73]/70">Projects Done</div>
                    </div>
                    <div className="text-center p-4 bg-[#f4f2ed] rounded-xl">
                      <div className="text-2xl font-bold text-[#e1a95f]">{s.yearsInBusiness}</div>
                      <div className="text-sm text-[#1f3b73]/70">Years Experience</div>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3 text-[#1f3b73]">
                      <MapPin size={18} className="text-[#e1a95f]" />
                      <span>{s.location}</span>
                    </div>
                    <div className="flex items-center gap-3 text-[#1f3b73]">
                      <Phone size={18} className="text-[#e1a95f]" />
                      <span>{s.phone}</span>
                    </div>
                    <div className="flex items-center gap-3 text-[#1f3b73]">
                      <Mail size={18} className="text-[#e1a95f]" />
                      <span>{s.email}</span>
                    </div>
                  </div>

                  <button className="w-full bg-gradient-to-r from-[#e1a95f] to-[#d89a4b] text-white font-bold px-6 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105 flex items-center justify-center gap-2">
                    View Supplier Details
                    <ChevronRight size={20} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Regular Suppliers */}
        {regularSuppliers.length > 0 && (
          <div>
            <h2 className="text-3xl font-bold text-[#1f3b73] mb-8">All Suppliers</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {regularSuppliers.map((s) => (
                <div
                  key={s.id}
                  className="group bg-white rounded-2xl shadow-lg border border-[#1f3b73]/10 p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden"
                >
                  {/* Action Buttons */}
                  <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={() => toggleLike(s.id)}
                      className={`p-2 rounded-full transition-all duration-300 ${
                        likedSuppliers.has(s.id)
                          ? "bg-red-500 text-white"
                          : "bg-white text-[#1f3b73] hover:bg-red-500 hover:text-white shadow-lg"
                      }`}
                    >
                      <Heart size={14} fill={likedSuppliers.has(s.id) ? "currentColor" : "none"} />
                    </button>
                    <button className="p-2 bg-white text-[#1f3b73] rounded-full hover:bg-[#e1a95f] hover:text-white transition-all duration-300 shadow-lg">
                      <Share2 size={14} />
                    </button>
                  </div>

                  <div className="flex items-center gap-4 mb-4">
                    <div className="relative">
                      <img
                        src={s.logo}
                        alt={s.name}
                        className="w-16 h-16 rounded-xl object-contain border border-[#e1a95f]/30 bg-[#f4f2ed] group-hover:scale-110 transition-transform duration-300"
                      />
                      {s.verified && (
                        <div className="absolute -bottom-1 -right-1 bg-green-500 text-white rounded-full p-1">
                          <Award size={10} />
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[#1f3b73] group-hover:text-[#e1a95f] transition-colors">
                        {s.name}
                      </h3>
                      <div className="flex items-center gap-1 text-[#e1a95f]">
                        <Star size={16} fill="currentColor" />
                        <span className="font-semibold">{s.rating}</span>
                        <span className="text-[#1f3b73]/60 text-sm">({s.reviews})</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-[#1f3b73]/70 text-sm mb-4">{s.description}</p>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {s.categories.map((cat) => (
                      <span
                        key={cat}
                        className="bg-[#e1a95f]/10 text-[#e1a95f] px-3 py-1 rounded-full text-xs font-medium"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>

                  <div className="space-y-2 text-sm text-[#1f3b73] mb-6">
                    <div className="flex items-center gap-2">
                      <MapPin size={14} className="text-[#e1a95f]" />
                      <span>{s.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={14} className="text-green-600" />
                      <span className="text-green-600">{s.responseTime}</span>
                    </div>
                  </div>

                  <button className="w-full bg-[#e1a95f] hover:bg-[#d89a4b] text-white font-semibold px-4 py-3 rounded-xl shadow transition-all duration-300 group-hover:shadow-lg flex items-center justify-center gap-2">
                    View Details
                    <ChevronRight size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* No Results */}
        {filtered.length === 0 && (
          <div className="text-center py-16">
            <div className="bg-white rounded-3xl p-12 shadow-lg border border-[#1f3b73]/10 max-w-md mx-auto">
              <Search className="text-[#e1a95f] mx-auto mb-6" size={48} />
              <h3 className="text-2xl font-bold text-[#1f3b73] mb-4">No suppliers found</h3>
              <p className="text-[#1f3b73]/70 mb-6">Try adjusting your search criteria or browse all categories</p>
              <button
                onClick={() => {
                  setSearch("");
                  setSelectedCategory("All");
                }}
                className="bg-[#e1a95f] hover:bg-[#d89a4b] text-white font-semibold px-6 py-3 rounded-xl transition-colors"
              >
                Reset Filters
              </button>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slide-down {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
        
        .animate-slide-down {
          animation: slide-down 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}