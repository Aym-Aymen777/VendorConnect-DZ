import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const ProductMediaSlider = ({ media, title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState('next');

  const isVideo = (item) => {
    return item.type === 'video' || item.url.match(/\.(mp4|webm|ogg|mov|avi)$/i);
  };

  const nextSlide = () => {
    if (isAnimating) return;
    
    // Pause current video if it's playing
    const currentMedia = media[currentIndex];
    if (isVideo(currentMedia)) {
      const currentVideo = document.querySelector(`video[src="${currentMedia.url}"]`);
      if (currentVideo) currentVideo.pause();
    }
    
    setDirection('next');
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % media.length);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    
    // Pause current video if it's playing
    const currentMedia = media[currentIndex];
    if (isVideo(currentMedia)) {
      const currentVideo = document.querySelector(`video[src="${currentMedia.url}"]`);
      if (currentVideo) currentVideo.pause();
    }
    
    setDirection('prev');
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + media.length) % media.length);
  };



  // Reset animation state after transition
  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isAnimating]);

  if (!media || media.length === 0) {
    return (
      <div className="w-full h-32 lg:h-40 bg-gray-200 rounded-lg mb-4 flex items-center justify-center animate-pulse">
        <span className="text-gray-500">No media</span>
      </div>
    );
  }

  return (
    <div className="relative w-full h-32 lg:h-40 mb-4 group overflow-hidden rounded-lg">
      {/* Image Container with Sliding Animation */}
      <div 
        className="flex transition-transform duration-500 ease-in-out h-full"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {media.map((item, index) => (
          <div key={index} className="min-w-full h-full relative">
            {item.type === 'video' || item.url.match(/\.(mp4|webm|ogg|mov|avi)$/i) ? (
              <video
                src={item.url}
                className="w-full h-full object-cover"
                controls={false}
                muted
                autoPlay={index === currentIndex}
                loop
                playsInline
                onLoadStart={() => {
                  // Preload video for smooth playback
                  const video = document.querySelector(`video[src="${item.url}"]`);
                  if (video) video.load();
                }}
              />
            ) : (
              <img
                src={item.url}
                alt={`${title} - ${index + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            )}

            {/* Video Controls Overlay */}
            {(item.type === 'video' || item.url.match(/\.(mp4|webm|ogg|mov|avi)$/i)) && index === currentIndex && (
              <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black/20 z-10">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    const video = e.target.closest('.min-w-full').querySelector('video');
                    if (video.paused) {
                      video.play();
                    } else {
                      video.pause();
                    }
                  }}
                  className="bg-white/90 hover:bg-white text-black p-3 rounded-full transition-all duration-200 hover:scale-110"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </button>
              </div>
            )}
            
            {/* Fade overlay during transition */}
            {isAnimating && (
              <div className="absolute inset-0 bg-black/10 transition-opacity duration-300" />
            )}
          </div>
        ))}
      </div>
      
      {media.length > 1 && (
        <>
          {/* Navigation Arrows with Enhanced Animation */}
          <button
            onClick={prevSlide}
            disabled={isAnimating}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 transform disabled:cursor-not-allowed disabled:opacity-50 z-10"
          >
            <ChevronLeft size={16} className="transition-transform duration-200 hover:-translate-x-0.5" />
          </button>
          
          <button
            onClick={nextSlide}
            disabled={isAnimating}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 transform disabled:cursor-not-allowed disabled:opacity-50 z-10"
          >
            <ChevronRight size={16} className="transition-transform duration-200 hover:translate-x-0.5" />
          </button>

        

          {/* Enhanced Image Counter */}
          <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full transition-all duration-300 group-hover:bg-black/80 z-10">
            <span className="transition-all duration-300">
              {currentIndex + 1}/{media.length}
            </span>
          </div>

          {/* Progress Bar */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/20 z-10">
            <div 
              className="h-full bg-white/80 transition-all duration-500 ease-in-out"
              style={{ width: `${((currentIndex + 1) / media.length) * 100}%` }}
            />
          </div>
        </>
      )}

      {/* Gradient Overlays for Better Visibility */}
      <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-black/20 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
    </div>
  );
};

