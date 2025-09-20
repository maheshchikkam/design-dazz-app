export const portfolioItems = [
  {
    id: 1,
    projectFolder: '/images/project-1',
    title: 'Modern Home Design',
    category: 'residential',
    location: 'Marina Skies, HYD',
    year: '2025',
    budget: '20,000',
    description: 'Complete design of a 1200 sq ft living space with contemporary design elements.',
    tags: ['Modern', 'Minimalist', 'Living Room'],
  },
  {
    id: 2,
    projectFolder: '/images/project-2',
    title: 'Nithins Room',
    category: 'residential',
    location: 'Banglore, KA',
    year: '2025',
    budget: '20,000',
    description: 'Complete design of a 1200 sq ft living space with contemporary design elements.',
    tags: ['Modern', 'Minimalist', 'Living Room'],
  },
];

export const getProjectById = (id) => portfolioItems.find((p) => p.id === Number(id));
