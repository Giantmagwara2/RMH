// /src/components/ui/Stack.jsx
import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

export const Stack = ({ children, gap = 'space-md', direction = 'vertical', className }) => {
  const gapClass = direction === 'vertical' ? `space-y-${gap}` : `space-x-${gap}`;
  const flexDirection = direction === 'vertical' ? 'flex-col' : 'flex-row';

  return (
    <div className={clsx('flex', flexDirection, gapClass, className)} role="group">
      {children}
    </div>
  );
};

Stack.propTypes = {
  children: PropTypes.node.isRequired,
  gap: PropTypes.string,
  direction: PropTypes.oneOf(['vertical', 'horizontal']),
  className: PropTypes.string,
};