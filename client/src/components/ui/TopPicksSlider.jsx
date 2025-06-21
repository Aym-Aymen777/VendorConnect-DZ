import { useRef, useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const TopPicksSlider = ({ products = [] }) => {
  const sliderRef = useRef(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  // Sample data if no products provided
  const sampleProducts = [
    { _id: '1', name: 'Premium Wireless Headphones', price: '$199.99', category: 'Electronics', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop' },
    { _id: '2', name: 'Organic Cotton T-Shirt', price: '$29.99', category: 'Fashion', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop' },
    { _id: '3', name: 'Smart Fitness Watch', price: '$299.99', category: 'Wearables', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop' },
    { _id: '4', name: 'Artisan Coffee Beans', price: '$24.99', category: 'Food & Beverage', image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=300&fit=crop' },
    { _id: '5', name: 'Leather Messenger Bag', price: '$149.99', category: 'Accessories', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop' },
    { _id: '6', name: 'Bamboo Desk Organizer', price: '$39.99', category: 'Home & Office', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop' },
    { _id: '7', name: 'Wireless Charging Pad', price: '$49.99', category: 'Electronics', image: 'https://images.unsplash.com/photo-1558618047-3c8888e3865f?w=400&h=300&fit=crop' },
    { _id: '8', name: 'Indoor Plant Collection', price: '$79.99', category: 'Home & Garden', image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop' }
  ]

  const displayProducts = products.length > 0 ? products : sampleProducts

  const updateScrollButtons = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  const scroll = (direction) => {
    if (sliderRef.current) {
      const scrollAmount = 300
      sliderRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      })
    }
  }

  useEffect(() => {
    const slider = sliderRef.current
    if (slider) {
      updateScrollButtons()
      slider.addEventListener('scroll', updateScrollButtons)
      return () => slider.removeEventListener('scroll', updateScrollButtons)
    }
  }, [displayProducts])

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-[#1f3b73] mb-2">Top Picks For You </h2>
            <p className="text-gray-600">Discover our most popular products for you</p>
          </div>
          
          {/* Navigation Controls */}
          <div className="flex items-center gap-4">
            {/* Explore More Link */}
            <Link 
              to="/products" 
              className="flex items-center gap-2 text-[#e1a95f] hover:text-[#1f3b73] font-semibold transition-colors duration-300 group"
            >
              <span>Explore More</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
            
            {/* Scroll Buttons */}
            <div className="hidden md:flex gap-2">
              <button
                onClick={() => scroll('left')}
                disabled={!canScrollLeft}
                className={`bg-white border-2 rounded-full p-2 transition-all duration-300 ${
                  canScrollLeft 
                    ? 'border-gray-300 hover:bg-[#e1a95f] hover:border-[#e1a95f] hover:text-white' 
                    : 'border-gray-200 text-gray-400 cursor-not-allowed'
                }`}
                aria-label="Scroll Left"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={() => scroll('right')}
                disabled={!canScrollRight}
                className={`bg-white border-2 rounded-full p-2 transition-all duration-300 ${
                  canScrollRight 
                    ? 'border-gray-300 hover:bg-[#e1a95f] hover:border-[#e1a95f] hover:text-white' 
                    : 'border-gray-200 text-gray-400 cursor-not-allowed'
                }`}
                aria-label="Scroll Right"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Products Slider */}
        <div
          ref={sliderRef}
          className="flex gap-6 overflow-x-auto scroll-smooth hide-scrollbar pb-2"
        >
          {displayProducts.map((product) => (
            <Link
              to={`/products/${product._id}`}
              key={product._id}
              className="min-w-[240px] max-w-[240px] bg-[#f4f2ed] rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col group"
            >
              {/* Product Image */}
              <div className="h-48 w-full overflow-hidden rounded-t-xl bg-white/50 flex items-center justify-center">
                <img
                  src={product.image}
                  alt={product.name}
                  className="object-cover h-full w-full transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              
              {/* Product Info */}
              <div className="p-4 flex-1 flex flex-col">
                <h3 className="text-base font-semibold text-[#1f3b73] mb-2 line-clamp-2 group-hover:text-[#e1a95f] transition-colors duration-300">
                  {product.name}
                </h3>
                <div className="mt-auto">
                  <p className="text-[#e1a95f] font-bold text-lg mb-1">{product.price}</p>
                  <span className="text-sm text-gray-600 bg-white/70 px-2 py-1 rounded-full">
                    {product.category}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile scroll indicators */}
        <div className="flex justify-center mt-6 md:hidden">
          <div className="flex gap-2">
            <div className="w-2 h-2 bg-[#e1a95f] rounded-full"></div>
            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TopPicksSlider