import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';

// Sample portfolio data (should match Portfolio.jsx)
const portfolioItems = [
  {
    id: 1,
    title: 'Modern Living Room Transformation',
    category: 'residential',
    location: 'Manhattan, NY',
    year: '2024',
    budget: '$45,000',
    images: [
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
    ],
    description:
      'Complete renovation of a 1200 sq ft living space with contemporary design elements.',
    tags: ['Modern', 'Minimalist', 'Living Room'],
  },
  {
    id: 2,
    title: 'Luxury Hotel Lobby Design',
    category: 'commercial',
    location: 'Brooklyn, NY',
    year: '2024',
    budget: '$120,000',
    images: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop',
    ],
    description:
      'Sophisticated lobby design for a boutique hotel featuring custom furniture and lighting.',
    tags: ['Luxury', 'Commercial', 'Hospitality'],
  },
  // ...add more sample projects as needed
];

const ProjectDetails = () => {
  const { projectId } = useParams();
  const project = portfolioItems.find((p) => p.id === Number(projectId));

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

  // Carousel state
  const [currentImg, setCurrentImg] = useState(0);
  const images = project.images || [];

  const prevImg = () => setCurrentImg((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  const nextImg = () => setCurrentImg((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  const selectImg = (idx) => setCurrentImg(idx);

  return (
    <div className="bg-secondary min-h-screen w-full">
      <div className="max-w-4xl mx-auto p-6">
        <Link to="/portfolio" className="text-primary underline mb-4 inline-block">
          &larr; Back to Portfolio
        </Link>
        <h1 className="text-3xl font-bold mb-4">{project.title}</h1>

        {/* Image Carousel */}
        {images.length > 0 && (
          <div className="mb-8">
            <div className="relative flex items-center justify-center">
              <button
                onClick={prevImg}
                className="absolute left-0 z-10 bg-white/80 hover:bg-white rounded-full p-2 shadow"
                aria-label="Previous image"
              >
                &#8592;
              </button>
              <img
                src={images[currentImg]}
                alt={`Project screenshot ${currentImg + 1}`}
                className="w-full max-w-2xl h-72 object-cover rounded shadow mx-auto"
              />
              <button
                onClick={nextImg}
                className="absolute right-0 z-10 bg-white/80 hover:bg-white rounded-full p-2 shadow"
                aria-label="Next image"
              >
                &#8594;
              </button>
            </div>
            {/* Thumbnails */}
            <div className="flex justify-center gap-2 mt-3">
              {images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  onClick={() => selectImg(idx)}
                  className={`w-16 h-12 object-cover rounded cursor-pointer border-2 ${
                    idx === currentImg ? 'border-primary' : 'border-transparent'
                  }`}
                  style={{ opacity: idx === currentImg ? 1 : 0.6 }}
                />
              ))}
            </div>
          </div>
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
