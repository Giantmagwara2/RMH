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
    .map(([breakpoint, cols]) => `grid-cols-${breakpoint}-${cols}`)
    .join(' ');

  return (
    <div
      className={clsx(
        `grid grid-cols-${columns}`,
        gapClass,
        responsiveClasses, // Add responsive classes
        className
      )}
    >
      {children}
    </div>
  );
};

Grid.propTypes = {
  children: PropTypes.node.isRequired,
  columns: PropTypes.oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),
  gap: PropTypes.string,
  className: PropTypes.string,
  responsive: PropTypes.object, // Add prop type for responsive
};
