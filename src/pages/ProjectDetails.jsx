import { useEffect, useState, useCallback } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import ImageCarousel from '../components/features/ImageCarousel';
import ProjectInfo from '../components/features/ProjectInfo';
import ProjectTags from '../components/features/ProjectTags';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import Button from '../components/common/Button';
import { fetchWithRetry, findProjectById, normalizePortfolioData } from '../utils/apiClient';
import { API_CONFIG, ROUTES } from '../constants';
import { logError } from '../utils/errorUtils';

/**
 * Loading Fallback Component
 * Skeleton loader for project details
 */
const LoadingFallback = () => (
  <div className="animate-pulse space-y-6">
    <div className="h-96 bg-gray-200 rounded-lg" />
    <div className="h-40 bg-gray-200 rounded-lg" />
    <div className="h-20 bg-gray-200 rounded-lg" />
  </div>
);

/**
 * Project Header Component
 */
const ProjectHeader = ({ title, onBack }) => (
  <div className="flex flex-col items-start gap-1 mb-8">
    <button
      onClick={onBack}
      className="text-primary underline text-base hover:text-primary/80 transition-colors"
    >
      &larr; Back to Portfolio
    </button>
    <h1 className="text-4xl md:text-5xl font-bold text-primary mt-2">{title}</h1>
  </div>
);

/**
 * Project Description Component
 */
const ProjectDescription = ({ description }) => (
  <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
    <h2 className="text-2xl font-bold text-primary mb-4">Project Description</h2>
    <p className="text-gray-700 text-lg leading-relaxed">{description}</p>
  </div>
);

/**
 * CTA Section Component
 */
const ProjectCTASection = () => (
  <div className="bg-primary text-white p-8 rounded-lg text-center">
    <h2 className="text-2xl font-bold mb-4">Interested in This Project Style?</h2>
    <p className="text-lg mb-6 opacity-90">
      Let's create something similar for your space. Get in touch with our design team.
    </p>
    <Link
      to={ROUTES.CONTACT}
      className="inline-block bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-secondary transition-colors duration-300"
    >
      Start Your Project
    </Link>
  </div>
);

/**
 * ProjectDetails Page Component
 * Displays detailed information about a selected project
 * Supports both navigation state and direct URL access with fallback fetching
 */
const ProjectDetails = () => {
  const { projectId } = useParams();
  const location = useLocation();
  const passedProject = location.state?.project;

  const [project, setProject] = useState(passedProject || null);
  const [loading, setLoading] = useState(!passedProject);
  const [error, setError] = useState(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  /**
   * Fetches project from API if not available from navigation state
   */
  const fetchProjectData = useCallback(async () => {
    if (project) return;

    try {
      setLoading(true);
      setError(null);

      const data = await fetchWithRetry(API_CONFIG.PORTFOLIO_URL);
      const projects = normalizePortfolioData(data);
      const found = findProjectById(projects, projectId);

      if (!found) {
        throw new Error('Project not found');
      }

      setProject(found);
    } catch (err) {
      const errorMessage = err.message || 'Failed to load project details';
      setError(errorMessage);
      logError(err, 'ProjectDetails.fetchProjectData');
    } finally {
      setLoading(false);
    }
  }, [projectId, project]);

  // Fetch project on mount if not already loaded
  useEffect(() => {
    fetchProjectData();
  }, [fetchProjectData]);

  const handleRetry = useCallback(() => {
    setProject(null);
    fetchProjectData();
  }, [fetchProjectData]);

  // Loading State
  if (loading) {
    return (
      <div className="bg-secondary min-h-screen w-full">
        <div className="max-w-4xl mx-auto p-6">
          <LoadingFallback />
        </div>
      </div>
    );
  }

  // Error State
  if (error || !project) {
    return (
      <div className="bg-secondary min-h-screen w-full">
        <div className="max-w-4xl mx-auto p-6">
          <Link to={ROUTES.PORTFOLIO} className="text-primary underline text-base mb-4 inline-block">
            &larr; Back to Portfolio
          </Link>
          <ErrorMessage
            message={error || 'Project not found'}
            onRetry={handleRetry}
          />
        </div>
      </div>
    );
  }

  // Success State
  return (
    <div className="bg-secondary min-h-screen w-full">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <ProjectHeader title={project.title} onBack={() => window.history.back()} />

        {/* Image Carousel */}
        <div className="mb-8 relative">
          <ImageCarousel
            images={project.allImages || (project.image ? [project.image] : [])}
            onAllLoaded={() => setImagesLoaded(true)}
          />

          {/* Loading mask while images are preloading */}
          {!imagesLoaded && (
            <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60">
              <div className="text-white text-center p-4 rounded">
                <div className="mb-2">Loading images...</div>
                <div className="h-2 w-48 bg-white/30 rounded overflow-hidden">
                  <div className="h-full bg-white animate-[loading_1.5s_linear_infinite]" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Project Info */}
        {project.location && project.category && project.year && (
          <div className="mb-8">
            <ProjectInfo
              location={project.location}
              category={project.category}
              year={project.year}
            />
          </div>
        )}

        {/* Description */}
        {project.description && <ProjectDescription description={project.description} />}

        {/* Tags */}
        {project.tags && project.tags.length > 0 && (
          <div className="mb-8">
            <ProjectTags tags={project.tags} />
          </div>
        )}

        {/* Call to Action */}
        <ProjectCTASection />
      </div>
    </div>
  );
};

export default ProjectDetails;
