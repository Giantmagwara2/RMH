import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

const Container = ({ children, className, as = 'div', ...props }) => {
  const Component = as; // Use the 'as' prop to determine the element type
  return (
    <Component
      className={clsx('mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8',
        'transition-all duration-300 ease-in-out', // Smooth transitions for layout changes
        className
      )}
      aria-label="Container"
    >
      {children}
    </Component>
  ); 
};

Container.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  as: PropTypes.elementType, // Allow changing the rendered element type
};

Container.displayName = 'Container'; // Helps with debugging in React DevTools

export default Container;
