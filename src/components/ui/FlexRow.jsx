// /src/components/ui/FlexRow.jsx
import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

export const FlexRow = ({
  children,
  gap = 'space-md',
  justifyContent,
  alignItems,
  className,
  customGap,
}) => {
  const gapClass = customGap ? customGap : `gap-${gap}`;
  const justifyClass = justifyContent ? `justify-${justifyContent}` : '';
  const alignClass = alignItems ? `items-${alignItems}` : '';

  return (
    <div className={clsx('flex flex-row', gapClass, justifyClass, alignClass, className)}>
      {children}
    </div>
  );
};

FlexRow.propTypes = {
  children: PropTypes.node.isRequired,
  gap: PropTypes.string,
  justifyContent: PropTypes.oneOf(['start', 'center', 'end', 'between', 'around', 'evenly']),
  alignItems: PropTypes.oneOf(['start', 'center', 'end', 'baseline', 'stretch']),
  className: PropTypes.string,
  customGap: PropTypes.string,
};