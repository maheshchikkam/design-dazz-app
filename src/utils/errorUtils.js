/**
 * Error handling utilities
 */

import { ERROR_MESSAGES } from '../constants';

/**
 * Gets user-friendly error message
 * @param {Error|string} error - Error object or message
 * @returns {string} User-friendly error message
 */
export const getErrorMessage = (error) => {
  if (!error) return ERROR_MESSAGES.FETCH_FAILED;

  if (typeof error === 'string') return error;

  if (error.message) {
    // Network errors
    if (error.message.includes('AbortError') || error.message.includes('timeout')) {
      return 'Request timed out. Please try again.';
    }
    // HTTP errors
    if (error.message.includes('HTTP')) {
      return 'Server error. Please try again later.';
    }
    return error.message;
  }

  return ERROR_MESSAGES.FETCH_FAILED;
};

/**
 * Logs error with context
 * @param {Error} error - Error object
 * @param {string} context - Context where error occurred
 */
export const logError = (error, context = '') => {
  const timestamp = new Date().toISOString();
  const message = `[${timestamp}] Error in ${context}`;

  console.error(message, error);

  // Can be extended for error tracking services
  // e.g., Sentry, LogRocket
  if (window.__APP_CONFIG__?.errorTracking) {
    // sendToErrorTracker(error, context);
  }
};

/**
 * Validates data format
 * @param {any} data - Data to validate
 * @param {string} type - Expected type
 * @returns {boolean}
 */
export const isValidData = (data, type = 'array') => {
  if (type === 'array') return Array.isArray(data) && data.length > 0;
  if (type === 'object') return data && typeof data === 'object' && Object.keys(data).length > 0;
  return !!data;
};
