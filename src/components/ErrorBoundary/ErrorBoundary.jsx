// src/components/ErrorBoundary/ErrorBoundary.jsx
import React from 'react';
import PropTypes from 'prop-types';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorId: null };
  }

  static getDerivedStateFromError(error) {
    // Log error to monitoring service but don't expose details to user
    console.error('ErrorBoundary caught error:', error);
    return { hasError: true, errorId: Date.now() };
  }

  componentDidCatch(error, errorInfo) {
    // Log error details to an external monitoring service
    if (this.props.logError) {
      this.props.logError({ error, errorInfo, errorId: this.state.errorId });
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
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center bg-red-50 dark:bg-red-900">
          <h2 className="mb-4 text-3xl font-bold text-red-600 dark:text-red-300">
            Oops! Something went wrong.
          </h2>
          <p className="mb-6 text-lg text-red-500 dark:text-red-400">
            We apologize for the inconvenience. Please try refreshing the page or return to the homepage.
          </p>
          <div className="flex space-x-4">
            <button
              onClick={this.handleReload}
              className="px-6 py-3 text-white transition-colors duration-300 bg-red-600 rounded-md hover:bg-red-700"
            >
              Refresh Page
            </button>
            <button
              onClick={this.handleGoHome}
              className="px-6 py-3 text-gray-800 transition-colors duration-300 bg-gray-200 rounded-md dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
            >
              Go to Homepage
            </button>
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
  navigateToHome: PropTypes.func, // Optional function to navigate to the homepage
};

export default ErrorBoundary;