import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

export const Grid = ({
  children,
  columns = 12,
  gap = 'space-md',
  className,
  responsive = {}, // New prop for responsive column configurations
  as = 'div', // New prop to define the element type
  ...props // Collect other props to spread
}) => {
  const gapClass = `gap-${gap}`;

  const responsiveClasses = Object.entries(responsive)
    .map(([breakpoint, cols]) => `${breakpoint}:grid-cols-${cols}`)
    .join(' ');

  const Component = as;

  return (
    <Component
      className={clsx(
        `grid grid-cols-${columns}`,
        gapClass,
        responsiveClasses,
        'w-full',
        'transition-all duration-300 ease-in-out', // Smooth transitions for layout changes
        className
      )}
      {...props} // Spread additional props onto the element
    >
      {children}
    </Component>
  );
};

Grid.propTypes = {
  children: PropTypes.node.isRequired,
  columns: PropTypes.number, // Typically 1-12 for standard Tailwind, or as configured
  gap: PropTypes.string,
  className: PropTypes.string,
  responsive: PropTypes.object, // Responsive column configurations
  as: PropTypes.elementType,
};

Grid.displayName = 'Grid';

export default Grid;
