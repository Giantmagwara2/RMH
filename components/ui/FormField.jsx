import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

export const FormField = ({
  id,
  label,
  children,
  helperText,
  error,
  required = false,
}) => {
  const helperId = helperText ? `${id}-helper` : undefined;
  const errorId = error ? `${id}-error` : undefined;

  const childWithProps = React.cloneElement(children, {
    id,
    'aria-describedby': error ? errorId : helperId,
    'aria-invalid': !!error,
  });

  return (
    <div className="flex flex-col space-y-space-xs">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-text-secondary">
          {label}
          {required && <span className="ml-1 text-error-text">*</span>}
        </label>
      )}
      {childWithProps}
      {helperText && !error && (
        <p id={helperId} className="text-sm text-text-tertiary">
          {helperText}
        </p>
      )}
      {error && (
        <p id={errorId} className="text-sm text-error-text">
          {error}
        </p>
      )}
    </div>
  );
};

FormField.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  children: PropTypes.element.isRequired,
  helperText: PropTypes.string,
  error: PropTypes.string,
  required: PropTypes.bool,
};
