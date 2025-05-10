// /src/components/ui/FieldSet.jsx
import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

export const FieldSet = ({ legend, description, children, className, ...rest }) => {
  return (
    <fieldset
      className={clsx(
        'border border-neutrals-border rounded-md p-space-md space-y-space-sm',
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
        <p className="text-xs text-neutrals-muted mb-space-sm">{description}</p>
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
};
