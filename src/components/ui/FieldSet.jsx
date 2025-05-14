// /src/components/ui/FieldSet.jsx
import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

export const FieldSet = ({
  legend,
  description,
  children,
  className,
  borderColor = 'border-neutrals-border',
  backgroundColor = 'bg-white',
  ...rest
}) => {
  return (
    <fieldset
      className={clsx(
        `border rounded-md p-space-md space-y-space-sm ${borderColor} ${backgroundColor}`,
        className
      )}
      {...rest}
    >
      {legend && (
        <legend className="text-sm font-medium text-neutrals-strong mb-space-xs">
          {legend}
        </legend>
      )}
      {description && (
        <p className="text-xs text-neutrals-muted mb-space-sm" aria-describedby="fieldset-description">
          {description}
        </p>
      )}
      {children}
    </fieldset>
  );
};

FieldSet.propTypes = {
  legend: PropTypes.string,
  description: PropTypes.string,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  borderColor: PropTypes.string,
  backgroundColor: PropTypes.string,
};
