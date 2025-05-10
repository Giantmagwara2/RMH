import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

export const Grid = ({ children, columns = 12, gap = 'space-md', className }) => {
  const gapClass = `gap-${gap}`;

  return (
    <div
      className={clsx(
        `grid grid-cols-${columns}`,
        gapClass,
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
};
