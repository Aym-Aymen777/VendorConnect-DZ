import { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { 
  Sparkles, 
  Grid, 
  Layers, 
  Zap, 
  Menu, 
  X, 
  Search, 
  Filter, 
  Heart,
  ShoppingCart,
  Star,
  TrendingUp,
  Clock,
  Eye,
  ArrowRight,
  Percent,
  ChevronDown,
  ChevronRight
} from "lucide-react";
import Header from "../components/common/Header";
import useSearchStore from "../store/SearchStore";

// Enhanced categories with icons
const categories = [
  {
    category: "Building Materials",
    icon: <Layers size={18} />,
    subcategories: [
      "Cement", "Bricks & Blocks", "Sand & Gravel", "Iron & Steel", 
      "Insulation Materials", "Adhesives & Sealants", "Gypsum Products"
    ],
  },
  {
    category: "Flooring & Wall Coverings",
    icon: <Grid size={18} />,
    subcategories: [
      "Ceramic Tiles", "Marble & Granite", "Porcelain", "Parquet", 
      "Wallpaper", "Paints & Coatings"
    ],
  },
  {
    category: "Electrical & Lighting",
    icon: <Zap size={18} />,
    subcategories: [
      "Wires & Cables", "Circuit Breakers", "Lighting Fixtures (LED, Ceiling, Wall)", 
      "Chandeliers", "Switches & Sockets", "Solar Energy Systems"
    ],
  },
  {
    category: "Plumbing & Bathrooms",
    icon: <Layers size={18} />,
    subcategories: [
      "Faucets", "Sinks & Washbasins", "Toilets", "Showers & Accessories", 
      "Water Mixers", "Pipes & Fittings"
    ],
  },
  {
    category: "Doors & Windows",
    icon: <Grid size={18} />,
    subcategories: [
      "Wooden Doors", "Metal Doors", "Aluminum Windows", "PVC Windows", 
      "Security Systems", "Interior & Exterior Doors"
    ],
  },
  {
    category: "Kitchen & Fixtures",
    icon: <Layers size={18} />,
    subcategories: [
      "Kitchen Cabinets", "Countertops (Marble, Corian)", "Kitchen Sinks", 
      "Built-in Appliances", "Hoods & Ventilation", "Kitchen Accessories"
    ],
  },
  {
    category: "Furniture",
    icon: <Grid size={18} />,
    subcategories: [
      "Living Room Sets", "Beds & Bedrooms", "Dining Tables", "Chairs & Seating", 
      "Wardrobes", "Office Desks"
    ],
  },
  {
    category: "Home Appliances",
    icon: <Zap size={18} />,
    subcategories: [
      "Refrigerators", "Washing Machines", "Air Conditioners", "Electric Ovens", 
      "Water Heaters", "Small Appliances (Microwave, Kettle, etc.)"
    ],
  },
];

// Enhanced products with more realistic data
const products = [
  {
    id: 1,
    title: "Premium Leather Armchair",
    image: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=400&h=300&fit=crop",
    price: "$899",
    originalPrice: "$1,299",
    discount: 31,
    rating: 4.8,
    reviews: 124,
    category: "Furniture",
    subcategory: "Chairs & Seating",
    isNew: false,
    isFeatured: true,
    isFlashDeal: false,
    description: "Handcrafted premium leather armchair with solid wood frame"
  },
  {
    id: 2,
    title: "Modern LED Ceiling Light",
    image: "https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=400&h=300&fit=crop",
    price: "$159",
    originalPrice: "$199",
    discount: 20,
    rating: 4.6,
    reviews: 89,
    category: "Electrical & Lighting",
    subcategory: "Lighting Fixtures (LED, Ceiling, Wall)",
    isNew: true,
    isFeatured: false,
    isFlashDeal: true,
    description: "Energy-efficient LED ceiling light with dimmer control"
  },
  {
    id: 3,
    title: "Marble Kitchen Countertop",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop",
    price: "$2,499",
    originalPrice: "$2,999",
    discount: 17,
    rating: 4.9,
    reviews: 67,
    category: "Kitchen & Fixtures",
    subcategory: "Countertops (Marble, Corian)",
    isNew: false,
    isFeatured: true,
    isFlashDeal: false,
    description: "Premium Carrara marble countertop with professional installation"
  },
  {
    id: 4,
    title: "Ceramic Floor Tiles",
    image: "https://images.unsplash.com/photo-1615971677499-5467cbab01c0?w=400&h=300&fit=crop",
    price: "$89",
    originalPrice: "$119",
    discount: 25,
    rating: 4.5,
    reviews: 203,
    category: "Flooring & Wall Coverings",
    subcategory: "Ceramic Tiles",
    isNew: false,
    isFeatured: false,
    isFlashDeal: true,
    description: "High-quality ceramic tiles perfect for modern interiors"
  },
  {
    id: 5,
    title: "Smart Security Camera",
    image: "https://images.unsplash.com/photo-1558618644-fbd7c7a8634a?w=400&h=300&fit=crop",
    price: "$299",
    originalPrice: "$399",
    discount: 25,
    rating: 4.7,
    reviews: 156,
    category: "Security & Surveillance",
    subcategory: "Security Cameras",
    isNew: true,
    isFeatured: true,
    isFlashDeal: false,
    description: "4K smart security camera with night vision and mobile app"
  },
  {
    id: 6,
    title: "Wooden Entry Door",
    image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop",
    price: "$1,299",
    originalPrice: "$1,599",
    discount: 19,
    rating: 4.6,
    reviews: 78,
    category: "Doors & Windows",
    subcategory: "Wooden Doors",
    isNew: false,
    isFeatured: false,
    isFlashDeal: true,
    description: "Solid oak entry door with decorative glass panel"
  },
  {
    id: 7,
    title: "Stainless Steel Kitchen Sink",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&h=300&fit=crop",
    price: "$299",
    originalPrice: "$399",
    discount: 25,
    rating: 4.4,
    reviews: 92,
    category: "Kitchen & Fixtures",
    subcategory: "Kitchen Sinks",
    isNew: false,
    isFeatured: true,
    isFlashDeal: false,
    description: "Double bowl stainless steel kitchen sink with accessories"
  },
  {
    id: 8,
    title: "Modern Dining Table",
    image: "https://images.unsplash.com/photo-1549497538-303791108f95?w=400&h=300&fit=crop",
    price: "$799",
    originalPrice: "$999",
    discount: 20,
    rating: 4.7,
    reviews: 134,
    category: "Furniture",
    subcategory: "Dining Tables",
    isNew: true,
    isFeatured: false,
    isFlashDeal: true,
    description: "Solid wood dining table with contemporary design"
  }
];

function CategoryMenu({ categories, tab, setTab, expandedCategories, toggleCategory, onItemClick }) {
  return (
    <div className="space-y-2">
      {categories.map((category) => (
        <div key={category.category}>
          <div className="flex items-center">
            <TabsTrigger
              value={category.category}
              className="flex-1 justify-start gap-3 px-4 py-3 text-left bg-white hover:bg-[#e1a95f]/10 data-[state=active]:bg-[#1f3b73] data-[state=active]:text-white transition-all duration-200 rounded-xl border-0"
              onClick={onItemClick}
            >
              {category.icon}
              <span className="font-medium">{category.category}</span>
            </TabsTrigger>
            <button
              onClick={() => toggleCategory(category.category)}
              className="p-2 hover:bg-[#e1a95f]/10 rounded-lg transition-colors ml-2"
            >
              {expandedCategories.includes(category.category) ? (
                <ChevronDown size={16} className="text-[#1f3b73]" />
              ) : (
                <ChevronRight size={16} className="text-[#1f3b73]" />
              )}
            </button>
          </div>
          
          {/* Subcategories with scrollable container */}
          {expandedCategories.includes(category.category) && (
            <div className="ml-4 mt-2 max-h-48 overflow-y-auto border-l-2 border-[#e1a95f]/30 pl-4">
              <div className="space-y-1">
                {category.subcategories.map((subcategory) => (
                  <button
                    key={subcategory}
                    onClick={onItemClick}
                    className="block w-full text-left px-3 py-2 text-sm text-[#1f3b73] hover:bg-[#e1a95f]/10 rounded-lg transition-colors"
                  >
                    {subcategory}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function ProductCard({ item, onAddToCart, onToggleFavorite, isFavorite }) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div
      className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1 w-80 flex-shrink-0"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden h-64">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          loading="lazy"
        />
        
        {/* Overlay with quick actions */}
        <div className={`absolute inset-0 bg-[#1f3b73]/40 flex items-center justify-center gap-3 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <button className="bg-white p-3 rounded-full hover:bg-[#f4f2ed] transition-colors">
            <Eye size={20} className="text-[#1f3b73]" />
          </button>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(item.id);
            }}
            className="bg-white p-3 rounded-full hover:bg-[#f4f2ed] transition-colors">
            <Heart size={20} className={isFavorite ? "text-red-500 fill-red-500" : "text-[#1f3b73]"} />
          </button>
        </div>
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {item.isNew && (
            <span className="bg-[#e1a95f] text-white px-3 py-1 rounded-full text-xs font-semibold">
              NEW
            </span>
          )}
          {item.isFlashDeal && (
            <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold animate-pulse">
              <Zap size={12} className="inline mr-1" />
              FLASH
            </span>
          )}
          {item.discount > 0 && (
            <span className="bg-[#1f3b73] text-white px-3 py-1 rounded-full text-xs font-semibold">
              -{item.discount}%
            </span>
          )}
        </div>
        
        {/* Favorite button */}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(item.id);
          }}
          className="absolute top-3 right-3 bg-white/90 p-2 rounded-full hover:bg-white transition-colors">
          <Heart size={16} className={isFavorite ? "text-red-500 fill-red-500" : "text-[#1f3b73]"} />
        </button>
      </div>
      
      {/* Content */}
      <div className="p-6">
        <div className="flex items-center gap-2 mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                className={`${
                  i < Math.floor(item.rating)
                    ? "text-[#e1a95f] fill-[#e1a95f]"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600">
            {item.rating} ({item.reviews})
          </span>
        </div>
        
        <h3 className="font-bold text-lg text-[#1f3b73] mb-2 line-clamp-2">
          {item.title}
        </h3>
        
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {item.description}
        </p>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-[#1f3b73]">{item.price}</span>
            {item.originalPrice && (
              <span className="text-sm text-gray-500 line-through">{item.originalPrice}</span>
            )}
          </div>
        </div>
        
        <button
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart(item);
          }}
          className="w-full bg-[#e1a95f] text-white font-semibold py-3 px-6 rounded-xl hover:bg-[#d19a54] transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
        >
          <ShoppingCart size={18} />
          Add to Cart
        </button>
      </div>
    </div>
  );
}

function ProductsFlexContainer({ items, onAddToCart, onToggleFavorite, favorites }) {
  return (
    <div className="flex gap-6 overflow-x-auto pb-4">
      {items.map((item) => (
        <ProductCard
          key={item.id}
          item={item}
          onAddToCart={onAddToCart}
          onToggleFavorite={onToggleFavorite}
          isFavorite={favorites.includes(item.id)}
        />
      ))}
    </div>
  );
}


export default function Marketplace() {
  const [tab, setTab] = useState("featured");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {searchTerm} = useSearchStore();
  const [favorites, setFavorites] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [expandedCategories, setExpandedCategories] = useState([]);

  // Filter products based on current tab
  useEffect(() => {
    let filtered = [...products];
    
    switch (tab) {
      case "featured":
        filtered = products.filter(p => p.isFeatured);
        break;
      case "flash":
        filtered = products.filter(p => p.isFlashDeal);
        break;
      case "new":
        filtered = products.filter(p => p.isNew);
        break;
      default:
        if (categories.find(c => c.category === tab)) {
          filtered = products.filter(p => p.category === tab);
        }
    }
    
    if (searchTerm) {
      filtered = filtered.filter(p => 
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase())||
        p.subcategory.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredProducts(filtered);
  }, [tab, searchTerm]);

  const handleAddToCart = (product) => {
    setCartItems(prev => [...prev, product]);
  };

  const handleToggleFavorite = (productId) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleSearch = () => {
    // Search functionality is already handled by useEffect
  };

  const toggleCategory = (categoryName) => {
    setExpandedCategories(prev => 
      prev.includes(categoryName) 
        ? prev.filter(name => name !== categoryName)
        : [...prev, categoryName]
    );
  };

  const handleMenuItemClick = () => {
    if (window.innerWidth < 1024) {
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f2ed]">
      {/* Header */}
      <Header />
      <div className="container mx-auto px-4 py-8">
        <Tabs value={tab} onValueChange={setTab} className="flex flex-col lg:flex-row gap-8">
          {/* Enhanced Responsive Sidebar */}
          <div className="lg:w-80">
            <button
              className="lg:hidden mb-4 bg-white p-3 rounded-xl shadow border border-[#1f3b73]/10 flex items-center gap-2"
              onClick={() => setIsMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={22} className="text-[#1f3b73]" />
              <span className="font-semibold text-[#1f3b73]">Menu</span>
            </button>
            <div className={`bg-white rounded-2xl shadow-lg border border-[#1f3b73]/10 transition-all duration-300 ${
              isMenuOpen ? 'block' : 'hidden lg:block'
            } ${isMenuOpen ? 'fixed inset-4 z-50 lg:relative lg:inset-auto overflow-y-auto' : ''}`}>
              
              {/* Mobile close button */}
              {isMenuOpen && (
                <div className="lg:hidden flex justify-between items-center p-4 border-b border-[#1f3b73]/10">
                  <h2 className="text-xl font-bold text-[#1f3b73]">Categories</h2>
                  <button 
                    onClick={() => setIsMenuOpen(false)}
                    className="p-2 hover:bg-[#f4f2ed] rounded-lg"
                  >
                    <X size={20} className="text-[#1f3b73]" />
                  </button>
                </div>
              )}
              
              <div className="p-6 h-[80vh]">
                <h2 className="text-xl font-bold text-[#1f3b73] mb-6 hidden lg:block">Categories</h2>
                
                <TabsList className="flex flex-col gap-3 bg-transparent p-0">
                  {/* Special tabs */}
                  <TabsTrigger
                    value="featured"
                    className="w-full justify-start gap-3 px-4 py-4 bg-white hover:bg-[#e1a95f]/10 data-[state=active]:bg-[#1f3b73] data-[state=active]:text-white rounded-xl transition-all duration-200 border-0"
                    onClick={handleMenuItemClick}
                  >
                    <Sparkles size={18} />
                    <div className="text-left">
                      <div className="font-semibold">Featured Products</div>
                      <div className="text-xs opacity-80">Handpicked for you</div>
                    </div>
                  </TabsTrigger>

                  <TabsTrigger
                    value="flash"
                    className="w-full justify-start gap-3 px-4 py-4 bg-white hover:bg-[#e1a95f]/10 data-[state=active]:bg-[#1f3b73] data-[state=active]:text-white rounded-xl transition-all duration-200 border-0"
                    onClick={handleMenuItemClick}
                  >
                    <Zap size={18} />
                    <div className="text-left">
                      <div className="font-semibold">Flash Deals</div>
                      <div className="text-xs opacity-80">Limited time offers</div>
                    </div>
                  </TabsTrigger>

                  <TabsTrigger
                    value="new"
                    className="w-full justify-start gap-3 px-4 py-4 bg-white hover:bg-[#e1a95f]/10 data-[state=active]:bg-[#1f3b73] data-[state=active]:text-white rounded-xl transition-all duration-200 border-0"
                    onClick={handleMenuItemClick}
                  >
                    <TrendingUp size={18} />
                    <div className="text-left">
                      <div className="font-semibold">New Arrivals</div>
                      <div className="text-xs opacity-80">Latest products</div>
                    </div>
                  </TabsTrigger>

                  {/* Categories with expandable subcategories */}
                  <div className="space-y-2">
                    <CategoryMenu 
                      categories={categories}
                      tab={tab}
                      setTab={setTab}
                      expandedCategories={expandedCategories}
                      toggleCategory={toggleCategory}
                      onItemClick={handleMenuItemClick}
                    />
                  </div>
                </TabsList>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Results header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-[#1f3b73]">
                  {tab === "featured" && "Featured Products"}
                  {tab === "flash" && "Flash Deals"}
                  {tab === "new" && "New Arrivals"}
                  {categories.find(c => c.category === tab)?.category}
                </h2>
                <p className="text-gray-600">{filteredProducts.length} products found</p>
              </div>
              
              <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-md hover:shadow-lg transition-all border border-[#1f3b73]/10">
                <Filter size={16} className="text-[#1f3b73]" />
                <span className="text-[#1f3b73]">Filters</span>
              </button>
            </div>

            {/* Products Flex Container */}
            <TabsContent value={tab} className="mt-0">
              {filteredProducts.length > 0 ? (
                <ProductsFlexContainer 
                  items={filteredProducts}
                  onAddToCart={handleAddToCart}
                  onToggleFavorite={handleToggleFavorite}
                  favorites={favorites}
                />
              ) : (
                <div className="text-center py-16">
                  <div className="text-[#1f3b73]/40 mb-4">
                    <Search size={48} className="mx-auto" />
                  </div>
                  <h3 className="text-xl font-semibold text-[#1f3b73] mb-2">No products found</h3>
                  <p className="text-gray-600">Try adjusting your search or browse different categories</p>
                </div>
              )}
            </TabsContent>
          </div>
        </Tabs>
      </div>

      {/* Mobile cart/favorites floating buttons */}
      <div className="md:hidden fixed bottom-4 right-4 flex flex-col gap-3">
        <button className="relative bg-white p-3 rounded-full shadow-lg border border-[#1f3b73]/10">
          <Heart size={20} className="text-red-500" />
          {favorites.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-[#e1a95f] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
              {favorites.length}
            </span>
          )}
        </button>
        <button className="relative bg-[#1f3b73] text-white p-3 rounded-full shadow-lg">
          <ShoppingCart size={20} />
          {cartItems.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-[#e1a95f] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
              {cartItems.length}
            </span>
          )}
        </button>
      </div>

      {/* Mobile overlay backdrop */}
      {isMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/30 z-40"
          onClick={() => setIsMenuOpen(false)}
        >
        </div>
      )}
    </div>
  );
}