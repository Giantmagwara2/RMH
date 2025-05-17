import React from 'react';
import PropTypes from 'prop-types';

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
  error = '', // Changed to string, default empty (no error)
  disabled = false,
  className = '',
  required = false,
  'aria-label': ariaLabel,
  // 'aria-describedby': ariaDescribedby, // Will be managed internally
  borderColor = 'border-neutrals-border',
  backgroundColor = 'bg-neutrals-surface',
  ...props
}, ref) => {
  const hasError = !!error;
  const generatedId = React.useId(); // Call useId unconditionally
  const inputId = id || `input-${generatedId}`; // Use the generated ID if id prop is not provided
  const helperTextId = helperText ? `${inputId}-helper` : undefined;
  const errorTextId = hasError ? `${inputId}-error` : undefined;
  const describedBy = [errorTextId, helperText && !hasError ? helperTextId : null].filter(Boolean).join(' ') || undefined;

  return (
    <div className="relative w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="absolute text-sm transition-all duration-300 origin-left transform scale-100 left-3 top-2 text-neutrals-secondary dark:text-neutrals-light/80 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-2 peer-focus:scale-75 peer-focus:-translate-y-1"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        ref={ref}
        type={type}
        value={value}
        onChange={onChange}
        placeholder=" " // Keep for floating label effect
        className={`
          peer w-full px-3 py-2 text-neutrals-primary dark:text-neutrals-light
          ${backgroundColor} 
          ${hasError ? 'border-semantic-error' : borderColor} 
          border rounded-md
          focus:outline-none focus:ring-2 
          ${hasError ? 'focus:ring-semantic-error' : 'focus:ring-brand-primary'}
          disabled:opacity-50 disabled:cursor-not-allowed
          ${className}
        `}
        aria-label={ariaLabel}
        aria-describedby={describedBy}
        aria-invalid={hasError}
        disabled={disabled}
        required={required}
        {...props}
      />
      {hasError ? (
        <p
          id={errorTextId}
          className="mt-1 text-xs text-semantic-error"
          role="alert"
        >
          {error}
        </p>
      ) : helperText ? (
        <p
          id={helperTextId}
          className="mt-1 text-xs text-neutrals-secondary dark:text-neutrals-light/80"
        >
          {helperText}
        </p>
      ) : null}
    </div>
  );
});

Input.displayName = 'Input';

Input.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  helperText: PropTypes.string,
  error: PropTypes.string, // Changed from bool to string
  disabled: PropTypes.bool,
  className: PropTypes.string,
  required: PropTypes.bool,
  'aria-label': PropTypes.string,
  borderColor: PropTypes.string,
  backgroundColor: PropTypes.string,
};

export default Input;