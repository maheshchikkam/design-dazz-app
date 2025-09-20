import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

// Sample portfolio data (should match Portfolio.jsx)
const portfolioItems = [
  {
    id: 1,
    projectFolder: '/images/project-1',
    title: 'Modern Living Room Transformation',
    category: 'residential',
    location: 'Manhattan, NY',
    year: '2024',
    budget: '$45,000',
    description:
      'Complete renovation of a 1200 sq ft living space with contemporary design elements.',
    tags: ['Modern', 'Minimalist', 'Living Room'],
  },
  // ...add more sample projects as needed
];

const ProjectDetails = () => {
  const { projectId } = useParams();
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const project = portfolioItems.find((p) => p.id === Number(projectId));
  const [images, setImages] = useState([]);

  useEffect(() => {
    // Reset images loaded state when project changes
    setImagesLoaded(false);

    // Load and preload images from the project folder
    const loadImages = async () => {
      if (project?.projectFolder) {
        try {
          // Function to test if an image exists
          const imageExists = async (path) => {
            try {
              const response = await fetch(path, { method: 'HEAD' });
              return response.ok;
            } catch {
              return false;
            }
          };

          // Generate potential image paths by testing common image numbers
          const potentialImages = [];
          const categories = ['CBR', 'GBR', 'KITCHEN', 'Living', 'MBR'];

          // Add numbered images for each category
          for (const category of categories) {
            for (let i = 1; i <= 5; i++) {
              potentialImages.push(`${project.projectFolder}/${category}_${i}.jpg`);
            }
          }

          // Add special case for POOJA.jpg
          potentialImages.push(`${project.projectFolder}/POOJA.jpg`);

          // Test each path and filter only existing images
          const existencePromises = potentialImages.map(async (path) => {
            const exists = await imageExists(path);
            return exists ? path : null;
          });

          const imagePaths = (await Promise.all(existencePromises)).filter((path) => path !== null);

          const imagePromises = imagePaths.map((src) => {
            return new Promise((resolve) => {
              const img = new Image();
              img.src = src;
              img.onload = () => resolve(src);
              img.onerror = () => resolve(null); // Handle missing images gracefully
            });
          });

          const loadedImages = await Promise.all(imagePromises);
          // Filter out any failed image loads
          const validImages = loadedImages.filter((img) => img !== null);
          setImages(validImages);
          setImagesLoaded(true);
        } catch (error) {
          console.error('Error loading images:', error);
          setImagesLoaded(true); // Still set as loaded even if there's an error
          setImages([]); // Set empty array in case of error
        }
      }
    };

    loadImages();
  }, [project]);

  const closeModal = () => setSelectedImage(null);

  if (!project) {
    return (
      <div className="max-w-2xl mx-auto p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Project Not Found</h2>
        <Link to="/portfolio" className="text-primary underline">
          Back to Portfolio
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-secondary min-h-screen w-full">
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex flex-col items-start gap-1 mb-4">
          <Link to="/portfolio" className="text-primary underline text-base">
            &larr; Back to Portfolio
          </Link>
          <h1 className="text-3xl font-bold mt-1">{project.title}</h1>
        </div>

        {/* Image Gallery */}
        {!imagesLoaded ? (
          <div className="flex justify-center items-center py-12">
            <div className="text-primary">Loading images...</div>
          </div>
        ) : images.length > 0 ? (
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
              className={`columns-1 sm:columns-2 md:columns-3 gap-4 px-4 transition-opacity duration-500 ${imagesLoaded ? 'opacity-100' : 'opacity-0'}`}
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

            {/* Full Screen Image Modal */}
            {selectedImage && (
              <div
                className="fixed inset-0 bg-black/95 z-50 backdrop-blur-sm flex items-center justify-center p-4"
                onClick={closeModal}
              >
                <button
                  className="absolute top-4 right-4 text-white text-4xl hover:text-gray-300 transition-colors"
                  onClick={closeModal}
                >
                  ×
                </button>
                <img
                  src={selectedImage}
                  alt="Enlarged view"
                  className="max-w-[95vw] max-h-[95vh] object-contain rounded-lg shadow-2xl transform transition-transform duration-300 scale-95 hover:scale-100"
                />
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-8">No images available for this project.</div>
        )}

        {/* Project Details Card */}
        <div className="bg-white rounded-lg shadow p-6 mb-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <div className="flex items-center mb-2">
              <span className="material-icons text-primary mr-2">place</span>
              <span className="font-semibold">Location:</span>&nbsp;{project.location}
            </div>
            <div className="flex items-center mb-2">
              <span className="material-icons text-primary mr-2">category</span>
              <span className="font-semibold">Category:</span>&nbsp;
              {project.category.charAt(0).toUpperCase() + project.category.slice(1)}
            </div>
          </div>
          <div>
            <div className="flex items-center mb-2">
              <span className="material-icons text-primary mr-2">calendar_today</span>
              <span className="font-semibold">Year:</span>&nbsp;{project.year}
            </div>
            <div className="flex items-center mb-2">
              <span className="material-icons text-primary mr-2">attach_money</span>
              <span className="font-semibold">Budget:</span>&nbsp;{project.budget}
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-700 text-lg mb-4 bg-white rounded p-4 shadow-sm">
          {project.description}
        </p>

        {/* Tags */}
        <div className="mb-2 flex flex-wrap gap-2">
          {project.tags.map((tag, idx) => (
            <span
              key={idx}
              className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium border border-primary/20"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
