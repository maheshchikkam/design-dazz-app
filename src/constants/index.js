/**
 * Application Constants
 * Centralized configuration for API endpoints, route paths, and UI constants
 */

// API Configuration
export const API_CONFIG = {
  PORTFOLIO_URL:
    'https://pub-20461b09c2564483b3f614a9f86ce669.r2.dev/project-details.json',
  TIMEOUT: 10000, // 10 seconds
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000, // 1 second
};

// Route Paths
export const ROUTES = {
  HOME: '/',
  PORTFOLIO: '/portfolio',
  PORTFOLIO_DETAIL: '/portfolio/:projectId',
  ABOUT: '/about',
  CONTACT: '/contact',
};

// Project Categories
export const PROJECT_CATEGORIES = {
  RESIDENTIAL: 'residential',
  COMMERCIAL: 'commercial',
};

export const CATEGORY_LABELS = {
  residential: 'Residential',
  commercial: 'Commercial',
};

// UI Constants
export const UI = {
  LOADING_TIMEOUT: 300,
  ANIMATION_DURATION: 300,
  SKELETON_COUNT: 6,
};

// CSS Classes
export const CSS_CLASSES = {
  ICON_ACTIVE: 'rotate-90 scale-110',
  NAV_ACTIVE: 'text-primary font-semibold',
  NAV_INACTIVE: 'text-brown hover:text-primary transition-colors duration-200',
  BUTTON_PRIMARY: 'bg-primary text-white hover:bg-brown',
  BUTTON_SECONDARY: 'bg-secondary text-brown hover:bg-opacity-80',
};

// Error Messages
export const ERROR_MESSAGES = {
  FETCH_FAILED: 'Failed to load portfolio data. Please try again later.',
  PROJECT_NOT_FOUND: 'Project not found',
  IMAGE_LOAD_FAILED: 'Image failed to load',
  NETWORK_ERROR: 'Network error. Please check your connection.',
};

// Local Storage Keys
export const STORAGE_KEYS = {
  PORTFOLIO_CACHE: 'portfolio_cache',
  CACHE_TIMESTAMP: 'portfolio_cache_timestamp',
  CACHE_DURATION: 3600000, // 1 hour
};
