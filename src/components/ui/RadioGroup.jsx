import React from 'react';

export const RadioButton = React.forwardRef(
  ({ id, label, value, name, checked, onChange, disabled = false, error = false, className = '', ...props }, ref) => (
    <div className={`flex items-center mb-space-sm ${className}`}>
      <input
        type="radio"
        id={id}
        name={name}
        value={value}
        ref={ref}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        aria-invalid={error}
        className={`w-4 h-4 text-brand-primary border-neutrals-border focus:ring focus:ring-brand-primary ${
          error ? 'border-red-500' : ''
        }`}
        {...props}
      />
      {label && (
        <label htmlFor={id} className="select-none ml-space-xs text-text-primary">
          {label}
        </label>
      )}
    </div>
  )
);

const RadioGroup = ({ name, options = [], selectedValue, onChange, error = '', className = '' }) => (
  <div className={className} role="radiogroup" aria-labelledby={`${name}-label`}>
    {options.map((opt) => (
      <RadioButton
        key={opt.value}
        id={`${name}-${opt.value}`}
        name={name}
        label={opt.label}
        value={opt.value}
        checked={selectedValue === opt.value}
        onChange={() => onChange(opt.value)}
        error={!!error}
      />
    ))}
    {error && <p className="mt-1 text-sm text-red-500" id={`${name}-error`}>{error}</p>}
  </div>
);

export default RadioGroup;
