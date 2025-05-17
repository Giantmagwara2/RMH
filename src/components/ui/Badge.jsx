import React from 'react';
import PropTypes from 'prop-types';

// Define the Badge component
const Badge = ({
  children,
  variant = 'default',
  size = 'md',
  className = '',
  'aria-label': ariaLabel,
  ...props
}) => {
  // Define styles for different variants
  const variantStyles = {
    default: 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200',
    primary: 'bg-blue-500 text-white dark:bg-blue-600',
    success: 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100',
    warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100',
    error: 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100',
    info: 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100',
  };

  // Define styles for different sizes
  const sizeStyles = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-3 py-0.5', // Default size
    lg: 'text-base px-4 py-1',
  };

  // Apply styles based on variant and size
  const variantStyle = variantStyles[variant] || variantStyles.default;
  const sizeStyle = sizeStyles[size] || sizeStyles.md;

  return ( // Return the Badge component with appropriate styling
    <span 
      className={`inline-flex items-center rounded-full font-medium ${variantStyle} ${sizeStyle} ${className}`}
      aria-label={ariaLabel} // Set the aria-label for accessibility
      {...props} // Apply any additional props
    >
      {children} {/* Render the content within the badge */}
    </span>
  );
};

// Define prop types for the Badge component
Badge.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['default', 'primary', 'success', 'warning', 'error', 'info']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  className: PropTypes.string,
  'aria-label': PropTypes.string,
};

export default Badge;
