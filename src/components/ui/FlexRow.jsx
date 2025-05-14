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
    <div
      className={clsx(
        'flex flex-row',
        gapClass,
        justifyClass,
        alignClass,
        'transition-all duration-300 ease-in-out', // Smooth transitions for layout changes
        className
      )}
    >
      {children}
    </div>
  );
};

FlexRow.propTypes = {
  children: PropTypes.node.isRequired,
  gap: PropTypes.string,
  justifyContent: PropTypes.string,
  alignItems: PropTypes.string,
  className: PropTypes.string,
  customGap: PropTypes.string,
};

export default FlexRow;