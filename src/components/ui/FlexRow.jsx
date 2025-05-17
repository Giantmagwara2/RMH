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
  ...props // Added spread props
}) => {
  const gapClass = customGap || `gap-${gap}`;
  const justifyClass = justifyContent ? `justify-${justifyContent}` : 'justify-start'; // Default to justify-start
  const alignClass = alignItems ? `items-${alignItems}` : 'items-start'; // Default to items-start

  return (
    <div
      className={clsx(
        'flex flex-row',
        gapClass,
        justifyClass,
        alignClass,
        'transition-all duration-300 ease-in-out', // Smooth transitions for layout changes
        className,
        props.style // Allow custom styles to override Tailwind classes
      )}
    >
      {children}
    </div>
  );
};

FlexRow.propTypes = {
  children: PropTypes.node.isRequired,
  gap: PropTypes.string,
  justifyContent: PropTypes.oneOf(['start', 'end', 'center', 'between', 'around', 'evenly']),
  alignItems: PropTypes.oneOf(['start', 'end', 'center', 'baseline', 'stretch']),
  className: PropTypes.string,
  customGap: PropTypes.string,
  style: PropTypes.object,
};

FlexRow.displayName = 'FlexRow';
export default FlexRow;