import React from 'react';

export const RadioButton = React.forwardRef(
  ({ id, label, value, name, checked, onChange, disabled = false, className = '', ...props }, ref) => (
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
        className="w-4 h-4 text-brand-primary border-neutrals-border focus:ring focus:ring-brand-primary"
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

const RadioGroup = ({ name, options = [], selectedValue, onChange, className = '' }) => (
  <div className={className}>
    {options.map(opt => (
      <RadioButton
        key={opt.value}
        id={`${name}-${opt.value}`}
        name={name}
        label={opt.label}
        value={opt.value}
        checked={selectedValue === opt.value}
        onChange={() => onChange(opt.value)}
      />
    ))}
  </div>
);

export default RadioGroup;
