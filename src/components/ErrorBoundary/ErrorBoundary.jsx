// src/components/ErrorBoundary/ErrorBoundary.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { ExclamationTriangleIcon, ArrowPathIcon, HomeIcon } from '@heroicons/react/24/outline';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null, errorId: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    // We don't log here directly to avoid side effects in this static method.
    // The actual logging happens in componentDidCatch.
    console.error('ErrorBoundary caught error:', error);
    return { hasError: true, errorId: Date.now() };
  }

  componentDidCatch(error, errorInfo) {
    // Log error details to an external monitoring service
    if (this.props.logError) {
      // Pass the full error and errorInfo objects
      this.props.logError({ error, errorInfo, componentStack: errorInfo.componentStack, errorId: this.state.errorId });
    }
  }

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    if (this.props.navigateToHome) {
      this.props.navigateToHome();
    } else {
      window.location.href = '/';
    }
  };

  render() {
    const { fallback } = this.props;
    const { errorId } = this.state;

    if (this.state.hasError) {
      if (fallback) {
        return React.cloneElement(fallback, {
          error: this.state.error,
          errorInfo: this.state.errorInfo,
          errorId: this.state.errorId,
          onReload: this.handleReload,
          onGoHome: this.handleGoHome,
        });
      }

      return (
        <div role="alert" className="flex flex-col items-center justify-center min-h-screen p-6 text-center bg-gradient-to-br from-red-50 to-orange-100 dark:from-red-900 dark:to-orange-800">
          <div className="p-8 bg-white rounded-lg shadow-2xl dark:bg-zinc-800 max-w-lg w-full">
            <ExclamationTriangleIcon className="w-16 h-16 mx-auto mb-6 text-red-500 dark:text-red-400" />
            <h1 className="mb-3 text-3xl font-bold text-red-700 dark:text-red-300">
              Oops! Something Went Wrong.
            </h1>
            <p className="mb-6 text-gray-600 dark:text-gray-400">
              We're sorry for the inconvenience. Our team has been notified.
              Please try refreshing the page, or if the problem persists, contact support.
            </p>
            {errorId && (
              <p className="mb-6 text-sm text-gray-500 dark:text-gray-500">
                Error ID: <code className="px-1 py-0.5 bg-gray-200 dark:bg-zinc-700 rounded text-xs">{errorId}</code>
              </p>
            )}
            <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4 sm:justify-center">
              <button
                onClick={this.handleReload}
                className="inline-flex items-center justify-center px-6 py-3 font-medium text-white transition-colors duration-150 bg-red-600 rounded-md shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-800"
              >
                <ArrowPathIcon className="w-5 h-5 mr-2" /> Refresh Page
              </button>
              <button
                onClick={this.handleGoHome}
                className="inline-flex items-center justify-center px-6 py-3 font-medium text-gray-700 transition-colors duration-150 bg-gray-200 rounded-md shadow-md dark:bg-zinc-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-zinc-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-800"
              >
                <HomeIcon className="w-5 h-5 mr-2" /> Go to Homepage
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
  logError: PropTypes.func, // Optional function to log errors to an external service
  navigateToHome: PropTypes.func, // Optional function to navigate to the homepage (e.g., using react-router's navigate)
  fallback: PropTypes.element, // Optional custom fallback UI component
};

export default ErrorBoundary;