import { useRef, useState} from 'react'
import Header from './Header'
import FlashDealTimer from '../ui/FlashDealTimer'
import AutoImageSlider from '../ui/AutoImageSlider'
import { ChevronLeft, ChevronRight,ExternalLink } from 'lucide-react'
import { Link } from 'react-router-dom'
import InspirationGallery from '../ui/InspirationGallery'
import TopPicksSlider from '../ui/TopPicksSlider'
import TopSuppliersSection from '../ui/TopSuppliersSection'
import BlogsAndContent from '../ui/BlogsAndContent'

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
      "Gypsum Products"
    ]
  },
  {
    category: "Flooring & Wall Coverings",
    subcategories: [
      "Ceramic Tiles",
      "Marble & Granite",
      "Porcelain",
      "Parquet",
      "Wallpaper",
      "Paints & Coatings"
    ]
  },
  {
    category: "Electrical & Lighting",
    subcategories: [
      "Wires & Cables",
      "Circuit Breakers",
      "Lighting Fixtures (LED, Ceiling, Wall)",
      "Chandeliers",
      "Switches & Sockets",
      "Solar Energy Systems"
    ]
  },
  {
    category: "Plumbing & Bathrooms",
    subcategories: [
      "Faucets",
      "Sinks & Washbasins",
      "Toilets",
      "Showers & Accessories",
      "Water Mixers",
      "Pipes & Fittings"
    ]
  },
  {
    category: "Doors & Windows",
    subcategories: [
      "Wooden Doors",
      "Metal Doors",
      "Aluminum Windows",
      "PVC Windows",
      "Security Systems",
      "Interior & Exterior Doors"
    ]
  },
  {
    category: "Kitchen & Fixtures",
    subcategories: [
      "Kitchen Cabinets",
      "Countertops (Marble, Corian)",
      "Kitchen Sinks",
      "Built-in Appliances",
      "Hoods & Ventilation",
      "Kitchen Accessories"
    ]
  },
  {
    category: "Furniture",
    subcategories: [
      "Living Room Sets",
      "Beds & Bedrooms",
      "Dining Tables",
      "Chairs & Seating",
      "Wardrobes",
      "Office Desks"
    ]
  },
  {
    category: "Home Appliances",
    subcategories: [
      "Refrigerators",
      "Washing Machines",
      "Air Conditioners",
      "Electric Ovens",
      "Water Heaters",
      "Small Appliances (Microwave, Kettle, etc.)"
    ]
  },
  {
    category: "Outdoor & Garden",
    subcategories: [
      "Outdoor Flooring",
      "Garden Furniture",
      "Pergolas & Shades",
      "Outdoor Lighting",
      "Planters & Pots",
      "Fountains & Decor"
    ]
  },
  {
    category: "Security & Surveillance",
    subcategories: [
      "Security Cameras",
      "Alarm Systems",
      "Smart Doorbells",
      "Smart Locks",
      "Electric Gates"
    ]
  }
];

const categoryImages = {
  "Building Materials": "/categories/building.jpg",
  "Flooring & Wall Coverings": "/categories/flooring.jpg",
  "Electrical & Lighting": "/categories/lighting.jpg",
  "Plumbing & Bathrooms": "/categories/plumbing.jpg",
  "Doors & Windows": "/categories/doors.jpg",
  "Kitchen & Fixtures": "/categories/kitchen.jpg",
  "Furniture": "/categories/furniture.jpg",
  "Home Appliances": "/categories/appliances.jpg",
  "Outdoor & Garden": "/categories/outdoor.jpg",
  "Security & Surveillance": "/categories/security.jpg"
};

