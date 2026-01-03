import { useState, useEffect, useCallback, useMemo } from 'react';
import { PortfolioContext } from './PortfolioContextDef';
import { fetchWithRetry, normalizePortfolioData } from '../utils/apiClient';
import {
  getCachedPortfolio,
  setPortfolioCache,
  clearPortfolioCache,
} from '../utils/cacheUtils';
import { getErrorMessage, logError } from '../utils/errorUtils';
import { API_CONFIG } from '../constants';

/**
 * PortfolioProvider Component
 * Manages portfolio data fetching, caching, and state management
 */
export const PortfolioProvider = ({ children }) => {
  const [portfolioItems, setPortfolioItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCached, setIsCached] = useState(false);

  /**
   * Fetches portfolio data with caching and retry logic
   */
  const fetchPortfolioData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Try to use cached data first
      const cached = getCachedPortfolio();
      if (cached) {
        setPortfolioItems(cached);
        setIsCached(true);
        setLoading(false);
        return;
      }

      // Fetch from API with retry logic
      const data = await fetchWithRetry(API_CONFIG.PORTFOLIO_URL);
      const normalized = normalizePortfolioData(data);

      if (!Array.isArray(normalized) || normalized.length === 0) {
        throw new Error('No portfolio data available');
      }

      setPortfolioItems(normalized);
      setIsCached(false);

      // Cache the data
      setPortfolioCache(normalized);
    } catch (err) {
      const errorMessage = getErrorMessage(err);
      setError(errorMessage);
      logError(err, 'PortfolioProvider.fetchPortfolioData');

      // Try fallback cache even if fetch fails
      const fallbackCache = getCachedPortfolio();
      if (fallbackCache) {
        setPortfolioItems(fallbackCache);
        setIsCached(true);
        setError(null); // Clear error if we have cached data
      }
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Clears portfolio cache and refetches data
   */
  const clearAndRefetch = useCallback(async () => {
    clearPortfolioCache();
    await fetchPortfolioData();
  }, [fetchPortfolioData]);

  // Fetch data on component mount
  useEffect(() => {
    fetchPortfolioData();
  }, [fetchPortfolioData]);

  // Memoize context value to prevent unnecessary re-renders
  const value = useMemo(
    () => ({
      portfolioItems,
      loading,
      error,
      isCached,
      refetch: fetchPortfolioData,
      clearAndRefetch,
    }),
    [portfolioItems, loading, error, isCached, fetchPortfolioData, clearAndRefetch]
  );

  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  );
};
