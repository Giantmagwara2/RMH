import React from 'react';

/**
 * A styled input field with label, helper text, and error state.
 */
const Input = React.forwardRef(({
  id,
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  helperText,
  error = false,
  disabled = false,
  className = '',
  required = false,
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedby,
  borderColor = 'border-neutrals-border',
  backgroundColor = 'bg-neutrals-surface',
  ...props
}, ref) => {
  const focusRing = error ? 'focus:ring-error' : 'focus:ring-brand-primary';

  return (
    <div className={`flex flex-col ${className}`}>
      {label && (
        <label htmlFor={id} className="mb-1 font-medium text-text-primary">
          {label}
        </label>
      )}
      <input
        id={id}
        ref={ref}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={`
          w-full px-space-sm py-space-xs
          ${backgroundColor}
          ${borderColor} border rounded-md
          focus:outline-none focus:ring-2 ${focusRing}
          disabled:opacity-50 disabled:cursor-not-allowed
          transition-colors duration-default
        `}
        {...props}
        required={required}
        aria-label={ariaLabel}
        aria-describedby={ariaDescribedby}
      />
      {helperText && (
        <p className={`mt-1 text-sm ${error ? 'text-error' : 'text-text-secondary'}`} aria-live="assertive">
          {helperText}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';
export default Input;