const flashDeals = [
  {
    id: 1,
    name: "Modern Sofa Set",
    image: "/products/sofa.jpg",
    owner: "Alice Smith",
    price: "$499",
    category: "Furniture",
    country: "USA",
    description: "A stylish and comfortable modern sofa set for your living room.",
    deal: "20% OFF until June 30",
  },
  {
    id: 2,
    name: "LED Chandelier",
    image: "/products/chandelier.jpg",
    owner: "Bright Lights Co.",
    price: "$120",
    category: "Electrical & Lighting",
    country: "Germany",
    description: "Elegant LED chandelier with energy-saving bulbs.",
    deal: "Flash Sale: Limited Stock!",
  },
  {
    id: 3,
    name: "Marble Kitchen Countertop",
    image: "/products/marble.jpg",
    owner: "StoneWorks",
    price: "$899",
    category: "Kitchen & Fixtures",
    country: "Italy",
    description: "Premium marble countertop for a luxury kitchen look.",
    deal: "15% OFF for 48 hours",
  },
  {
    id: 4,
    name: "Outdoor Garden Set",
    image: "/products/garden.jpg",
    owner: "GreenScape",
    price: "$350",
    category: "Outdoor & Garden",
    country: "Netherlands",
    description: "Weather-resistant garden furniture set for your backyard.",
    deal: "Deal of the Week",
  },
  {
    id: 5,
    name: "Smart Security Camera",
    image: "/products/camera.jpg",
    owner: "SecureHome",
    price: "$79",
    category: "Security & Surveillance",
    country: "China",
    description: "1080p WiFi camera with night vision and motion detection.",
    deal: "Buy 1 Get 1 Free",
  },
  {
    id: 6,
    name: "Luxury Bed Frame",
    image: "/products/bed.jpg",
    owner: "DreamSleep",
    price: "$650",
    category: "Furniture",
    country: "France",
    description: "King size luxury bed frame with velvet finish.",
    deal: "Save $100 Today",
  },
  {
    id: 7,
    name: "Smart Home Hub",
    image: "/products/hub.jpg",
    owner: "TechCo",
    price: "$299",
    category: "Electrical & Lighting",
    country: "USA",
    description: "Smart home hub with voice control and security features.",
    deal: "Limited Time Offer",
  },
  {
    id: 8,
    name: "Outdoor Patio Set",
    image: "/products/patio.jpg",
    owner: "Outdoorsy",
    price: "$599",
    category: "Outdoor & Garden",
    country: "Canada",
    description: "Outdoor patio set with outdoor furniture and accessories.",
    deal: "Buy 2 Get 1 Free",
  },
  {
    id: 9,
    name: "Smart Home Hub",
    image: "/products/hub.jpg",
    owner: "TechCo",
    price: "$299",
    category: "Electrical & Lighting",
    country: "USA",
    description: "Smart home hub with voice control and security features.",
    deal: "Limited Time Offer",
  }
];

const slugify = (text) =>
  text.toLowerCase().replace(/ & | /g, '-').replace(/[()]/g, '').replace(/-+/g, '-');

// 🧠 Memoized Category Card
const CategoryCard = ({ category, image }) => (
  <Link
    to={`/products/category/${slugify(category)}`}
    className="min-w-[220px] max-w-[240px] group bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden flex flex-col"
  >
    <div className="h-32 md:h-40 w-full overflow-hidden flex items-center justify-center bg-[#e1a95f]/10">
      <img
        src={image}
        alt={category}
        className="object-cover h-full w-full group-hover:scale-105 transition-transform duration-300 will-change-transform"
        loading="lazy"
      />
    </div>
    <div className="p-4 text-center">
      <span className="text-[#1f3b73] font-semibold text-lg group-hover:text-[#e1a95f] transition-colors duration-300">
        {category}
      </span>
    </div>
  </Link>
);

