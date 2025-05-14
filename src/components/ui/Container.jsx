import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

export const Container = ({ children, className }) => {
  return (
    <div
      className={clsx(
        'mx-auto px-space-md sm:px-space-lg md:px-space-xl w-full max-w-screen-xl',
        'transition-all duration-300 ease-in-out', // Smooth transitions for layout changes
        className
      )}
      aria-label="Container"
    >
      {children}
    </div>
  );
};

Container.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Container;
