/**
 * Image handling utilities
 * Manages image loading, caching, and fallback logic
 */

/**
 * Preloads an image
 * @param {string} src - Image source URL
 * @returns {Promise<void>}
 */
export const preloadImage = (src) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = resolve;
    img.onerror = resolve; // Resolve even on error to not block
    img.src = src;
  });
};

/**
 * Validates image URL format
 * @param {string} url - URL to validate
 * @returns {boolean}
 */
export const isValidImageUrl = (url) => {
  try {
    new URL(url);
    return /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(url);
  } catch {
    return false;
  }
};

/**
 * Gets image alt text
 * @param {string} title - Project title
 * @returns {string}
 */
export const getImageAltText = (title) => {
  return title || 'Project image';
};