const AuthUserScreen = () => {
  const sliderRef = useRef(null);
  const [selectedDeal, setSelectedDeal] = useState(null);

  const scroll = (direction) => {
    if (sliderRef.current) {
      const scrollAmount = 500;
      sliderRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  

  return (
    <div>
      <Header />
      <AutoImageSlider />

      {/* Shop by Category */}
      <section className="py-16 bg-[#f4f2ed]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#1f3b73] mb-4">
              Shop by Category
            </h2>
            <p className="text-[#1f3b73c7] max-w-2xl mx-auto">
              Explore our wide range of categories to find exactly what you need for your home or project.
            </p>
          </div>

          <div className="relative">
            {/* Left Arrow */}
            <button
              type="button"
              aria-label="Scroll left"
              onClick={() => scroll('left')}
              className="hidden md:flex items-center justify-center absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-[#e1a95f] hover:text-white text-[#1f3b73] rounded-full shadow-sm w-10 h-10 transition-all duration-200"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Right Arrow */}
            <button
              type="button"
              aria-label="Scroll right"
              onClick={() => scroll('right')}
              className="hidden md:flex items-center justify-center absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-[#e1a95f] hover:text-white text-[#1f3b73] rounded-full shadow-sm w-10 h-10 transition-all duration-200"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Category Slider */}
            <div
              ref={sliderRef}
              className="flex overflow-x-auto gap-8 pb-2 hide-scrollbar scroll-smooth will-change-scroll"
            >
              {categories.map((cat) => (
                <CategoryCard
                  key={cat.category}
                  category={cat.category}
                  image={categoryImages[cat.category] || "/categories/default.jpg"}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

     
     {/* Flash Deals Section */}
   <section className="py-8 sm:py-12 lg:py-16 bg-white">
  <div className="container mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8 gap-3 sm:gap-4">
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1f3b73]">Flash Deals ⚡</h2>
        <FlashDealTimer />
      </div>
      <Link 
            href="#" 
            className="text-[#1f3b73] hover:text-[#e1a95f] font-semibold transition-colors duration-200 flex items-center gap-2"
          >
            See More
            <ExternalLink size={16} />
          </Link>
    </div>
    <div
      className="
        grid
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-3
        xl:grid-cols-4
        gap-4
        sm:gap-6
        auto-rows-auto
      "
    >
      {flashDeals.map((deal, index) => (
        <div
          key={deal.id}
          className={
            `bg-[#f4f2ed] rounded-xl shadow hover:shadow-lg transition-all duration-300 flex flex-col cursor-pointer group relative overflow-hidden
            ${index === 0
              ? 'sm:col-span-2 lg:col-span-2 xl:col-span-2 lg:row-span-2 border-2 sm:border-4 border-[#e1a95f] z-10'
              : ''}`
          }
          onClick={() => setSelectedDeal(deal)}
        >
          {/* Image Container */}
          <div className={`w-full overflow-hidden bg-[#e1a95f]/10 flex items-center justify-center
            ${index === 0
              ? 'h-48 sm:h-56 lg:h-64 xl:h-72 rounded-t-xl'
              : 'h-32 sm:h-36 lg:h-40 rounded-t-xl'}`}>
            <img
              src={deal.image}
              alt={deal.name}
              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
          </div>
          
          {/* Content Container */}
          <div className={`p-3 sm:p-4 lg:p-5 flex-1 flex flex-col ${index === 0 ? 'sm:p-6 lg:p-8' : ''}`}>
            <h3 className={`font-semibold text-[#1f3b73] mb-2 line-clamp-2
              ${index === 0 
                ? 'text-lg sm:text-xl lg:text-2xl' 
                : 'text-base sm:text-lg'}`}>
              {deal.name}
            </h3>
            
            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2 mb-2">
              <span className={`text-[#e1a95f] font-bold
                ${index === 0 
                  ? 'text-xl sm:text-2xl lg:text-3xl' 
                  : 'text-lg sm:text-xl'}`}>
                {deal.price}
              </span>
              <span className="text-xs sm:text-sm text-[#1f3b73] mt-1 sm:mt-0">
                {deal.deal}
              </span>
            </div>
            
            <div className="text-xs sm:text-sm text-gray-500 mb-2 flex flex-wrap gap-1">
              <span>{deal.category}</span>
              <span>•</span>
              <span>{deal.country}</span>
            </div>
            
            <p className={`text-xs sm:text-sm text-gray-700 flex-1 mb-3
              ${index === 0 
                ? 'line-clamp-3 sm:line-clamp-4 lg:line-clamp-5' 
                : 'line-clamp-2 sm:line-clamp-3'}`}>
              {deal.description}
            </p>
            
            <span className="text-xs sm:text-sm text-[#e1a95f] underline cursor-pointer self-end font-medium">
              See details
            </span>
          </div>
          
          {/* Featured Badge */}
          {index === 0 && (
            <span className="absolute top-2 sm:top-4 left-2 sm:left-4 bg-[#e1a95f] text-white text-xs sm:text-sm px-2 sm:px-3 py-1 rounded-full shadow font-bold z-20">
              Featured
            </span>
          )}
        </div>
      ))}
    </div>
  </div>

  {/* Modal for deal details */}
  {selectedDeal && (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-sm sm:max-w-md lg:max-w-4xl xl:max-w-5xl w-full max-h-[90vh] overflow-y-auto relative animate-fade-in">
        <button
          className="absolute top-3 right-3 sm:top-4 sm:right-4 text-[#1f3b73] hover:text-[#e1a95f] text-xl sm:text-2xl font-bold z-10 bg-white/80 rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center"
          onClick={() => setSelectedDeal(null)}
          aria-label="Close"
        >
          &times;
        </button>
        
        <div className="flex flex-col lg:flex-row">
          {/* Image Section */}
          <div className="lg:w-1/2 flex-shrink-0 p-4 sm:p-6 lg:p-8">
            <img
              src={selectedDeal.image}
              alt={selectedDeal.name}
              className="rounded-lg w-full h-48 sm:h-64 lg:h-80 xl:h-96 object-cover"
            />
          </div>
          
          {/* Content Section */}
          <div className="flex flex-col justify-center lg:w-1/2 p-4 sm:p-6 lg:p-8 pt-0 lg:pt-8">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#1f3b73] mb-3 sm:mb-4 pr-8">
              {selectedDeal.name}
            </h3>
            
            <div className="mb-3 sm:mb-4 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
              <span className="text-[#e1a95f] font-bold text-xl sm:text-2xl lg:text-3xl">
                {selectedDeal.price}
              </span>
              <span className="text-sm sm:text-base text-[#1f3b73] font-medium">
                {selectedDeal.deal}
              </span>
            </div>
            
            <div className="space-y-2 sm:space-y-3 text-sm sm:text-base">
              <div className="text-gray-700 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                <span className="font-semibold text-[#1f3b73] min-w-fit">Owner:</span> 
                <span>{selectedDeal.owner}</span>
              </div>
              
              <div className="text-gray-700 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                <span className="font-semibold text-[#1f3b73] min-w-fit">Category:</span> 
                <span>{selectedDeal.category}</span>
              </div>
              
              <div className="text-gray-700 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                <span className="font-semibold text-[#1f3b73] min-w-fit">Country:</span> 
                <span>{selectedDeal.country}</span>
              </div>
              
              <div className="text-gray-700 flex flex-col gap-1 sm:gap-2">
                <span className="font-semibold text-[#1f3b73]">Description:</span> 
                <p className="leading-relaxed">{selectedDeal.description}</p>
              </div>
              
              <div className="text-[#e1a95f] flex flex-col gap-1 sm:gap-2 pt-2 border-t border-gray-100">
                <span className="font-semibold">Deal:</span> 
                <span className="font-medium">{selectedDeal.deal}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )}
</section>

{/* Top Picks Section */}
<TopPicksSlider/>

{/* Room ideas & inspiration gallery section */}
 <InspirationGallery/>

{/* Top Suppliers Section */}
 <TopSuppliersSection/>

 {/* Blogs and Content Section */}
 <BlogsAndContent/>





    </div>
  );
};

export default AuthUserScreen;