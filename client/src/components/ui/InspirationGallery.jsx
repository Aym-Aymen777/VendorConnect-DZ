import React, { useState } from 'react';
import { Heart, ShoppingBag, Eye, Star, X, Instagram, Play, ExternalLink, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const AtHomeGallery = () => {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [likedRooms, setLikedRooms] = useState(new Set());

  const rooms = [
    {
      id: 1,
      title: "Modern Living Room",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop",
      desc: "A cozy, modern living room with neutral tones and natural light. Perfect for relaxing evenings and entertaining guests.",
      price: "From $1,299",
      rating: 4.8,
      tags: ["Modern", "Neutral", "Cozy"],
      user: "@sarah_home_style",
      likes: 1247,
      isVideo: false,
      products: [
        { name: "Modern Sectional Sofa", price: "$899", link: "#" },
        { name: "Round Coffee Table", price: "$299", link: "#" },
        { name: "Floor Lamp", price: "$179", link: "#" },
        { name: "Wall Art Set", price: "$129", link: "#" }
      ]
    },
    {
      id: 2,
      title: "Luxury Bathroom",
      image: "https://images.unsplash.com/photo-1620626011761-996317b8d101?w=600&h=700&fit=crop",
      desc: "Elegant bathroom with marble finishes and gold fixtures. A spa-like retreat in your own home.",
      price: "From $2,499",
      rating: 4.9,
      tags: ["Luxury", "Marble", "Gold"],
      user: "@luxe_interiors",
      likes: 892,
      isVideo: true,
      products: [
        { name: "Marble Vanity", price: "$1,299", link: "#" },
        { name: "Gold Faucet Set", price: "$399", link: "#" },
        { name: "Mirror with LED", price: "$249", link: "#" },
        { name: "Towel Warmer", price: "$299", link: "#" }
      ]
    },
    {
      id: 3,
      title: "Urban Garden",
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=500&fit=crop",
      desc: "A lush garden retreat with outdoor seating and vibrant plants. Create your own urban oasis.",
      price: "From $899",
      rating: 4.7,
      tags: ["Garden", "Outdoor", "Plants"],
      user: "@green_thumb_home",
      likes: 1156,
      isVideo: false,
      products: [
        { name: "Outdoor Dining Set", price: "$599", link: "#" },
        { name: "Planters Set", price: "$199", link: "#" },
        { name: "String Lights", price: "$49", link: "#" },
        { name: "Outdoor Cushions", price: "$89", link: "#" }
      ]
    },
    {
      id: 4,
      title: "Minimalist Kitchen",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=600&fit=crop",
      desc: "Sleek kitchen design with built-in appliances and clean lines. Functionality meets style.",
      price: "From $3,199",
      rating: 4.8,
      tags: ["Minimalist", "Modern", "Sleek"],
      user: "@minimal_kitchen",
      likes: 2034,
      isVideo: true,
      products: [
        { name: "Kitchen Island", price: "$1,499", link: "#" },
        { name: "Bar Stools Set", price: "$399", link: "#" },
        { name: "Pendant Lights", price: "$199", link: "#" },
        { name: "Cabinet Hardware", price: "$129", link: "#" }
      ]
    },
    {
      id: 5,
      title: "Cozy Bedroom",
      image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&h=500&fit=crop",
      desc: "Warm bedroom with layered textiles and soft lighting. Your personal sanctuary for rest.",
      price: "From $1,799",
      rating: 4.9,
      tags: ["Cozy", "Warm", "Textiles"],
      user: "@cozy_bedroom_vibes",
      likes: 1678,
      isVideo: false,
      products: [
        { name: "Platform Bed", price: "$799", link: "#" },
        { name: "Bedding Set", price: "$199", link: "#" },
        { name: "Table Lamps", price: "$149", link: "#" },
        { name: "Area Rug", price: "$299", link: "#" }
      ]
    },
    {
      id: 6,
      title: "Outdoor Patio",
      image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&h=500&fit=crop",
      desc: "Stylish patio perfect for gatherings and relaxation. Extend your living space outdoors.",
      price: "From $1,599",
      rating: 4.6,
      tags: ["Patio", "Outdoor", "Entertaining"],
      user: "@outdoor_living_co",
      likes: 934,
      isVideo: true,
      products: [
        { name: "Patio Sofa Set", price: "$899", link: "#" },
        { name: "Fire Pit Table", price: "$499", link: "#" },
        { name: "Outdoor Umbrella", price: "$199", link: "#" },
        { name: "Side Tables", price: "$149", link: "#" }
      ]
    },
    {
      id: 7,
      title: "Kids Playroom",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=500&fit=crop",
      desc: "Colorful and organized playroom that sparks creativity. Fun meets functionality for little ones.",
      price: "From $699",
      rating: 4.7,
      tags: ["Kids", "Colorful", "Storage"],
      user: "@kids_room_inspo",
      likes: 1423,
      isVideo: false,
      products: [
        { name: "Storage Shelving", price: "$299", link: "#" },
        { name: "Play Table", price: "$199", link: "#" },
        { name: "Toy Bins", price: "$89", link: "#" },
        { name: "Kids Seating", price: "$149", link: "#" }
      ]
    },
    {
      id: 8,
      title: "Home Office",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop",
      desc: "Productive workspace with natural light and modern furnishings. Work from home in style.",
      price: "From $999",
      rating: 4.8,
      tags: ["Office", "Modern", "Productive"],
      user: "@home_office_goals",
      likes: 1567,
      isVideo: true,
      products: [
        { name: "Standing Desk", price: "$499", link: "#" },
        { name: "Ergonomic Chair", price: "$399", link: "#" },
        { name: "Desk Organizer", price: "$79", link: "#" },
        { name: "Bookshelf", price: "$199", link: "#" }
      ]
    }
  ];

  const toggleLike = (roomId) => {
    setLikedRooms(prev => {
      const newSet = new Set(prev);
      if (newSet.has(roomId)) {
        newSet.delete(roomId);
      } else {
        newSet.add(roomId);
      }
      return newSet;
    });
  };

  const openModal = (room) => {
    setSelectedRoom(room);
  };

  const closeModal = () => {
    setSelectedRoom(null);
  };

  return (
    <section className="py-16 bg-[#f4f2ed] relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-[#1f3b73] mb-2">
              Inspiration Gallery
            </h2>
            <p className="text-[#1f3b73c7] max-w-2xl">
              Discover beautiful spaces and get inspired for your next project. Shop the look for your favorite rooms and bring your vision to life!
            </p>
          </div>
          <Link 
            href="#" 
            className="text-[#1f3b73] hover:text-[#e1a95f] font-semibold transition-colors duration-200 flex items-center gap-2"
          >
            See More
            <ExternalLink size={16} />
          </Link>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {rooms.map((room, index) => (
            <div
              key={room.id}
              className={`relative group cursor-pointer overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${
                index === 0 ? 'col-span-2 row-span-2' : ''
              }`}
              onClick={() => openModal(room)}
            >
              <div className="relative overflow-hidden">
                <img
                  src={room.image}
                  alt={room.title}
                  className={`w-full object-cover group-hover:scale-105 transition-transform duration-500 ${
                    index === 0 ? 'h-80' : 'h-48'
                  }`}
                />
                
                {/* Video indicator */}
                {room.isVideo && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white bg-opacity-90 rounded-full p-3 group-hover:scale-110 transition-transform duration-200">
                      <Play size={24} className="text-[#1f3b73] ml-1" fill="currentColor" />
                    </div>
                  </div>
                )}

                {/* Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>

                {/* Heart icon */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleLike(room.id);
                  }}
                  className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-200 ${
                    likedRooms.has(room.id) 
                      ? 'bg-red-500 text-white' 
                      : 'bg-white bg-opacity-80 text-gray-700 hover:bg-opacity-100'
                  }`}
                >
                  <Heart size={16} fill={likedRooms.has(room.id) ? 'currentColor' : 'none'} />
                </button>

                {/* User info */}
                <div className="absolute bottom-3 left-3 flex items-center gap-2 bg-white bg-opacity-90 rounded-full px-3 py-1">
                  <User size={14} className="text-[#1f3b73]" />
                  <span className="text-sm font-medium text-[#1f3b73]">{room.user}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedRoom && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              {/* Close button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 z-10 bg-white bg-opacity-90 rounded-full p-2 hover:bg-opacity-100 transition-all duration-200"
              >
                <X size={20} className="text-gray-700" />
              </button>

              {/* Image */}
              <div className="relative">
                <img
                  src={selectedRoom.image}
                  alt={selectedRoom.title}
                  className="w-full h-80 object-cover rounded-t-2xl"
                />
                {selectedRoom.isVideo && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white bg-opacity-90 rounded-full p-4">
                      <Play size={32} className="text-[#1f3b73] ml-1" fill="currentColor" />
                    </div>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-[#1f3b73] mb-2">{selectedRoom.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <User size={16} />
                        {selectedRoom.user}
                      </div>
                      <div className="flex items-center gap-1">
                        <Heart size={16} />
                        {selectedRoom.likes} likes
                      </div>
                      <div className="flex items-center gap-1">
                        <Star size={16} fill="#e1a95f" className="text-[#e1a95f]" />
                        {selectedRoom.rating}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-[#e1a95f]">{selectedRoom.price}</div>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedRoom.tags.map((tag) => (
                    <span 
                      key={tag}
                      className="px-3 py-1 bg-[#f4f2ed] text-[#1f3b73] text-sm rounded-full border border-[#1f3b73] border-opacity-20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <p className="text-gray-700 mb-6 leading-relaxed">{selectedRoom.desc}</p>

                {/* Products */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-[#1f3b73] mb-4">Shop This Look</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedRoom.products.map((product, idx) => (
                      <div key={idx} className="flex justify-between items-center p-3 bg-[#f4f2ed] rounded-lg">
                        <span className="font-medium text-[#1f3b73]">{product.name}</span>
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-[#e1a95f]">{product.price}</span>
                          <a 
                            href={product.link}
                            className="bg-[#e1a95f] text-white px-3 py-1 rounded-lg text-sm hover:bg-[#d89a4b] transition-colors duration-200"
                          >
                            Add
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-4">
                  <button className="flex-1 bg-gradient-to-r from-[#e1a95f] to-[#d89a4b] text-white font-semibold px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2">
                    <ShoppingBag size={18} />
                    Shop Complete Look
                  </button>
                  <button className="bg-[#1f3b73] text-white px-6 py-3 rounded-xl hover:bg-opacity-90 transition-all duration-200 flex items-center gap-2">
                    <Instagram size={18} />
                    Follow
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default AtHomeGallery;