// /src/components/ui/Stack.jsx
import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

export const Stack = ({
  children,
  gap = 'space-md', // Assumes 'space-md' translates to a valid Tailwind spacing class part
  direction = 'vertical',
  className,
  as = 'div', // New prop to define the element type
  ...props      // Collect other props to spread
}) => {
  const gapClass = direction === 'vertical' ? `space-y-${gap}` : `space-x-${gap}`;
  const flexDirection = direction === 'vertical' ? 'flex-col' : 'flex-row';
  const Component = as;

  return (
    <Component className={clsx('flex', flexDirection, gapClass, className)} role="group" {...props}>
      {children}
    </Component>
  );
};

Stack.propTypes = {
  children: PropTypes.node.isRequired,
  gap: PropTypes.string,
  direction: PropTypes.oneOf(['vertical', 'horizontal']),
  className: PropTypes.string,
  as: PropTypes.elementType,
};

Stack.defaultProps = {
  gap: 'space-md',
  direction: 'vertical',
  as: 'div',
};

Stack.displayName = 'Stack';