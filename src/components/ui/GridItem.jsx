import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

export const GridItem = ({
  children,
  colSpan = 1,
  className,
  responsive = {}, // New prop for responsive column spans
}) => {
  const responsiveClasses = Object.entries(responsive)
    .map(([breakpoint, span]) => `col-span-${breakpoint}-${span}`)
    .join(' ');

  return (
    <div className={clsx(`col-span-${colSpan}`, responsiveClasses, className)}>
      {children}
    </div>
  );
};

GridItem.propTypes = {
  children: PropTypes.node.isRequired,
  colSpan: PropTypes.oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),
  className: PropTypes.string,
  responsive: PropTypes.object, // New prop type for responsive column spans
};
