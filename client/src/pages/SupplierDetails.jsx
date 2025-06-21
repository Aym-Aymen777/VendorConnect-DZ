import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { 
  Star, MapPin, Phone, Mail, ArrowLeft, Package, Award, 
  Clock, Users, Shield, Heart, Share2, MessageCircle, 
  ChevronRight, Calendar, Truck, CheckCircle, Eye,
  Globe, Facebook, Instagram, Linkedin, Camera
} from "lucide-react";
import Header from "../components/common/Header";

// Mock supplier data (replace with real fetch logic)
const suppliers = [
  {
    id: "1",
    name: "BuildPro Supplies",
    logo: "/suppliers/buildpro.png",
    coverImage: "/suppliers/buildpro-cover.jpg",
    rating: 4.7,
    reviews: 234,
    location: "Cairo, Egypt",
    address: "123 Industrial Zone, New Cairo, Egypt",
    phone: "+20 100 123 4567",
    email: "info@buildpro.com",
    website: "www.buildpro.com",
    categories: ["Building Materials", "Flooring"],
    featured: true,
    verified: true,
    established: "2016",
    employees: "50-100",
    responseTime: "< 2 hours",
    deliveryTime: "2-5 days",
    paymentMethods: ["Cash", "Credit Card", "Bank Transfer"],
    certifications: ["ISO 9001", "CE Certified", "Green Building"],
    socialMedia: {
      facebook: "buildpro.supplies",
      instagram: "buildpro_supplies",
      linkedin: "buildpro-supplies"
    },
    description: "Leading supplier for construction and finishing materials with fast delivery and premium quality assurance. We have been serving the construction industry for over 8 years with excellence and reliability.",
    specialties: [
      "High-quality construction materials",
      "Fast delivery nationwide",
      "Technical consultation",
      "Bulk order discounts",
      "24/7 customer support"
    ],
    gallery: [
      "/gallery/buildpro-1.jpg",
      "/gallery/buildpro-2.jpg",
      "/gallery/buildpro-3.jpg",
      "/gallery/buildpro-4.jpg"
    ],
    products: [
      { 
        id: "p1", 
        name: "Premium Cement", 
        image: "/products/cement.jpg", 
        price: "$12/bag",
        category: "Building Materials",
        inStock: true,
        rating: 4.8,
        description: "High-grade Portland cement for all construction needs"
      },
      { 
        id: "p2", 
        name: "Ceramic Tiles", 
        image: "/products/tiles.jpg", 
        price: "$8/m²",
        category: "Flooring",
        inStock: true,
        rating: 4.6,
        description: "Premium ceramic tiles in various designs and sizes"
      },
      { 
        id: "p3", 
        name: "Steel Rebar", 
        image: "/products/rebar.jpg", 
        price: "$500/ton",
        category: "Building Materials",
        inStock: false,
        rating: 4.9,
        description: "High-strength steel reinforcement bars"
      },
      { 
        id: "p4", 
        name: "Marble Flooring", 
        image: "/products/marble.jpg", 
        price: "$25/m²",
        category: "Flooring",
        inStock: true,
        rating: 4.7,
        description: "Luxury marble flooring with professional installation"
      }
    ],
    testimonials: [
      {
        id: 1,
        name: "Ahmed Hassan",
        project: "Villa Construction",
        rating: 5,
        comment: "Excellent quality materials and very professional service. Highly recommended!",
        date: "2024-01-15"
      },
      {
        id: 2,
        name: "Sarah Mohamed",
        project: "Office Renovation",
        rating: 4,
        comment: "Great variety of products and competitive prices. Fast delivery as promised.",
        date: "2024-01-10"
      }
    ]
  },
  {
    id: "2",
    name: "HomeStyle Furnishings",
    logo: "/suppliers/homestyle.png",
    coverImage: "/suppliers/homestyle-cover.jpg",
    rating: 4.5,
    reviews: 189,
    location: "Alexandria, Egypt",
    address: "456 Furniture District, Alexandria, Egypt",
    phone: "+20 101 234 5678",
    email: "contact@homestyle.com",
    website: "www.homestyle.com",
    categories: ["Furniture", "Home Appliances"],
    featured: false,
    verified: true,
    established: "2019",
    employees: "20-50",
    responseTime: "< 4 hours",
    deliveryTime: "3-7 days",
    paymentMethods: ["Cash", "Credit Card", "Installments"],
    certifications: ["Quality Certified", "Eco-Friendly"],
    socialMedia: {
      facebook: "homestyle.furnishings",
      instagram: "homestyle_furniture"
    },
    description: "Quality furniture and appliances for modern homes with contemporary designs and affordable prices.",
    specialties: [
      "Modern furniture designs",
      "Home appliances",
      "Custom furniture solutions",
      "Interior design consultation",
      "Installation services"
    ],
    gallery: [
      "/gallery/homestyle-1.jpg",
      "/gallery/homestyle-2.jpg"
    ],
    products: [
      { 
        id: "p4", 
        name: "Modern Sofa", 
        image: "/products/sofa.jpg", 
        price: "$499",
        category: "Furniture",
        inStock: true,
        rating: 4.5,
        description: "Comfortable 3-seater sofa with modern design"
      },
      { 
        id: "p5", 
        name: "Dining Table", 
        image: "/products/dining-table.jpg", 
        price: "$299",
        category: "Furniture",
        inStock: true,
        rating: 4.3,
        description: "Elegant dining table for 6 people"
      }
    ],
    testimonials: [
      {
        id: 1,
        name: "Omar Khaled",
        project: "Living Room Setup",
        rating: 5,
        comment: "Beautiful furniture and excellent customer service!",
        date: "2024-01-12"
      }
    ]
  }
];

