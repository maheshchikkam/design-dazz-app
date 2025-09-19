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

  return (
    <div className="bg-secondary min-h-screen w-full">
      <div className="max-w-4xl mx-auto p-6">
        <Link to="/portfolio" className="text-primary underline mb-4 inline-block">
          &larr; Back to Portfolio
        </Link>
        <h1 className="text-3xl font-bold mb-2">{project.title}</h1>
        <div className="flex flex-wrap gap-4 mb-6">
          {project.images &&
            project.images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`Project screenshot ${idx + 1}`}
                className="w-60 h-40 object-cover rounded shadow"
              />
            ))}
        </div>
        <p className="text-gray-600 mb-4">{project.description}</p>
        <div className="mb-2">
          <span className="font-semibold">Location:</span> {project.location}
        </div>
        <div className="mb-2">
          <span className="font-semibold">Category:</span>{' '}
          {project.category.charAt(0).toUpperCase() + project.category.slice(1)}
        </div>
        <div className="mb-2">
          <span className="font-semibold">Year:</span> {project.year}
        </div>
        <div className="mb-2">
          <span className="font-semibold">Budget:</span> {project.budget}
        </div>
        <div className="mb-2">
          <span className="font-semibold">Tags:</span> {project.tags.join(', ')}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
