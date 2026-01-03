import React, { useEffect, useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import ImageCarousel from '../components/features/ImageCarousel';
import ProjectInfo from '../components/features/ProjectInfo';
import ProjectTags from '../components/features/ProjectTags';

const PORTFOLIO_API_URL =
  'https://pub-20461b09c2564483b3f614a9f86ce669.r2.dev/project-details.json';

const LoadingFallback = () => (
  <div className="animate-pulse space-y-6">
    <div className="h-96 bg-gray-200 rounded-lg" />
    <div className="h-40 bg-gray-200 rounded-lg" />
    <div className="h-20 bg-gray-200 rounded-lg" />
  </div>
);

const ErrorState = ({ message, onRetry }) => (
  <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg text-center">
    <p className="mb-4">{message}</p>
    <button
      onClick={onRetry}
      className="bg-red-700 text-white px-4 py-2 rounded hover:bg-red-800 transition-colors duration-300"
    >
      Retry
    </button>
  </div>
);

const ProjectDetails = () => {
  const { projectId } = useParams();
  const location = useLocation();
  const passedProject = location.state?.project;

  const [project, setProject] = useState(passedProject || null);
  const [loading, setLoading] = useState(!passedProject);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (project) return; // already have project from navigation state

    const fetchProject = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(PORTFOLIO_API_URL);
        if (!res.ok) throw new Error(`Failed to fetch projects: ${res.statusText}`);
        const projects = await res.json();
        const found = projects.find((p) => p.id === Number(projectId));
        if (!found) throw new Error('Project not found');
        setProject(found);
      } catch (err) {
        console.error('ProjectDetails fetch error:', err);
        setError(err.message || 'Failed to load project');
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [projectId, project]);

  if (loading) {
    return (
      <div className="bg-secondary min-h-screen w-full">
        <div className="max-w-4xl mx-auto p-6">
          <LoadingFallback />
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="bg-secondary min-h-screen w-full">
        <div className="max-w-4xl mx-auto p-6">
          <Link to="/portfolio" className="text-primary underline text-base mb-4 inline-block">
            &larr; Back to Portfolio
          </Link>
          <ErrorState
            message={error || 'Project not found'}
            onRetry={() => window.location.reload()}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-secondary min-h-screen w-full">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="flex flex-col items-start gap-1 mb-8">
          <Link
            to="/portfolio"
            className="text-primary underline text-base hover:text-primary/80 transition-colors"
          >
            &larr; Back to Portfolio
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-primary mt-2">{project.title}</h1>
        </div>

        {/* Image Carousel */}
        <div className="mb-8">
          <ImageCarousel images={project.allImages || [project.image]} />
        </div>

        {/* Project Info */}
        <div className="mb-8">
          <ProjectInfo
            location={project.location}
            category={project.category}
            year={project.year}
          />
        </div>

        {/* Description */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-2xl font-bold text-primary mb-4">Project Description</h2>
          <p className="text-gray-700 text-lg leading-relaxed">{project.description}</p>
        </div>

        {/* Tags */}
        {project.tags && project.tags.length > 0 && (
          <div className="mb-8">
            <ProjectTags tags={project.tags} />
          </div>
        )}

        {/* Call to Action */}
        <div className="bg-primary text-white p-8 rounded-lg text-center">
          <h2 className="text-2xl font-bold mb-4">Interested in This Project Style?</h2>
          <p className="text-lg mb-6 opacity-90">
            Let's create something similar for your space. Get in touch with our design team.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-secondary transition-colors duration-300"
          >
            Start Your Project
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
