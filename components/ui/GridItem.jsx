import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

export const GridItem = ({ children, colSpan = 1, className }) => {
  return (
    <div className={clsx(`col-span-${colSpan}`, className)}>
      {children}
    </div>
  );
};

GridItem.propTypes = {
  children: PropTypes.node.isRequired,
  colSpan: PropTypes.oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),
  className: PropTypes.string,
};
