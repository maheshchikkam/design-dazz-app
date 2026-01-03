import { useState, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';
import { usePortfolio } from '../hooks/usePortfolio';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import SkeletonLoader from '../components/common/SkeletonLoader';
import Button from '../components/common/Button';
import { PROJECT_CATEGORIES, CATEGORY_LABELS, UI } from '../constants';
import { getCategoryBadgeClass } from '../utils/classNameUtils';

/**
 * Project filter options configuration
 */
const FILTER_OPTIONS = [
  { id: 'all', label: 'All Projects' },
  { id: PROJECT_CATEGORIES.RESIDENTIAL, label: CATEGORY_LABELS.residential },
  { id: PROJECT_CATEGORIES.COMMERCIAL, label: CATEGORY_LABELS.commercial },
];

/**
 * Portfolio statistics configuration
 */
const PORTFOLIO_STATS = [
  { value: '150+', label: 'Projects Completed' },
  { value: '98%', label: 'Client Satisfaction' },
  { value: '5', label: 'Years Experience' },
  { value: '25', label: 'Awards Won' },
];

/**
 * Design process steps configuration
 */
const DESIGN_PROCESS = [
  { step: 1, title: 'Discovery', description: 'Understanding your needs, lifestyle, and design preferences' },
  { step: 2, title: 'Design', description: 'Creating detailed plans and 3D visualizations of your space' },
  { step: 3, title: 'Development', description: 'Sourcing materials and coordinating with contractors' },
  { step: 4, title: 'Delivery', description: 'Final installation and styling of your transformed space' },
];

/**
 * Portfolio Card Component
 * Displays individual project with image, details, and interaction
 */
const PortfolioCard = ({ item }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
    setImageError(false);
  }, []);

  const handleImageError = useCallback(() => {
    setImageLoaded(true);
    setImageError(true);
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
      {/* Image Container */}
      <div className="relative overflow-hidden">
        {!imageLoaded && <div className="w-full h-64 bg-gray-200 animate-pulse" />}
        {imageError && (
          <div className="w-full h-64 bg-gray-300 flex items-center justify-center">
            <span className="text-gray-600 text-sm text-center px-4">Image failed to load</span>
          </div>
        )}
        <img
          src={item.image}
          alt={item.title}
          onLoad={handleImageLoad}
          onError={handleImageError}
          className={`w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300 ${
            !imageLoaded || imageError ? 'hidden' : 'block'
          }`}
          loading="lazy"
        />

        {/* Category Badge */}
        <div className="absolute top-4 right-4">
          <span className={getCategoryBadgeClass(item.category)}>
            {CATEGORY_LABELS[item.category] || item.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-primary mb-2 group-hover:text-brown transition-colors duration-300">
          {item.title}
        </h3>

        <p className="text-brown text-sm mb-4 line-clamp-2">{item.description}</p>

        {/* Project Details */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-brown text-sm">
            <FaMapMarkerAlt className="mr-2 text-primary" />
            {item.location}
          </div>
          <div className="flex items-center text-brown text-sm">
            <FaCalendarAlt className="mr-2 text-primary" />
            {item.year}
          </div>
        </div>

        {/* Tags */}
        {item.tags && item.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {item.tags.map((tag, index) => (
              <span key={index} className="px-2 py-1 bg-secondary text-brown text-xs rounded-full">
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* View Project Button */}
        <Link
          to={`/portfolio/${item.id}`}
          state={{ project: item }}
          className="block w-full bg-primary text-white py-2 rounded-lg hover:bg-brown transition-colors duration-300 font-medium text-center"
        >
          View Project Details
        </Link>
      </div>
    </div>
  );
};

/**
 * Filter Button Component
 */
const FilterButton = ({ option, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
      isActive
        ? 'bg-primary text-white shadow-lg transform scale-105'
        : 'bg-white text-brown hover:bg-primary hover:text-white shadow-md'
    }`}
    aria-pressed={isActive}
  >
    {option.label}
  </button>
);

/**
 * Stats Section Component
 */
const StatsSection = () => (
  <div className="mt-16 bg-white rounded-lg shadow-lg p-8">
    <h2 className="text-2xl md:text-3xl font-bold text-primary text-center mb-8">
      Our Impact in Numbers
    </h2>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
      {PORTFOLIO_STATS.map((stat, index) => (
        <div key={index} className="text-center">
          <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.value}</div>
          <div className="text-brown font-medium">{stat.label}</div>
        </div>
      ))}
    </div>
  </div>
);

/**
 * Call to Action Section Component
 */
const CTASection = () => (
  <div className="mt-16 text-center">
    <div className="bg-primary text-white p-8 md:p-12 rounded-lg">
      <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Start Your Project?</h2>
      <p className="text-lg mb-6 opacity-90">
        Let's create something extraordinary together. Get in touch to discuss your vision.
      </p>
      <Button variant="secondary" className="text-primary font-semibold">
        Start Your Project
      </Button>
    </div>
  </div>
);

/**
 * Design Process Section Component
 */
const ProcessSection = () => (
  <div className="mt-16">
    <h2 className="text-2xl md:text-3xl font-bold text-primary text-center mb-8">
      Our Design Process
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
      {DESIGN_PROCESS.map((process) => (
        <div key={process.step} className="text-center">
          <div className="bg-primary text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
            {process.step}
          </div>
          <h3 className="font-bold text-brown mb-2">{process.title}</h3>
          <p className="text-brown text-sm">{process.description}</p>
        </div>
      ))}
    </div>
  </div>
);

/**
 * Portfolio Page
 * Main portfolio page component with filtering, loading, and error states
 */
export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState('all');
  const { portfolioItems, loading, error, refetch } = usePortfolio();

  // Filter items based on active filter
  const filteredItems = useMemo(() => {
    if (activeFilter === 'all') {
      return portfolioItems;
    }
    return portfolioItems.filter((item) => item.category === activeFilter);
  }, [portfolioItems, activeFilter]);

  const handleFilterChange = useCallback((filterId) => {
    setActiveFilter(filterId);
  }, []);

  return (
    <div className="min-h-screen bg-secondary">
      <div className="container mx-auto px-4 py-8 md:py-16">
        {/* Header Section */}
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-3xl md:text-5xl font-bold text-primary mb-4">Our Portfolio</h1>
          <p className="text-brown text-lg md:text-xl max-w-3xl mx-auto">
            Discover our latest interior design projects where creativity meets functionality. Each
            space tells a unique story of transformation and innovation.
          </p>
        </div>

        {/* Error State */}
        {error && (
          <div className="mb-12">
            <ErrorMessage message={error} onRetry={refetch} />
          </div>
        )}

        {/* Filter Buttons */}
        {!loading && !error && (
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {FILTER_OPTIONS.map((option) => (
              <FilterButton
                key={option.id}
                option={option}
                isActive={activeFilter === option.id}
                onClick={() => handleFilterChange(option.id)}
              />
            ))}
          </div>
        )}

        {/* Portfolio Grid - Loading State */}
        {loading && <SkeletonLoader count={UI.SKELETON_COUNT} columns={3} />}

        {/* Portfolio Grid - Loaded State */}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <PortfolioCard key={item.id} item={item} />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-brown text-lg">No projects found in this category.</p>
              </div>
            )}
          </div>
        )}

        {/* Stats Section */}
        <StatsSection />

        {/* Call to Action */}
        <CTASection />

        {/* Design Process */}
        <ProcessSection />
      </div>
    </div>
  );
}
