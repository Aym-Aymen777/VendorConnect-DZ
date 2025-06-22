import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const AutoSponsoringsSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Sample images - you can replace these with your own images
  const images = [
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=300&fit=crop",
      title: "Modern Kitchen Design",
      description: "Premium kitchen solutions"
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=300&fit=crop",
      title: "Living Room Furniture",
      description: "Comfortable & stylish furniture"
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=300&fit=crop",
      title: "Bathroom Fixtures",
      description: "Luxury bathroom essentials"
    },
    {
      id: 4,
      url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=300&fit=crop",
      title: "Lighting Solutions",
      description: "Illuminate your space"
    },
    {
      id: 5,
      url: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=300&fit=crop",
      title: "Building Materials",
      description: "Quality construction materials"
    }
  ];

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  };

  return (
    <div className="relative w-full h-full bg-white rounded-xl overflow-hidden shadow-md border border-[#1f3b73]/10 group">
      {/* Images Container */}
      <div className="relative w-full h-full">
        {images.map((image, index) => (
          <div
            key={image.id}
            className={`absolute inset-0 transition-all duration-700 ease-in-out ${
              index === currentSlide 
                ? 'opacity-100 translate-x-0' 
                : index < currentSlide 
                ? 'opacity-0 -translate-x-full' 
                : 'opacity-0 translate-x-full'
            }`}
          >
            <img
              src={image.url}
              alt={image.title}
              className="w-full h-full object-cover"
            />
            {/* Overlay with gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/20" />
            
            {/* Content overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white">
              <h3 className="text-lg sm:text-xl font-bold mb-1 drop-shadow-lg">
                {image.title}
              </h3>
              <p className="text-sm sm:text-base opacity-90 drop-shadow">
                {image.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-1.5 sm:p-2 transition-all duration-200 opacity-0 group-hover:opacity-100"
        aria-label="Previous slide"
      >
        <ChevronLeft size={20} className="text-white drop-shadow" />
      </button>
      
      <button
        onClick={goToNext}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-1.5 sm:p-2 transition-all duration-200 opacity-0 group-hover:opacity-100"
        aria-label="Next slide"
      >
        <ChevronRight size={20} className="text-white drop-shadow" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 sm:gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'bg-white scale-125 shadow-lg'
                : 'bg-white/50 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Loading progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
        <div 
          className="h-full bg-[#e1a95f] transition-all duration-100 ease-linear"
          style={{
            width: `${((currentSlide + 1) / images.length) * 100}%`
          }}
        />
      </div>
    </div>
  );
};

export default AutoSponsoringsSlider;