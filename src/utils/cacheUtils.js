/**
 * Client-side caching utilities
 * Manages local storage for portfolio data
 */

import { STORAGE_KEYS } from '../constants';

/**
 * Gets cached portfolio data
 * @returns {Array|null} Cached data or null if expired/missing
 */
export const getCachedPortfolio = () => {
  try {
    const cached = localStorage.getItem(STORAGE_KEYS.PORTFOLIO_CACHE);
    const timestamp = localStorage.getItem(STORAGE_KEYS.CACHE_TIMESTAMP);

    if (!cached || !timestamp) return null;

    // Check if cache has expired
    const age = Date.now() - parseInt(timestamp, 10);
    if (age > STORAGE_KEYS.CACHE_DURATION) {
      clearPortfolioCache();
      return null;
    }

    return JSON.parse(cached);
  } catch (error) {
    console.error('Cache retrieval error:', error);
    return null;
  }
};

/**
 * Sets portfolio data in cache
 * @param {Array} data - Portfolio data to cache
 */
export const setPortfolioCache = (data) => {
  try {
    localStorage.setItem(STORAGE_KEYS.PORTFOLIO_CACHE, JSON.stringify(data));
    localStorage.setItem(STORAGE_KEYS.CACHE_TIMESTAMP, Date.now().toString());
  } catch (error) {
    console.error('Cache storage error:', error);
  }
};

/**
 * Clears portfolio cache
 */
export const clearPortfolioCache = () => {
  try {
    localStorage.removeItem(STORAGE_KEYS.PORTFOLIO_CACHE);
    localStorage.removeItem(STORAGE_KEYS.CACHE_TIMESTAMP);
  } catch (error) {
    console.error('Cache clear error:', error);
  }
};

/**
 * Gets cache age in milliseconds
 * @returns {number|null} Cache age or null if no cache
 */
export const getCacheAge = () => {
  try {
    const timestamp = localStorage.getItem(STORAGE_KEYS.CACHE_TIMESTAMP);
    if (!timestamp) return null;
    return Date.now() - parseInt(timestamp, 10);
  } catch {
    return null;
  }
};
