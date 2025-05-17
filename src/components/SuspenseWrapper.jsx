import React, { Suspense } from 'react';
import PropTypes from 'prop-types';

// A simple loading fallback component
const DefaultFallback = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="text-lg text-center text-gray-600 dark:text-gray-300">
      {/* Optionally, add a loading spinner or animation here */}
      Loading... 
    </div>
  </div>
);

export function SuspenseWrapper({ children, fallback = <DefaultFallback /> }) {
  return <Suspense fallback={fallback}>{children}</Suspense>;
}

SuspenseWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  fallback: PropTypes.node,
};
