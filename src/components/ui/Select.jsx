import React from 'react';

const Select = ({
  label,
  name,
  options = [],
  value,
  onChange,
  placeholder = 'Select an option',
  error,
  disabled,
  required = false,
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedby,
}) => {
  const borderColor = error ? 'border-red-500' : 'border-neutrals-border';
  const textColor = disabled ? 'text-text-secondary' : 'text-text-primary';

  return (
    <div className="flex flex-col gap-space-xs">
      {label && (
        <label htmlFor={name} className="text-sm font-medium text-text-primary">
          {label}
        </label>
      )}
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`px-space-sm py-space-xs rounded-md border ${borderColor} ${textColor} bg-white focus:outline-none focus:ring-2 focus:ring-brand-base transition`}
        aria-label={ariaLabel}
        aria-describedby={ariaDescribedby}
        aria-live="polite"
        required={required}
      >
        <option value="" disabled>{placeholder}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <span className="text-sm text-red-500" aria-live="assertive">{error}</span>}
    </div>
  );
};

export default Select;