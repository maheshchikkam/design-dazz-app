import { Component } from 'react';
import Button from './Button';

/**
 * Error Boundary Component
 * Catches JavaScript errors anywhere in the child component tree
 * and logs error information to help with debugging
 */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(err) {
    return { hasError: true, error: err };
  }

  componentDidCatch(err, errorInfo) {
    // Log error for debugging purposes
    console.error('Error Boundary caught an error:', errorInfo);

    this.setState({
      error: err,
      errorInfo,
    });

    // Could be extended to send error to external error tracking service
    // e.g., Sentry, LogRocket
    if (window.__APP_CONFIG__?.errorTracking) {
      // reportErrorToService(err, errorInfo);
    }
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-secondary flex items-center justify-center px-4">
          <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
            <div className="mb-4">
              <svg
                className="w-12 h-12 text-red-500 mx-auto"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>

            <h1 className="text-2xl font-bold text-center text-primary mb-4">
              Oops! Something went wrong
            </h1>

            <p className="text-gray-600 text-center mb-4">
              We encountered an unexpected error. Please try refreshing the page or going back to
              the home page.
            </p>

            {this.state.error && (
              <details className="mb-6 p-4 bg-gray-100 rounded text-sm text-gray-700">
                <summary className="cursor-pointer font-semibold mb-2">Error Details</summary>
                <p className="font-mono text-xs break-words">{this.state.error.toString()}</p>
                {this.state.errorInfo && (
                  <p className="font-mono text-xs break-words mt-2">
                    {this.state.errorInfo.componentStack}
                  </p>
                )}
              </details>
            )}

            <div className="flex gap-3">
              <Button
                variant="primary"
                size="full"
                onClick={this.handleReset}
                className="flex-1"
              >
                Try Again
              </Button>
              <Button
                variant="outline"
                size="full"
                onClick={() => (window.location.href = '/')}
                className="flex-1"
              >
                Go Home
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
