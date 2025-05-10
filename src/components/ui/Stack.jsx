// /src/components/ui/Stack.jsx
import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

export const Stack = ({ children, gap = 'space-md', className }) => {
  const gapClass = `space-y-${gap}`;
  return (
    <div className={clsx('flex flex-col', gapClass, className)}>
      {children}
    </div>
  );
};

Stack.propTypes = {
  children: PropTypes.node.isRequired,
  gap: PropTypes.string,
  className: PropTypes.string,
};