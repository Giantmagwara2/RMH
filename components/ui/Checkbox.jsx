import React from 'react';

const Checkbox = React.forwardRef(
  ({ id, label, checked, onChange, disabled = false, className = '', ...props }, ref) => (
    <div className={`flex items-center mb-space-sm ${className}`}>
      <input
        type="checkbox"
        id={id}
        ref={ref}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className="w-4 h-4 rounded text-brand-primary border-neutrals-border focus:ring focus:ring-brand-primary"
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

export default Checkbox;
