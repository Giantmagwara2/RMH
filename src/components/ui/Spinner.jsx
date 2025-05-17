import React from 'react';
import PropTypes from 'prop-types';

const Spinner = ({ size = 'md', color = 'text-brand-primary', className = '' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };

  return (
    <svg
      className={`${sizeClasses[size]} animate-spin ${color} ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      role="status"
      aria-live="polite"
      aria-label="Loading"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v8H4z"
      ></path>
    </svg>
  );
};

Spinner.propTypes = {
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  color: PropTypes.string, // Expects a Tailwind text color class e.g., 'text-blue-500'
  className: PropTypes.string,
};

Spinner.defaultProps = {
  size: 'md',
  color: 'text-brand-primary', // Ensure this color is defined in your Tailwind config or is a standard color
  className: '',
};

Spinner.displayName = 'Spinner';

export default Spinner;
