import { Star, Package, MapPin, ArrowRight } from 'lucide-react'

// Note: Import { Link } from 'react-router-dom' in your actual project
const Link = ({ to, children, className, ...props }) => (
  <a href={to} className={className} {...props}>{children}</a>
)

const TopSuppliersSection = ({ suppliers = [] }) => {
  // Sample data if no suppliers provided
  const sampleSuppliers = [
    {
      _id: '1',
      name: 'TechWorld Electronics',
      profileImage: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=400&fit=crop',
      rating: 4.8,
      reviewCount: 1247,
      productCount: 156,
      location: 'New York, USA',
      category: 'Electronics',
      verified: true
    },
    {
      _id: '2',
      name: 'Fashion Forward',
      profileImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=400&fit=crop',
      rating: 4.9,
      reviewCount: 892,
      productCount: 234,
      location: 'Los Angeles, CA',
      category: 'Fashion',
      verified: true
    },
    {
      _id: '3',
      name: 'Home & Garden Paradise',
      profileImage: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop',
      rating: 4.7,
      reviewCount: 654,
      productCount: 89,
      location: 'Seattle, WA',
      category: 'Home & Garden',
      verified: false
    },
    {
      _id: '4',
      name: 'Sports Zone',
      profileImage: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop',
      rating: 4.6,
      reviewCount: 423,
      productCount: 178,
      location: 'Miami, FL',
      category: 'Sports',
      verified: true
    },
    {
      _id: '5',
      name: 'Artisan Crafts Co.',
      profileImage: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=400&fit=crop',
      rating: 4.9,
      reviewCount: 321,
      productCount: 67,
      location: 'Portland, OR',
      category: 'Handmade',
      verified: true
    },
    {
      _id: '6',
      name: 'Beauty Essential',
      profileImage: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop',
      rating: 4.5,
      reviewCount: 789,
      productCount: 145,
      location: 'Chicago, IL',
      category: 'Beauty',
      verified: false
    }
  ]

  const displaySuppliers = suppliers.length > 0 ? suppliers : sampleSuppliers

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={14}
        className={`${
          i < Math.floor(rating) 
            ? 'fill-[#e1a95f] text-[#e1a95f]' 
            : i < rating 
            ? 'fill-[#e1a95f]/50 text-[#e1a95f]' 
            : 'text-gray-300'
        }`}
      />
    ))
  }

  return (
    <section className="py-12 bg-[#f4f2ed]">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-[#1f3b73] mb-2">Top Suppliers & Stores</h2>
            <p className="text-gray-600">Discover trusted sellers with excellent ratings</p>
          </div>
          
          {/* View All Link */}
          <Link 
            to="/suppliers" 
            className="flex items-center gap-2 text-[#e1a95f] hover:text-[#1f3b73] font-semibold transition-colors duration-300 group"
          >
            <span>View All Stores</span>
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>

        {/* Suppliers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displaySuppliers.map((supplier) => (
            <div
              key={supplier._id}
              className="bg-[#f4f2ed] rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
            >
              {/* Card Content */}
              <div className="p-6">
                {/* Profile Image and Basic Info */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="relative">
                    <img
                      src={supplier.profileImage}
                      alt={supplier.name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-[#e1a95f]/20"
                    />
                    {/* Verified Badge */}
                    {supplier.verified && (
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#1f3b73] rounded-full flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-[#1f3b73] mb-1 group-hover:text-[#e1a95f] transition-colors duration-300">
                      {supplier.name}
                    </h3>
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin size={14} className="text-gray-500" />
                      <span className="text-sm text-gray-600">{supplier.location}</span>
                    </div>
                    <span className="inline-block bg-[#e1a95f]/10 text-[#e1a95f] text-xs font-medium px-2 py-1 rounded-full">
                      {supplier.category}
                    </span>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center gap-1">
                    {renderStars(supplier.rating)}
                  </div>
                  <span className="text-sm font-semibold text-[#1f3b73]">{supplier.rating}</span>
                  <span className="text-sm text-gray-500">({supplier.reviewCount} reviews)</span>
                </div>

                {/* Product Count */}
                <div className="flex items-center gap-2 mb-6">
                  <Package size={16} className="text-[#e1a95f]" />
                  <span className="text-sm text-gray-600">
                    <span className="font-semibold text-[#1f3b73]">{supplier.productCount}</span> Products Available
                  </span>
                </div>

                {/* Visit Store Button */}
                <Link
                  to={`/user/supplier/${supplier._id}`}
                  className="w-full bg-[#e1a95f] hover:bg-[#1f3b73] text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 group/btn"
                >
                  <span>Visit Store</span>
                  <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button (Optional) */}
        <div className="text-center mt-8">
          <Link
            to="/suppliers"
            className="inline-flex items-center gap-2 bg-[#e1a95f] hover:bg-[#1f3b73] text-white font-semibold py-3 px-6 rounded-lg border-2 border-[#e1a95f] hover:border-[#1f3b73] transition-all duration-300"
          >
            <span>Explore All Suppliers</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default TopSuppliersSection