import React from 'react';

/**
 * LoadingSpinner Component
 * Reusable loading indicator with optional custom message
 */
const LoadingSpinner = ({ message = 'Loading...', fullScreen = false }) => {
  const containerClass = fullScreen
    ? 'fixed inset-0 flex items-center justify-center bg-secondary'
    : 'flex items-center justify-center py-12';

  return (
    <div className={containerClass}>
      <div className="text-center">
        <div className="inline-block">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
        </div>
        {message && <p className="mt-4 text-brown font-medium">{message}</p>}
      </div>
    </div>
  );
};

export default LoadingSpinner;
