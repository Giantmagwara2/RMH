import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

export const Grid = ({
  children,
  columns = 12,
  gap = 'space-md',
  className,
  responsive = {}, // New prop for responsive column configurations
}) => {
  const gapClass = `gap-${gap}`;

  const responsiveClasses = Object.entries(responsive)
    .map(([breakpoint, cols]) => `${breakpoint}:grid-cols-${cols}`)
    .join(' ');

  return (
    <div
      className={clsx(
        `grid grid-cols-${columns}`,
        gapClass,
        responsiveClasses,
        'w-full',
        'transition-all duration-300 ease-in-out', // Smooth transitions for layout changes
        className
      )}
    >
      {children}
    </div>
  );
};

Grid.propTypes = {
  children: PropTypes.node.isRequired,
  columns: PropTypes.number,
  gap: PropTypes.string,
  className: PropTypes.string,
  responsive: PropTypes.object, // Responsive column configurations
};

export default Grid;
