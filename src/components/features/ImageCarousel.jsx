import { useState, useEffect, useCallback } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

// Helper to generate Cloudflare optimized image URLs with width parameter
const getCloudflareLazyUrl = (url, width) => {
  if (!url || typeof url !== 'string') return url;

  // Only add Cloudflare params to R2 URLs
  if (!url.includes('r2.dev')) return url;

  // If URL already has query params, append with &
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}format=auto&quality=80&width=${width}`;
};

// Generate srcset for responsive image serving
const generateSrcset = (url) => {
  return [
    `${getCloudflareLazyUrl(url, 600)} 600w`,
    `${getCloudflareLazyUrl(url, 1200)} 1200w`,
    `${getCloudflareLazyUrl(url, 1920)} 1920w`,
  ].join(', ');
};

const ImageCarousel = ({ images = [], onAllLoaded }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [nextImageLoaded, setNextImageLoaded] = useState(false);
  const [prevImageLoaded, setPrevImageLoaded] = useState(false);

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

  // Lazy load only current, next, and previous images for better mobile performance
  useEffect(() => {
    let mounted = true;

    // Immediately call onAllLoaded if no callback (for backward compatibility)
    if (!onAllLoaded || !images || images.length === 0) {
      if (onAllLoaded) onAllLoaded();
      return;
    }

    // For backward compatibility, simulate "all loaded" by checking current image
    const currentImg = new Image();
    currentImg.onload = () => {
      if (mounted) onAllLoaded();
    };
    currentImg.onerror = () => {
      if (mounted) onAllLoaded();
    };
    currentImg.src = images[currentIndex];

    return () => {
      mounted = false;
    };
  }, [currentIndex, images, onAllLoaded]);

  // Preload next and previous images in background (non-blocking)
  useEffect(() => {
    const nextIndex = (currentIndex + 1) % images.length;
    const prevIndex = (currentIndex - 1 + images.length) % images.length;

    const loadImage = (src) => {
      const img = new Image();
      img.src = src;
    };

    // Preload next and previous images asynchronously
    if (images.length > 1) {
      loadImage(images[nextIndex]);
      loadImage(images[prevIndex]);
    }
  }, [currentIndex, images]);

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
        {/* Blur-up placeholder while loading */}
        {!imageLoaded && (
          <div
            className="absolute inset-0 bg-gray-400 animate-pulse z-10"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect fill='%23f3f4f6' width='400' height='300'/%3E%3C/svg%3E")`,
            }}
          />
        )}

        <img
          src={getCloudflareLazyUrl(currentImage, 1920)}
          srcSet={generateSrcset(currentImage)}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
          alt={`Project image ${currentIndex + 1}`}
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-96 object-cover transition-opacity duration-500 ${
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
                src={getCloudflareLazyUrl(image, 160)}
                srcSet={`${getCloudflareLazyUrl(image, 160)} 1x, ${getCloudflareLazyUrl(image, 320)} 2x`}
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
