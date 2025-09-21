import React, { lazy, Suspense, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProjectById } from '../data/portfolioData';
import ProjectInfo from '../components/features/ProjectInfo';
import ProjectTags from '../components/features/ProjectTags';
import { useImageLoader } from '../hooks/useImageLoader';

// Lazy load the ImageGallery component
const ImageGallery = lazy(() => import('../components/features/ImageGallery'));

const LoadingFallback = () => (
  <div className="text-primary text-center py-12 animate-pulse">
    <div className="h-64 bg-gray-200 rounded-lg mb-4"></div>
    <div className="h-64 bg-gray-200 rounded-lg mb-4"></div>
    <div className="h-64 bg-gray-200 rounded-lg"></div>
  </div>
);

const ProjectDetails = () => {
  const { projectId } = useParams();
  const project = getProjectById(projectId);
  const { images, imagesLoaded, error, loadedCount } = useImageLoader(project?.projectFolder);

  // Prefetch next and previous projects' images
  useEffect(() => {
    if (project) {
      const preloadNextPrev = async () => {
        const projects = Object.values(getProjectById());
        const currentIndex = projects.findIndex((p) => p.id === project.id);
        const nextProject = projects[(currentIndex + 1) % projects.length];
        const prevProject = projects[(currentIndex - 1 + projects.length) % projects.length];

        // Preload first image of next and previous projects
        [nextProject, prevProject].forEach((p) => {
          if (p?.projectFolder) {
            const img = new Image();
            img.src = `${p.projectFolder}/1.jpg`;
          }
        });
      };

      preloadNextPrev();
    }
  }, [project]);

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

        {error && (
          <div className="text-red-500 bg-red-100 p-4 rounded mb-4">
            Error loading images: {error}
          </div>
        )}

        <Suspense fallback={<LoadingFallback />}>
          <ImageGallery images={images} imagesLoaded={imagesLoaded} />
        </Suspense>

        {imagesLoaded && images.length === 0 && (
          <div className="text-primary text-center py-8">No images available for this project.</div>
        )}

        <ProjectInfo location={project.location} category={project.category} year={project.year} />

        <p className="text-gray-700 text-lg mb-4 bg-white rounded p-4 shadow-sm">
          {project.description}
        </p>

        <ProjectTags tags={project.tags} />
      </div>
    </div>
  );
};

export default ProjectDetails;
