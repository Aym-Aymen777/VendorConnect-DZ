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
  Loader2,
  Clock,
  Eye,
  ArrowRight,
  Percent,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
// import { Link } from "react-router-dom"; // Commented out for artifact compatibility
import Header from "../components/common/Header";
import useSearchStore from "../store/SearchStore";
import ProductsFlexContainer from "../components/marketplace/ProductFlexContainer";
import CategoryMenu from "../components/marketplace/CategoryMenu";
import AutoSponsoringsSlider from "../components/marketplace/AutoSponsoringsSlider";
import useUserStore from "../store/UserStore";

// Enhanced categories with icons
const categories = [
  {
    category: "Building Materials",
    icon: <Layers size={18} />,
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
    icon: <Grid size={18} />,
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
    icon: <Zap size={18} />,
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
    icon: <Layers size={18} />,
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
    icon: <Grid size={18} />,
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
    icon: <Layers size={18} />,
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
    icon: <Grid size={18} />,
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
    icon: <Zap size={18} />,
    subcategories: [
      "Refrigerators",
      "Washing Machines",
      "Air Conditioners",
      "Electric Ovens",
      "Water Heaters",
      "Small Appliances (Microwave, Kettle, etc.)",
    ],
  },
];



export default function Marketplace() {

  const {getMarketPlaceProducts}=useUserStore()


  const [tab, setTab] = useState("featured");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { searchTerm } = useSearchStore();
  const [favorites, setFavorites] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [products,setProducts]=useState([])
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [expandedCategories, setExpandedCategories] = useState([]);
  const [Loading,setLoading]=useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await getMarketPlaceProducts();
        setProducts(res.products);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [tab, getMarketPlaceProducts]);


  // Filter products based on current tab
  useEffect(() => {
    let filtered = [...products];

    switch (tab) {
      case "featured":
        filtered = products.filter((p) => p.isFeatured);
        break;
      case "flash":
        filtered = products.filter((p) => p.flashDeals?.isActive);
        break;
      case "new": {
        const now = new Date();
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(now.getDate() - 7);

        filtered = products.filter((p) => {
          const created = new Date(p.createdAt);
          return created >= oneWeekAgo && created <= now;
        });
        break;
      }
      default:
        if (categories.find((c) => c.category === tab)) {
          filtered = products.filter((p) => p.category === tab);
        }
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.subcategory.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  }, [tab, searchTerm]);

  const handleAddToCart = (product) => {
    setCartItems((prev) => [...prev, product]);
  };

  const handleToggleFavorite = (productId) => {
    setFavorites((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const handleSearch = () => {
    // Search functionality is already handled by useEffect
  };

  const toggleCategory = (categoryName) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryName)
        ? prev.filter((name) => name !== categoryName)
        : [...prev, categoryName]
    );
  };

  const handleMenuItemClick = () => {
    if (window.innerWidth < 1024) {
      setIsMenuOpen(false);
    }
  };

  if (Loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-[#f4f2ed] flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin text-[#e1a95f] mx-auto mb-4" />
            <p className="text-[#1f3b73]">Loading product...</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="min-h-screen bg-[#f4f2ed]">
      {/* Header */}
      <Header />
      <div className=" mx-10 px-4 py-8">
        <Tabs
          value={tab}
          onValueChange={setTab}
          className="flex flex-col lg:flex-row gap-4 lg:gap-8">
          {/* Enhanced Responsive Sidebar - Moved to the left */}
          <div className="lg:w-80 lg:-ml-4">
            <button
              className="lg:hidden mb-4 bg-white p-3 rounded-xl shadow border border-[#1f3b73]/10 flex items-center gap-2 w-full sm:w-auto"
              onClick={() => setIsMenuOpen(true)}
              aria-label="Open menu">
              <Menu size={22} className="text-[#1f3b73]" />
              <span className="font-semibold text-[#1f3b73]">Menu</span>
            </button>
            <div
              className={`bg-white rounded-2xl shadow-lg border border-[#1f3b73]/10 transition-all duration-300 ${
                isMenuOpen ? "block" : "hidden lg:block"
              } ${
                isMenuOpen
                  ? "fixed inset-2 sm:inset-4 z-50 lg:relative lg:inset-auto overflow-y-auto"
                  : "lg:sticky lg:top-4"
              } lg:h-[90vh] lg:py-10`}>
              {/* Mobile close button */}
              {isMenuOpen && (
                <div className="lg:hidden flex justify-between items-center p-4 border-b border-[#1f3b73]/10">
                  <h2 className="text-xl font-bold text-[#1f3b73]">
                    Categories
                  </h2>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="p-2 hover:bg-[#f4f2ed] rounded-lg transition-colors">
                    <X size={20} className="text-[#1f3b73]" />
                  </button>
                </div>
              )}

              <div className="p-4 sm:p-6 h-full overflow-y-auto">
                <h2 className="text-xl font-bold text-[#1f3b73] mb-6 hidden lg:block">
                  Categories
                </h2>

                <TabsList className="flex flex-col gap-2 sm:gap-3 bg-transparent p-0 w-full">
                  {/* Special tabs */}
                  <TabsTrigger
                    value="featured"
                    className="w-full justify-start gap-3 px-3 sm:px-4 py-3 sm:py-4 bg-white hover:bg-[#e1a95f]/10 data-[state=active]:bg-[#1f3b73] data-[state=active]:text-white rounded-xl transition-all duration-200 border-0 text-left"
                    onClick={handleMenuItemClick}>
                    <Sparkles size={18} className="flex-shrink-0" />
                    <div className="text-left min-w-0 flex-1">
                      <div className="font-semibold text-sm sm:text-base truncate">
                        Featured Products
                      </div>
                      <div className="text-xs opacity-80 truncate">
                        Handpicked for you
                      </div>
                    </div>
                  </TabsTrigger>

                  <TabsTrigger
                    value="flash"
                    className="w-full justify-start gap-3 px-3 sm:px-4 py-3 sm:py-4 bg-white hover:bg-[#e1a95f]/10 data-[state=active]:bg-[#1f3b73] data-[state=active]:text-white rounded-xl transition-all duration-200 border-0 text-left"
                    onClick={handleMenuItemClick}>
                    <Zap size={18} className="flex-shrink-0" />
                    <div className="text-left min-w-0 flex-1">
                      <div className="font-semibold text-sm sm:text-base truncate">
                        Flash Deals
                      </div>
                      <div className="text-xs opacity-80 truncate">
                        Limited time offers
                      </div>
                    </div>
                  </TabsTrigger>

                  <TabsTrigger
                    value="new"
                    className="w-full justify-start gap-3 px-3 sm:px-4 py-3 sm:py-4 bg-white hover:bg-[#e1a95f]/10 data-[state=active]:bg-[#1f3b73] data-[state=active]:text-white rounded-xl transition-all duration-200 border-0 text-left"
                    onClick={handleMenuItemClick}>
                    <TrendingUp size={18} className="flex-shrink-0" />
                    <div className="text-left min-w-0 flex-1">
                      <div className="font-semibold text-sm sm:text-base truncate">
                        New Arrivals
                      </div>
                      <div className="text-xs opacity-80 truncate">
                        Latest products
                      </div>
                    </div>
                  </TabsTrigger>

                  {/* Categories with expandable subcategories */}
                  <div className="space-y-2 w-full">
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
          <div className="flex-1 min-w-0">
            {/* Results header */}
            {/* <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8 gap-4">
              <div className="min-w-0 flex-1">
                <h2 className="text-xl sm:text-2xl font-bold text-[#1f3b73] truncate">
                  {tab === "featured" && "Featured Products"}
                  {tab === "flash" && "Flash Deals"}
                  {tab === "new" && "New Arrivals"}
                  {categories.find(c => c.category === tab)?.category}
                </h2>
                <p className="text-gray-600 text-sm sm:text-base">{filteredProducts.length} products found</p>
              </div>
              
              <button className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-white rounded-xl shadow-md hover:shadow-lg transition-all border border-[#1f3b73]/10 flex-shrink-0">
                <Filter size={16} className="text-[#1f3b73]" />
                <span className="text-[#1f3b73] text-sm sm:text-base">Filters</span>
              </button>
            </div> */}

            {/* START: Sponsorings Above Products */}
            <div className="h-32 lg:h-50 mb-5">
              <AutoSponsoringsSlider />
            </div>
            {/* END: Sponsorings Box Above Products */}

            {/* Products Flex Container */}
            <TabsContent value={tab} className="mt-0 w-full">
              {filteredProducts.length > 0 ? (
                <ProductsFlexContainer
                  items={filteredProducts}
                  onAddToCart={handleAddToCart}
                  onToggleFavorite={handleToggleFavorite}
                  favorites={favorites}
                />
              ) : (
                <div className="text-center py-12 sm:py-16">
                  <div className="text-[#1f3b73]/40 mb-4">
                    <Search size={36} sm:size={48} className="mx-auto" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-[#1f3b73] mb-2">
                    No products found
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base px-4">
                    Try adjusting your search or browse different categories
                  </p>
                </div>
              )}
            </TabsContent>
          </div>
        </Tabs>
      </div>

      {/* Mobile cart/favorites floating buttons */}
      <div className="md:hidden fixed bottom-4 right-4 flex flex-col gap-3 z-30">
        <button className="relative bg-white p-3 rounded-full shadow-lg border border-[#1f3b73]/10 transition-all hover:shadow-xl">
          <Heart size={20} className="text-red-500" />
          {favorites.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-[#e1a95f] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
              {favorites.length}
            </span>
          )}
        </button>
        <button className="relative bg-[#1f3b73] text-white p-3 rounded-full shadow-lg transition-all hover:shadow-xl">
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
          className="lg:hidden fixed inset-0 bg-black/30 z-40 transition-opacity"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </div>
  );
}
