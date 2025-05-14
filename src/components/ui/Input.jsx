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
  return (
    <div className="relative w-full">
      {label && (
        <label
          htmlFor={id}
          className="absolute left-3 top-2 text-sm text-neutrals-secondary dark:text-neutrals-light/80 transition-all duration-300 transform origin-left scale-100 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-2 peer-focus:scale-75 peer-focus:-translate-y-1"
        >
          {label}
        </label>
      )}
      <input
        id={id}
        ref={ref}
        type={type}
        value={value}
        onChange={onChange}
        placeholder=" "
        className={`
          peer w-full px-3 py-2 text-neutrals-primary dark:text-neutrals-light
          ${backgroundColor} ${borderColor} border rounded-md
          focus:outline-none focus:ring-2 focus:ring-brand-primary
          disabled:opacity-50 disabled:cursor-not-allowed
          ${className}
        `}
        aria-label={ariaLabel}
        aria-describedby={ariaDescribedby}
        disabled={disabled}
        required={required}
        {...props}
      />
      {helperText && (
        <p
          id={`${id}-helper`}
          className={`text-xs mt-1 ${error ? 'text-semantic-error' : 'text-neutrals-secondary dark:text-neutrals-light/80'}`}
        >
          {helperText}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';
export default Input;