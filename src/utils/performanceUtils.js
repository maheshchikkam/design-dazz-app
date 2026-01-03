/**
 * Performance monitoring utilities
 * Tracks performance metrics and helps with optimization
 */

/**
 * Measures component render time
 * @param {string} componentName - Name of component
 * @returns {Function} Function to call when render completes
 */
export const measureComponentTime = (componentName) => {
  if (!window.performance) return () => {};

  const startTime = performance.now();

  return () => {
    const endTime = performance.now();
    const duration = endTime - startTime;

    if (duration > 1000) {
      console.warn(
        `Slow render detected: ${componentName} took ${duration.toFixed(2)}ms to render`
      );
    }
  };
};

/**
 * Reports Web Vitals metrics
 * Helps identify performance bottlenecks
 */
export const reportWebVitals = (onReport) => {
  if ('web-vital' in window) {
    try {
      import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
        getCLS(onReport);
        getFID(onReport);
        getFCP(onReport);
        getLCP(onReport);
        getTTFB(onReport);
      });
    } catch (error) {
      console.error('Failed to load web-vitals:', error);
    }
  }
};

/**
 * Debounce utility for performance optimization
 * @param {Function} func - Function to debounce
 * @param {number} delay - Debounce delay in ms
 * @returns {Function} Debounced function
 */
export const debounce = (func, delay = 300) => {
  let timeoutId;

  return function debounced(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

/**
 * Throttle utility for performance optimization
 * @param {Function} func - Function to throttle
 * @param {number} interval - Throttle interval in ms
 * @returns {Function} Throttled function
 */
export const throttle = (func, interval = 300) => {
  let lastRun = 0;

  return function throttled(...args) {
    const now = Date.now();
    if (now - lastRun >= interval) {
      func(...args);
      lastRun = now;
    }
  };
};
