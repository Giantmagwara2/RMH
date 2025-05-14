import React from 'react';

const TextInput = React.forwardRef(
  ({ id, label, placeholder, error, className = '', borderColor = 'border-neutrals-border', backgroundColor = 'bg-white', ...props }, ref) => (
    <div className={`mb-space-md ${className}`}>
      {label && (
        <label htmlFor={id} className="block font-medium mb-space-xs text-text-primary">
          {label}
        </label>
      )}
      <input
        id={id}
        ref={ref}
        placeholder={placeholder}
        className={`block w-full p-space-sm border rounded-md
                    focus:outline-none focus:ring focus:ring-brand-primary
                    ${borderColor} ${backgroundColor} ${error ? 'border-error' : ''}`}
        aria-live="polite"
        {...props}
      />
      {error && <p className="text-sm mt-space-xs text-error" aria-live="assertive">{error}</p>}
    </div>
  )
);

export default TextInput;
