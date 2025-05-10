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
}) => {
  const baseStyle = 'w-full px-space-md py-space-sm border rounded-md text-base transition duration-300';
  const borderColor = error
    ? 'border-error-border focus:border-error-border'
    : 'border-neutrals-border focus:border-brand-primary';
  const textColor = disabled ? 'text-text-disabled bg-neutrals-surface' : 'text-text-primary bg-white';

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
        className={clsx(baseStyle, borderColor, textColor, 'resize-none')}
      />
      {error && <span className="text-sm text-error-text">{error}</span>}
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
};
