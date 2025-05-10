import React from 'react';

const TextInput = React.forwardRef(
  ({ id, label, placeholder, error, className = '', ...props }, ref) => (
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
        className={`block w-full p-space-sm border border-neutrals-border rounded-md
                    focus:outline-none focus:ring focus:ring-brand-primary
                    ${error ? 'border-error' : ''}`}
        {...props}
      />
      {error && <p className="text-sm mt-space-xs text-error">{error}</p>}
    </div>
  )
);

export default TextInput;
