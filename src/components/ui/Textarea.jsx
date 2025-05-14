// Textarea.jsx
import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

export const Textarea = ({
  id,
  label,
  value,
  onChange,
  placeholder = '',
  rows = 4,
  disabled = false,
  error = '',
  name,
  required = false,
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedby,
  maxLength,
  borderColor = 'border-neutrals-border',
  backgroundColor = 'bg-white',
}) => {
  const baseStyle = 'w-full px-space-md py-space-sm border rounded-md text-base transition duration-300';
  const errorStyle = error ? 'border-error-border focus:border-error-border' : '';
  const disabledStyle = disabled ? 'text-text-disabled bg-neutrals-surface' : '';

  return (
    <div className="flex flex-col space-y-space-xs">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-text-secondary">
          {label}
        </label>
      )}
      <textarea
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        rows={rows}
        className={clsx(baseStyle, borderColor, backgroundColor, errorStyle, disabledStyle, 'resize-none')}
        required={required}
        aria-label={ariaLabel}
        aria-describedby={ariaDescribedby}
        maxLength={maxLength}
        aria-live="polite"
      />
      {error && <span className="text-sm text-error-text" aria-live="assertive">{error}</span>}
    </div>
  );
};

Textarea.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  rows: PropTypes.number,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  required: PropTypes.bool,
  'aria-label': PropTypes.string,
  'aria-describedby': PropTypes.string,
  maxLength: PropTypes.number,
  borderColor: PropTypes.string,
  backgroundColor: PropTypes.string,
};