import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

export const GridItem = ({
  children,
  colSpan = 1,
  className,
  responsive = {}, // New prop for responsive column spans
  as = 'div',      // New prop to define the element type
  ...props         // Collect other props to spread
}) => {
  const responsiveClasses = Object.entries(responsive)
    .map(([breakpoint, span]) => `${breakpoint}:col-span-${span}`)
    .join(' ');

  const Component = as;

  return (
    <Component
      className={clsx(`col-span-${colSpan}`, responsiveClasses, className)}
      {...props} // Spread additional props onto the element
    >
      {children}
    </Component>
  );
};

GridItem.propTypes = {
  children: PropTypes.node.isRequired,
  colSpan: PropTypes.oneOfType([
    PropTypes.number, // For default span
    PropTypes.object  // For responsive spans e.g., { default: 1, sm: 2 }
  ]),
  className: PropTypes.string,
  responsive: PropTypes.object, // New prop type for responsive column spans
  as: PropTypes.elementType,
};

GridItem.displayName = 'GridItem';
