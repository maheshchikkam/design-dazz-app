import { useState } from 'react';
import { FaExternalLinkAlt, FaMapMarkerAlt, FaCalendarAlt, FaDollarSign } from 'react-icons/fa';

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState('all');

  // Sample portfolio data - replace with actual project data
  const portfolioItems = [
    {
      id: 1,
      title: 'Modern Living Room Transformation',
      category: 'residential',
      location: 'Manhattan, NY',
      year: '2024',
      budget: '$45,000',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop',
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
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop',
      description:
        'Sophisticated lobby design for a boutique hotel featuring custom furniture and lighting.',
      tags: ['Luxury', 'Commercial', 'Hospitality'],
    },
    {
      id: 3,
      title: 'Cozy Bedroom Retreat',
      category: 'residential',
      location: 'Queens, NY',
      year: '2023',
      budget: '$25,000',
      image: 'https://images.unsplash.com/photo-1540518614846-7eded47ee8b8?w=800&h=600&fit=crop',
      description:
        'Warm and inviting master bedroom design with natural textures and calming colors.',
      tags: ['Cozy', 'Bedroom', 'Natural'],
    },
    {
      id: 4,
      title: 'Corporate Office Redesign',
      category: 'commercial',
      location: 'Manhattan, NY',
      year: '2023',
      budget: '$85,000',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop',
      description:
        'Modern office space promoting collaboration and productivity with flexible layouts.',
      tags: ['Corporate', 'Modern', 'Workspace'],
    },
    {
      id: 5,
      title: 'Scandinavian Kitchen Design',
      category: 'residential',
      location: 'Bronx, NY',
      year: '2023',
      budget: '$55,000',
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop',
      description: 'Clean, functional kitchen design inspired by Scandinavian aesthetics.',
      tags: ['Scandinavian', 'Kitchen', 'Functional'],
    },
    {
      id: 6,
      title: 'Boutique Restaurant Interior',
      category: 'commercial',
      location: 'Staten Island, NY',
      year: '2024',
      budget: '$95,000',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop',
      description: 'Intimate dining space with warm lighting and elegant finishes.',
      tags: ['Restaurant', 'Intimate', 'Elegant'],
    },
  ];

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

        {/* Filter Buttons */}
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

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group"
            >
              {/* Image Container */}
              <div className="relative overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-300 flex items-center justify-center">
                  <FaExternalLinkAlt className="text-white text-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Category Badge */}
                <div className="absolute top-4 right-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      item.category === 'residential'
                        ? 'bg-primary text-white'
                        : 'bg-brown text-white'
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
                  <div className="flex items-center text-brown text-sm">
                    <FaDollarSign className="mr-2 text-primary" />
                    {item.budget}
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {item.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-secondary text-brown text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* View Project Button */}
                <button className="w-full bg-primary text-white py-2 rounded-lg hover:bg-brown transition-colors duration-300 font-medium">
                  View Project Details
                </button>
              </div>
            </div>
          ))}
        </div>

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