export default function SupplierDetails() {
  const { id } = useParams();
  const supplier = suppliers.find((s) => s.id === id);
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedImage, setSelectedImage] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  if (!supplier) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#f4f2ed] to-[#f9f7f2]">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="bg-white rounded-3xl p-12 shadow-lg border border-[#1f3b73]/10 max-w-md mx-auto">
            <Package className="text-[#e1a95f] mx-auto mb-6" size={48} />
            <h1 className="text-2xl font-bold text-[#1f3b73] mb-4">Supplier Not Found</h1>
            <p className="text-[#1f3b73]/70 mb-6">The supplier you're looking for doesn't exist or has been removed.</p>
            <Link 
              to="/suppliers" 
              className="inline-flex items-center gap-2 bg-[#e1a95f] hover:bg-[#d89a4b] text-white px-6 py-3 rounded-xl font-semibold transition-colors"
            >
              <ArrowLeft size={18} /> Back to Suppliers
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: "overview", label: "Overview", icon: Eye },
    { id: "products", label: "Products", icon: Package },
    { id: "gallery", label: "Gallery", icon: Camera },
    { id: "reviews", label: "Reviews", icon: Star }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f4f2ed] to-[#f9f7f2]">
      <Header />
      
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4">
        <Link
          to="/suppliers"
          className="inline-flex items-center gap-2 text-[#e1a95f] font-semibold hover:text-[#d89a4b] transition-colors group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> 
          Back to Suppliers
        </Link>
      </div>

      {/* Hero Section */}
      <div className="relative">
        <div 
          className="h-64 bg-gradient-to-r from-[#1f3b73] to-[#2a4d8a] bg-cover bg-center relative"
          style={{ backgroundImage: `url(${supplier.coverImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#1f3b73]/80 to-[#2a4d8a]/80"></div>
          <div className="absolute top-6 right-6 flex gap-3">
            <button
              onClick={() => setIsLiked(!isLiked)}
              className={`p-3 rounded-full backdrop-blur-sm transition-all duration-300 ${
                isLiked
                  ? "bg-red-500 text-white"
                  : "bg-white/20 text-white hover:bg-red-500"
              }`}
            >
              <Heart size={20} fill={isLiked ? "currentColor" : "none"} />
            </button>
            <button className="p-3 bg-white/20 backdrop-blur-sm text-white rounded-full hover:bg-white/30 transition-all duration-300">
              <Share2 size={20} />
            </button>
          </div>
        </div>

        {/* Supplier Info Card */}
        <div className="container mx-auto px-4 -mt-32 relative z-10">
          <div className="bg-white rounded-3xl shadow-2xl border border-[#1f3b73]/10 p-8">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Left Column */}
              <div className="lg:w-1/3">
                <div className="text-center lg:text-left">
                  <div className="relative inline-block mb-6">
                    <img
                      src={supplier.logo}
                      alt={supplier.name}
                      className="w-28 h-28 rounded-2xl object-contain border-2 border-[#e1a95f]/30 bg-[#f4f2ed] shadow-lg"
                    />
                    {supplier.verified && (
                      <div className="absolute -bottom-2 -right-2 bg-green-500 text-white rounded-full p-2 shadow-lg">
                        <CheckCircle size={16} />
                      </div>
                    )}
                  </div>
                  
                  <h1 className="text-3xl font-bold text-[#1f3b73] mb-3">{supplier.name}</h1>
                  
                  <div className="flex items-center justify-center lg:justify-start gap-2 mb-4">
                    <div className="flex items-center gap-1 text-[#e1a95f]">
                      <Star size={20} fill="currentColor" />
                      <span className="font-bold text-lg">{supplier.rating}</span>
                    </div>
                    <span className="text-[#1f3b73]/60">({supplier.reviews} reviews)</span>
                    {supplier.verified && (
                      <div className="flex items-center gap-1 text-green-600 ml-2">
                        <Shield size={16} />
                        <span className="text-sm font-medium">Verified</span>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2 justify-center lg:justify-start mb-6">
                    {supplier.categories.map((cat) => (
                      <span
                        key={cat}
                        className="bg-gradient-to-r from-[#e1a95f]/20 to-[#e1a95f]/10 text-[#e1a95f] px-4 py-2 rounded-full text-sm font-medium border border-[#e1a95f]/20"
                      >
                        {cat}
                      </span>
                    ))}
                    {supplier.featured && (
                      <span className="bg-gradient-to-r from-[#e1a95f] to-[#d89a4b] text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                        ⭐ Featured
                      </span>
                    )}
                  </div>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-[#f4f2ed] rounded-xl p-4 text-center">
                      <div className="text-2xl font-bold text-[#1f3b73]">{supplier.products.length}</div>
                      <div className="text-sm text-[#1f3b73]/70">Products</div>
                    </div>
                    <div className="bg-[#f4f2ed] rounded-xl p-4 text-center">
                      <div className="text-2xl font-bold text-[#e1a95f]">{supplier.established}</div>
                      <div className="text-sm text-[#1f3b73]/70">Established</div>
                    </div>
                  </div>

                  {/* Contact Buttons */}
                  <div className="space-y-3">
                    <button className="w-full bg-gradient-to-r from-[#e1a95f] to-[#d89a4b] text-white font-bold px-6 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2">
                      <MessageCircle size={20} />
                      Contact Supplier
                    </button>
                    <div className="grid grid-cols-2 gap-3">
                      <button className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-3 rounded-xl transition-colors flex items-center justify-center gap-2">
                        <Phone size={16} />
                        Call
                      </button>
                      <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-3 rounded-xl transition-colors flex items-center justify-center gap-2">
                        <Mail size={16} />
                        Email
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="lg:w-2/3">
                {/* Tab Navigation */}
                <div className="flex flex-wrap gap-2 mb-8 bg-[#f4f2ed] p-2 rounded-2xl">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                          activeTab === tab.id
                            ? "bg-white text-[#e1a95f] shadow-lg"
                            : "text-[#1f3b73] hover:bg-white/50"
                        }`}
                      >
                        <Icon size={18} />
                        {tab.label}
                      </button>
                    );
                  })}
                </div>

                {/* Tab Content */}
                <div className="min-h-[400px]">
                  {activeTab === "overview" && (
                    <div className="space-y-8">
                      {/* About Section */}
                      <div>
                        <h3 className="text-2xl font-bold text-[#1f3b73] mb-4">About</h3>
                        <p className="text-[#1f3b73]/80 leading-relaxed mb-6">{supplier.description}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {/* Contact Information */}
                          <div className="bg-[#f4f2ed] rounded-2xl p-6">
                            <h4 className="font-bold text-[#1f3b73] mb-4 flex items-center gap-2">
                              <Phone className="text-[#e1a95f]" size={20} />
                              Contact Information
                            </h4>
                            <div className="space-y-3 text-sm">
                              <div className="flex items-center gap-3">
                                <MapPin size={16} className="text-[#e1a95f]" />
                                <span className="text-[#1f3b73]">{supplier.address}</span>
                              </div>
                              <div className="flex items-center gap-3">
                                <Phone size={16} className="text-[#e1a95f]" />
                                <span className="text-[#1f3b73]">{supplier.phone}</span>
                              </div>
                              <div className="flex items-center gap-3">
                                <Mail size={16} className="text-[#e1a95f]" />
                                <span className="text-[#1f3b73]">{supplier.email}</span>
                              </div>
                              <div className="flex items-center gap-3">
                                <Globe size={16} className="text-[#e1a95f]" />
                                <span className="text-[#1f3b73]">{supplier.website}</span>
                              </div>
                            </div>
                          </div>

                          {/* Business Information */}
                          <div className="bg-[#f4f2ed] rounded-2xl p-6">
                            <h4 className="font-bold text-[#1f3b73] mb-4 flex items-center gap-2">
                              <Users className="text-[#e1a95f]" size={20} />
                              Business Information
                            </h4>
                            <div className="space-y-3 text-sm">
                              <div className="flex justify-between">
                                <span className="text-[#1f3b73]/70">Established:</span>
                                <span className="text-[#1f3b73] font-medium">{supplier.established}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-[#1f3b73]/70">Employees:</span>
                                <span className="text-[#1f3b73] font-medium">{supplier.employees}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-[#1f3b73]/70">Response Time:</span>
                                <span className="text-green-600 font-medium">{supplier.responseTime}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-[#1f3b73]/70">Delivery:</span>
                                <span className="text-[#1f3b73] font-medium">{supplier.deliveryTime}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Specialties */}
                      <div>
                        <h4 className="text-xl font-bold text-[#1f3b73] mb-4">Our Specialties</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {supplier.specialties.map((specialty, index) => (
                            <div key={index} className="flex items-center gap-3 bg-white rounded-xl p-4 shadow-sm border border-[#1f3b73]/5">
                              <CheckCircle className="text-green-500" size={18} />
                              <span className="text-[#1f3b73]">{specialty}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Certifications */}
                      {supplier.certifications.length > 0 && (
                        <div>
                          <h4 className="text-xl font-bold text-[#1f3b73] mb-4">Certifications</h4>
                          <div className="flex flex-wrap gap-3">
                            {supplier.certifications.map((cert, index) => (
                              <div key={index} className="flex items-center gap-2 bg-gradient-to-r from-[#e1a95f]/10 to-[#e1a95f]/5 text-[#e1a95f] px-4 py-2 rounded-full border border-[#e1a95f]/20">
                                <Award size={16} />
                                <span className="font-medium">{cert}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {activeTab === "products" && (
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-2xl font-bold text-[#1f3b73]">Our Products</h3>
                        <span className="text-[#1f3b73]/60">{supplier.products.length} products available</span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {supplier.products.map((product) => (
                          <div
                            key={product.id}
                            className="group bg-white rounded-2xl shadow-lg border border-[#1f3b73]/10 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                          >
                            <div className="relative mb-4">
                              <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-32 object-cover rounded-xl bg-[#f4f2ed]"
                              />
                              <div className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-bold ${
                                product.inStock
                                  ? "bg-green-500 text-white"
                                  : "bg-red-500 text-white"
                              }`}>
                                {product.inStock ? "In Stock" : "Out of Stock"}
                              </div>
                            </div>
                            <h4 className="font-bold text-[#1f3b73] mb-2 group-hover:text-[#e1a95f] transition-colors">
                              {product.name}
                            </h4>
                            <p className="text-sm text-[#1f3b73]/70 mb-3">{product.description}</p>
                            <div className="flex items-center gap-2 mb-3">
                              <div className="flex items-center gap-1 text-[#e1a95f]">
                                <Star size={14} fill="currentColor" />
                                <span className="text-sm font-semibold">{product.rating}</span>
                              </div>
                              <span className="text-xs text-[#1f3b73]/50">•</span>
                              <span className="text-xs text-[#1f3b73]/70">{product.category}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="text-xl font-bold text-[#e1a95f]">{product.price}</div>
                              <button className="bg-[#e1a95f] hover:bg-[#d89a4b] text-white px-4 py-2 rounded-xl text-sm font-semibold transition-colors flex items-center gap-2">
                                View Details
                                <ChevronRight size={14} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === "gallery" && (
                    <div>
                      <h3 className="text-2xl font-bold text-[#1f3b73] mb-6">Gallery</h3>
                      {supplier.gallery.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {supplier.gallery.map((image, index) => (
                            <div
                              key={index}
                              className="relative group cursor-pointer rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                              onClick={() => setSelectedImage(index)}
                            >
                              <img
                                src={image}
                                alt={`Gallery ${index + 1}`}
                                className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                              />
                              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                                <Eye className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" size={24} />
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-12">
                          <Camera className="text-[#e1a95f] mx-auto mb-4" size={48} />
                          <p className="text-[#1f3b73]/70">No gallery images available</p>
                        </div>
                      )}
                    </div>
                  )}

                  {activeTab === "reviews" && (
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-2xl font-bold text-[#1f3b73]">Customer Reviews</h3>
                        <div className="text-right">
                          <div className="text-3xl font-bold text-[#e1a95f]">{supplier.rating}</div>
                          <div className="text-sm text-[#1f3b73]/70">{supplier.reviews} reviews</div>
                        </div>
                      </div>
                      
                      <div className="space-y-6">
                        {supplier.testimonials.map((testimonial) => (
                          <div key={testimonial.id} className="bg-white rounded-2xl p-6 shadow-lg border border-[#1f3b73]/10">
                            <div className="flex items-start justify-between mb-4">
                              <div>
                                <h4 className="font-bold text-[#1f3b73]">{testimonial.name}</h4>
                                <p className="text-sm text-[#1f3b73]/70">{testimonial.project}</p>
                              </div>
                              <div className="flex items-center gap-1">
                                {Array.from({ length: 5 }, (_, i) => (
                                  <Star
                                    key={i}
                                    size={16}
                                    className={i < testimonial.rating ? "text-[#e1a95f] fill-current" : "text-gray-300"}
                                  />
                                ))}
                              </div>
                            </div>
                            <p className="text-[#1f3b73]/80 mb-3">{testimonial.comment}</p>
                            <div className="flex items-center gap-2 text-sm text-[#1f3b73]/60">
                              <Calendar size={14} />
                              <span>{new Date(testimonial.date).toLocaleDateString()}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Social Media & Contact Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="bg-gradient-to-r from-[#1f3b73] to-[#2a4d8a] rounded-3xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Connect with {supplier.name}</h3>
          <p className="text-blue-100 mb-6">Follow us on social media for updates and latest products</p>
          <div className="flex justify-center gap-4 mb-6">
            {supplier.socialMedia.facebook && (
              <button className="bg-blue-600 hover:bg-blue-700 p-3 rounded-full transition-colors">
                <Facebook size={20} />
              </button>
            )}
            {supplier.socialMedia.instagram && (
              <button className="bg-pink-600 hover:bg-pink-700 p-3 rounded-full transition-colors">
                <Instagram size={20} />
              </button>
            )}
            {supplier.socialMedia.linkedin && (
              <button className="bg-blue-800 hover:bg-blue-900 p-3 rounded-full transition-colors">
                <Linkedin size={20} />
              </button>
            )}
          </div>
          <Link
            to="/suppliers"
            className="inline-flex items-center gap-2 bg-[#e1a95f] hover:bg-[#d89a4b] text-white px-8 py-4 rounded-2xl font-bold transition-colors"
          >
            <ArrowLeft size={20} />
            Back to All Suppliers
          </Link>
        </div>
      </div>
    </div>
  );
}