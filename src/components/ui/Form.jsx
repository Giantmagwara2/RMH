// /src/components/ui/Form.jsx
import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

export const Form = ({
  children,
  onSubmit,
  onReset,
  gap = 'md',
  direction = 'vertical',
  align = 'start',
  className,
  noValidate = true,
  ...props
}) => {
  const directionClass = direction === 'horizontal' ? 'flex-row' : 'flex-col';
  const alignClass = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
  }[align];

  return (
    <form
      onSubmit={onSubmit}
      onReset={onReset}
      noValidate={noValidate}
      className={clsx(
        'flex',
        directionClass,
        alignClass,
        `gap-${gap}`,
        className
      )}
      {...props}
    >
      {children}
    </form>
  );
};

Form.propTypes = {
  children: PropTypes.node.isRequired,
  onSubmit: PropTypes.func,
  onReset: PropTypes.func,
  gap: PropTypes.string,
  direction: PropTypes.oneOf(['vertical', 'horizontal']),
  align: PropTypes.oneOf(['start', 'center', 'end']),
  className: PropTypes.string,
  noValidate: PropTypes.bool,
};
