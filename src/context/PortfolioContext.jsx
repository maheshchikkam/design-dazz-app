import { createContext, useState, useEffect, useCallback } from 'react';

export const PortfolioContext = createContext();

const PORTFOLIO_API_URL =
  'https://pub-20461b09c2564483b3f614a9f86ce669.r2.dev/project-details.json';

export const PortfolioProvider = ({ children }) => {
  const [portfolioItems, setPortfolioItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPortfolioData = useCallback(async () => {
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
  }, []);

  // Fetch data on component mount
  useEffect(() => {
    fetchPortfolioData();
  }, [fetchPortfolioData]);

  const value = {
    portfolioItems,
    loading,
    error,
    refetch: fetchPortfolioData,
  };

  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  );
};
