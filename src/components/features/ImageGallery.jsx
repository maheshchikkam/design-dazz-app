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

const ProgressiveImage = ({ src, alt, onClick, height }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const imageRef = React.useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '50px',
      }
    );

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={imageRef}
      className="relative group overflow-hidden rounded-lg mb-4 cursor-pointer break-inside-avoid will-change-transform"
      style={{
        transform: 'translate3d(0, 0, 0)',
        transition: 'transform 0.3s ease-out',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = 'translate3d(0, -4px, 0)')}
      onMouseLeave={(e) => (e.currentTarget.style.transform = 'translate3d(0, 0, 0)')}
      onClick={onClick}
    >
      <img
        src={generateBlurDataUrl()}
        alt={alt}
        className={`w-full object-cover will-change-opacity`}
        style={{
          position: 'absolute',
          height: height,
          borderRadius: '12px',
          opacity: isLoaded ? 0 : 1,
          transition: 'opacity 0.5s ease-out',
        }}
      />
      {isVisible && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
          className="w-full object-cover will-change-[opacity,filter]"
          style={{
            height: height,
            borderRadius: '12px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
            opacity: isLoaded ? 1 : 0,
            transition: 'opacity 0.5s ease-out, filter 0.3s ease-out',
            filter: 'brightness(100%)',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.filter = 'brightness(110%)')}
          onMouseLeave={(e) => (e.currentTarget.style.filter = 'brightness(100%)')}
        />
      )}
      <div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60 will-change-opacity"
        style={{
          opacity: 0,
          transition: 'opacity 0.3s ease-out',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = 1)}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = 0)}
      >
        <div
          className="absolute bottom-0 left-0 right-0 p-4 text-white will-change-transform"
          style={{
            transform: 'translateY(16px)',
            transition: 'transform 0.3s ease-out',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(16px)')}
        >
          <span className="text-sm font-medium">Click to view full size</span>
        </div>
      </div>
    </div>
  );
};

const ImageGallery = ({ images, imagesLoaded }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [displayedImages, setDisplayedImages] = useState([]);
  const batchSize = 6;

  useEffect(() => {
    if (images.length > 0) {
      setDisplayedImages(images.slice(0, batchSize));
    }
  }, [images]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 1000) {
        setDisplayedImages((prev) => {
          const nextBatch = images.slice(0, prev.length + batchSize);
          return Array.from(new Set([...prev, ...nextBatch]));
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [images]);

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

  return (
    <div
      className="mb-8 w-screen max-w-none relative left-1/2 right-1/2 -mx-[50vw]"
      style={{
        position: 'relative',
        left: '50%',
        right: '50%',
        marginLeft: '-50vw',
        marginRight: '-50vw',
        width: '100vw',
      }}
    >
      <div
        className={`columns-1 sm:columns-2 md:columns-3 gap-4 px-4 transition-opacity duration-500 ${
          imagesLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {displayedImages.map((img, idx) => (
          <ProgressiveImage
            key={img}
            src={img}
            alt={`Project screenshot ${idx + 1}`}
            onClick={() => setSelectedImage(img)}
            height={`${300 + Math.floor(Math.random() * 200)}px`}
          />
        ))}
      </div>

      {selectedImage && <ImageModal image={selectedImage} onClose={() => setSelectedImage(null)} />}
    </div>
  );
};

export default ImageGallery;
