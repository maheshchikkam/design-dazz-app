import React, { useState, useEffect, useCallback } from 'react';

const generateBlurDataUrl = () => {
  const svg = `
    <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <filter id="blur" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="3"/>
      </filter>
      <rect width="100%" height="100%" fill="#cccccc" filter="url(#blur)"/>
    </svg>
  `;
  return `data:image/svg+xml;base64,${btoa(svg)}`;
};

const ImageModal = ({ image, onClose }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div
      className="fixed inset-0 bg-black/95 z-50 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <button
        className="absolute top-4 right-4 text-white text-4xl hover:text-gray-300 transition-colors"
        onClick={onClose}
      >
        ×
      </button>
      <div className="relative">
        <img
          src={generateBlurDataUrl()}
          alt="Placeholder"
          className={`max-w-[95vw] max-h-[95vh] object-contain rounded-lg shadow-2xl ${
            isLoaded ? 'hidden' : 'block'
          }`}
        />
        <img
          src={image}
          alt="Enlarged view"
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
          className={`max-w-[95vw] max-h-[95vh] object-contain rounded-lg shadow-2xl transform transition-all duration-500 ${
            isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        />
      </div>
    </div>
  );
};

const CarouselImage = ({ src, alt, onClick }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div
      className="relative w-full h-full flex items-center justify-center cursor-pointer group"
      onClick={onClick}
    >
      <img
        src={generateBlurDataUrl()}
        alt={alt}
        className="w-full h-full object-contain rounded-lg"
        style={{
          position: 'absolute',
          opacity: isLoaded ? 0 : 1,
          transition: 'opacity 0.5s ease-out',
        }}
      />
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        className="w-full h-full object-contain rounded-lg shadow-2xl"
        style={{
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 0.5s ease-out, filter 0.3s ease-out',
          filter: 'brightness(100%)',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.filter = 'brightness(110%)')}
        onMouseLeave={(e) => (e.currentTarget.style.filter = 'brightness(100%)')}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center">
        <span className="text-white text-sm font-medium mb-4">Click to view full size</span>
      </div>
    </div>
  );
};

const ImageGallery = ({ images, imagesLoaded }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  const goToImage = (index) => {
    setCurrentIndex(index);
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') goToPrevious();
      if (e.key === 'ArrowRight') goToNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [images.length]);

  if (!imagesLoaded) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-primary">Loading images...</div>
      </div>
    );
  }

  if (images.length === 0) {
    return <div className="text-center py-8">No images available for this project.</div>;
  }

  const currentImage = images[currentIndex];

  return (
    <div className="mb-8">
      {/* Main Carousel */}
      <div
        className="relative bg-black/5 rounded-lg overflow-hidden mb-6"
        style={{
          aspectRatio: '16 / 9',
        }}
      >
        <CarouselImage
          src={currentImage}
          alt={`Project screenshot ${currentIndex + 1}`}
          onClick={() => setSelectedImage(currentImage)}
        />

        {/* Previous Button */}
        <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition-all duration-200 group"
          aria-label="Previous image"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        {/* Next Button */}
        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition-all duration-200 group"
          aria-label="Next image"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Image Counter */}
        <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm font-medium">
          {currentIndex + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnail Navigation */}
      <div className="flex gap-2 overflow-x-auto pb-2 px-1">
        {images.map((img, idx) => (
          <button
            key={img}
            onClick={() => goToImage(idx)}
            className={`flex-shrink-0 w-16 h-16 rounded-md overflow-hidden transition-all duration-200 border-2 ${
              idx === currentIndex
                ? 'border-primary ring-2 ring-primary/50'
                : 'border-gray-300 hover:border-primary'
            }`}
            aria-label={`Go to image ${idx + 1}`}
          >
            <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>

      {/* Modal for full size view */}
      {selectedImage && <ImageModal image={selectedImage} onClose={() => setSelectedImage(null)} />}
    </div>
  );
};

export default ImageGallery;
