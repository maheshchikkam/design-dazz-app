/**
 * API Client with retry logic and error handling
 * Handles all API requests with consistent error management
 */

import { API_CONFIG } from '../constants';

/**
 * Fetches data with retry logic
 * @param {string} url - The URL to fetch from
 * @param {number} retries - Number of retry attempts
 * @returns {Promise<any>} The parsed JSON response
 * @throws {Error} If all retry attempts fail
 */
export const fetchWithRetry = async (url, retries = API_CONFIG.RETRY_ATTEMPTS) => {
  let lastError;

  for (let i = 0; i < retries; i++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT);

      const response = await fetch(url, { signal: controller.signal });
      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      lastError = error;

      // Don't retry on abort or parse errors
      if (error.name === 'AbortError' && i < retries - 1) {
        await new Promise((resolve) =>
          setTimeout(resolve, API_CONFIG.RETRY_DELAY * (i + 1))
        );
        continue;
      }

      if (i === retries - 1) {
        break;
      }

      // Exponential backoff before retry
      await new Promise((resolve) =>
        setTimeout(resolve, API_CONFIG.RETRY_DELAY * Math.pow(2, i))
      );
    }
  }

  throw new Error(lastError?.message || 'Failed to fetch data after multiple attempts');
};

/**
 * Normalizes portfolio data
 * @param {any} data - Raw data from API
 * @returns {Array} Normalized array of projects
 */
export const normalizePortfolioData = (data) => {
  if (!data) return [];
  if (Array.isArray(data)) return data;
  if (data.projects && Array.isArray(data.projects)) return data.projects;
  return [];
};

/**
 * Finds a project by ID
 * @param {Array} projects - Array of projects
 * @param {string|number} projectId - Project ID to find
 * @returns {Object|null} Found project or null
 */
export const findProjectById = (projects, projectId) => {
  return projects.find((p) => String(p.id) === String(projectId)) || null;
};
