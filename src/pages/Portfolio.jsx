import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';

const PORTFOLIO_API_URL =
  'https://pub-20461b09c2564483b3f614a9f86ce669.r2.dev/project-details.json';

const PortfolioCard = ({ item }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
    setImageError(false);
  };

  const handleImageError = () => {
    setImageLoaded(true);
    setImageError(true);
    console.error(`Failed to load image: ${item.image}`);
  };

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
          loading="lazy"
          onLoad={handleImageLoad}
          onError={handleImageError}
          className={`w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300 ${
            !imageLoaded || imageError ? 'hidden' : 'block'
          }`}
        />

        {/* Category Badge */}
        <div className="absolute top-4 right-4">
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              item.category === 'residential' ? 'bg-primary text-white' : 'bg-brown text-white'
            }`}
          >
            {item.category === 'residential' ? 'Residential' : 'Commercial'}
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
        <div className="flex flex-wrap gap-2 mb-4">
          {item.tags?.map((tag, index) => (
            <span key={index} className="px-2 py-1 bg-secondary text-brown text-xs rounded-full">
              {tag}
            </span>
          ))}
        </div>

        {/* View Project Button */}
        <Link
          to={`/portfolio/${item.id}`}
          className="block w-full bg-primary text-white py-2 rounded-lg hover:bg-brown transition-colors duration-300 font-medium text-center"
        >
          View Project Details
        </Link>
      </div>
    </div>
  );
};

const LoadingSkeletons = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {[...Array(6)].map((_, index) => (
      <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden animate-pulse">
        <div className="w-full h-64 bg-gray-200" />
        <div className="p-6 space-y-4">
          <div className="h-6 bg-gray-200 rounded w-3/4" />
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded" />
            <div className="h-4 bg-gray-200 rounded w-5/6" />
          </div>
          <div className="h-10 bg-gray-200 rounded" />
        </div>
      </div>
    ))}
  </div>
);

const ErrorMessage = ({ message, onRetry }) => (
  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg text-center">
    <p className="mb-4">{message}</p>
    <button
      onClick={onRetry}
      className="bg-red-700 text-white px-4 py-2 rounded hover:bg-red-800 transition-colors duration-300"
    >
      Retry
    </button>
  </div>
);

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [portfolioItems, setPortfolioItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(PORTFOLIO_API_URL);

        if (!response.ok) {
          throw new Error(`Failed to fetch portfolio data: ${response.statusText}`);
        }

        const data = await response.json();
        setPortfolioItems(Array.isArray(data) ? data : data.projects || []);
      } catch (err) {
        setError(err.message || 'Failed to load portfolio data. Please try again later.');
        console.error('Portfolio fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolioData();
  }, []);

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'residential', label: 'Residential' },
    { id: 'commercial', label: 'Commercial' },
  ];

  const filteredItems =
    activeFilter === 'all'
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === activeFilter);

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
            <ErrorMessage message={error} onRetry={() => window.location.reload()} />
          </div>
        )}

        {/* Filter Buttons */}
        {!loading && !error && (
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveFilter(category.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeFilter === category.id
                    ? 'bg-primary text-white shadow-lg transform scale-105'
                    : 'bg-white text-brown hover:bg-primary hover:text-white shadow-md'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        )}

        {/* Portfolio Grid - Loading State */}
        {loading && <LoadingSkeletons />}

        {/* Portfolio Grid - Loaded State */}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => <PortfolioCard key={item.id} item={item} />)
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-brown text-lg">No projects found in this category.</p>
              </div>
            )}
          </div>
        )}

        {/* Stats Section */}
        <div className="mt-16 bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl md:text-3xl font-bold text-primary text-center mb-8">
            Our Impact in Numbers
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">150+</div>
              <div className="text-brown font-medium">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">98%</div>
              <div className="text-brown font-medium">Client Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">5</div>
              <div className="text-brown font-medium">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">25</div>
              <div className="text-brown font-medium">Awards Won</div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-primary text-white p-8 md:p-12 rounded-lg">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Start Your Project?</h2>
            <p className="text-lg mb-6 opacity-90">
              Let's create something extraordinary together. Get in touch to discuss your vision.
            </p>
            <button className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-secondary transition-colors duration-300">
              Start Your Project
            </button>
          </div>
        </div>

        {/* Process Section */}
        <div className="mt-16">
          <h2 className="text-2xl md:text-3xl font-bold text-primary text-center mb-8">
            Our Design Process
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-primary text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                1
              </div>
              <h3 className="font-bold text-brown mb-2">Discovery</h3>
              <p className="text-brown text-sm">
                Understanding your needs, lifestyle, and design preferences
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                2
              </div>
              <h3 className="font-bold text-brown mb-2">Design</h3>
              <p className="text-brown text-sm">
                Creating detailed plans and 3D visualizations of your space
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                3
              </div>
              <h3 className="font-bold text-brown mb-2">Development</h3>
              <p className="text-brown text-sm">
                Sourcing materials and coordinating with contractors
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                4
              </div>
              <h3 className="font-bold text-brown mb-2">Delivery</h3>
              <p className="text-brown text-sm">
                Final installation and styling of your transformed space
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
