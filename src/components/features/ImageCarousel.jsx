import { useState, useEffect, useCallback } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const ImageCarousel = ({ images = [], onAllLoaded }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);

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

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') goToPrevious();
      if (e.key === 'ArrowRight') goToNext();
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
      <div className="relative bg-black rounded-lg overflow-hidden">
        {!imageLoaded && <div className="absolute inset-0 bg-gray-300 animate-pulse z-10" />}
        <img
          src={currentImage}
          alt={`Project image ${currentIndex + 1}`}
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-96 object-cover transition-opacity duration-300 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />

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
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageCarousel;
