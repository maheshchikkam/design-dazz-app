import { useState, useEffect, useCallback } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const ImageCarousel = ({ images = [], onAllLoaded }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    setImageLoaded(false);
  }, [images.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    setImageLoaded(false);
  }, [images.length]);

  const goToSlide = useCallback((index) => {
    setCurrentIndex(index);
    setImageLoaded(false);
  }, []);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (isLightboxOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isLightboxOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') goToPrevious();
      if (e.key === 'ArrowRight') goToNext();
      if (e.key === 'Escape') setIsLightboxOpen(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToPrevious, goToNext]);

  // Preload all images and notify parent when done (either success or error)
  useEffect(() => {
    let mounted = true;
    if (!onAllLoaded) return;
    if (!images || images.length === 0) {
      onAllLoaded();
      return;
    }

    let loadedCount = 0;
    images.forEach((src) => {
      const img = new Image();
      const done = () => {
        loadedCount += 1;
        if (mounted && loadedCount === images.length) {
          onAllLoaded();
        }
      };
      img.onload = done;
      img.onerror = done;
      img.src = src;
    });

    return () => {
      mounted = false;
    };
  }, [images, onAllLoaded]);

  if (!images || images.length === 0) {
    return (
      <div className="w-full h-96 bg-gray-300 rounded-lg flex items-center justify-center">
        <p className="text-gray-600">No images available</p>
      </div>
    );
  }

  const currentImage = images[currentIndex];

  return (
    <div className="w-full space-y-4">
      <div className="relative rounded-lg overflow-hidden flex items-center justify-center h-[350px] sm:h-[450px] md:h-[550px] lg:h-[600px] bg-transparent">
        {!imageLoaded && <div className="absolute inset-0 bg-gray-300 animate-pulse z-10" />}
        <img
          src={currentImage}
          alt={`Project image ${currentIndex + 1}`}
          onLoad={() => setImageLoaded(true)}
          onContextMenu={(e) => e.preventDefault()}
          draggable="false"
          onClick={() => setIsLightboxOpen(true)}
          className={`max-w-full max-h-full object-contain select-none cursor-zoom-in [-webkit-touch-callout:none] transition-all duration-300 hover:scale-[1.005] hover:brightness-95 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* CSS Watermark Overlay */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 overflow-hidden">
          <div className="transform -rotate-45 text-white/30 font-bold text-4xl md:text-6xl tracking-widest uppercase select-none drop-shadow-md whitespace-nowrap">
            © Design Dazz
          </div>
        </div>

        {images.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              aria-label="Previous image"
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/75 text-white p-2 rounded-full transition-all duration-200 z-20"
            >
              <FaChevronLeft size={24} />
            </button>
            <button
              onClick={goToNext}
              aria-label="Next image"
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/75 text-white p-2 rounded-full transition-all duration-200 z-20"
            >
              <FaChevronRight size={24} />
            </button>
          </>
        )}

        {images.length > 1 && (
          <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm font-medium">
            {currentIndex + 1} / {images.length}
          </div>
        )}
      </div>

      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`flex-shrink-0 h-20 w-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                index === currentIndex
                  ? 'border-primary shadow-lg'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
              aria-label={`Go to image ${index + 1}`}
            >
              <img
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover select-none pointer-events-none [-webkit-touch-callout:none]"
                onContextMenu={(e) => e.preventDefault()}
                draggable="false"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox Modal Popup */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 md:p-8 backdrop-blur-sm"
          onClick={() => setIsLightboxOpen(false)}
        >
          {/* Close button */}
          <button
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-4 right-4 text-white/80 hover:text-white bg-black/40 hover:bg-black/60 p-2.5 rounded-full transition-all duration-200 z-[60] cursor-pointer"
            aria-label="Close fullscreen"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Navigation - Previous */}
          {images.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToPrevious();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white bg-black/40 hover:bg-black/60 p-3.5 rounded-full transition-all duration-200 z-[60] cursor-pointer"
              aria-label="Previous image"
            >
              <FaChevronLeft size={24} />
            </button>
          )}

          {/* Navigation - Next */}
          {images.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white bg-black/40 hover:bg-black/60 p-3.5 rounded-full transition-all duration-200 z-[60] cursor-pointer"
              aria-label="Next image"
            >
              <FaChevronRight size={24} />
            </button>
          )}

          {/* Fullscreen Image Container */}
          <div className="relative max-w-full max-h-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
            <img
              src={currentImage}
              alt={`Project image ${currentIndex + 1}`}
              className="max-w-full max-h-[85vh] md:max-h-[90vh] object-contain rounded-lg shadow-2xl select-none [-webkit-touch-callout:none]"
              onContextMenu={(e) => e.preventDefault()}
              draggable="false"
            />

            {/* Watermark Overlay in Fullscreen */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 overflow-hidden">
              <div className="transform -rotate-45 text-white/20 font-bold text-5xl md:text-7xl tracking-widest uppercase select-none drop-shadow-md whitespace-nowrap">
                © Design Dazz
              </div>
            </div>

            {/* Image Counter */}
            {images.length > 1 && (
              <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm font-medium z-20">
                {currentIndex + 1} / {images.length}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageCarousel;
