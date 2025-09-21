import React, { useState } from 'react';

const ImageModal = ({ image, onClose }) => (
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
    <img
      src={image}
      alt="Enlarged view"
      loading="lazy"
      className="max-w-[95vw] max-h-[95vh] object-contain rounded-lg shadow-2xl transform transition-transform duration-300 scale-95 hover:scale-100"
    />
  </div>
);

const ImageGallery = ({ images, imagesLoaded }) => {
  const [selectedImage, setSelectedImage] = useState(null);

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
        {images.map((img, idx) => (
          <div
            key={idx}
            className="relative group overflow-hidden rounded-lg mb-4 cursor-pointer break-inside-avoid transform hover:-translate-y-1 transition-all duration-300 ease-in-out"
            onClick={() => setSelectedImage(img)}
          >
            <img
              src={img}
              alt={`Project screenshot ${idx + 1}`}
              loading="lazy"
              className="w-full object-cover transition-all duration-300 group-hover:brightness-110"
              style={{
                display: 'block',
                height: `${300 + Math.floor(Math.random() * 200)}px`,
                borderRadius: '12px',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300">
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <span className="text-sm font-medium">Click to view full size</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedImage && <ImageModal image={selectedImage} onClose={() => setSelectedImage(null)} />}
    </div>
  );
};

export default ImageGallery;
