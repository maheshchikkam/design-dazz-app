import React from 'react';
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

  const images = project.images || [];

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
        {images.length > 0 && (
          <div
            className="mb-8 w-screen max-w-none relative left-1/2 right-1/2 -mx-[50vw] px-0"
            style={{
              position: 'relative',
              left: '50%',
              right: '50%',
              marginLeft: '-50vw',
              marginRight: '-50vw',
              width: '100vw',
            }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-0 gap-x-0">
              {images.map((img, idx) => (
                <div key={idx} className="relative group overflow-hidden rounded-lg">
                  <img
                    src={img}
                    alt={`Project screenshot ${idx + 1}`}
                    className="w-full h-[40vw] max-h-[480px] object-cover transition-transform duration-300 group-hover:scale-105 group-hover:brightness-90"
                    style={{ minHeight: '200px', borderRadius: 0, boxShadow: 'none' }}
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </div>
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
