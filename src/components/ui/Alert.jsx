import React from 'react';

const Alert = ({ variant = 'info', message, onClose, className = '', ...props }) => {
  const VARIANT_CLASSES = {
    info: 'bg-info text-soft-white',
    success: 'bg-success text-soft-white',
    warning: 'bg-warning text-text-primary',
    error: 'bg-error text-soft-white',
  };

  return (
    <div
      className={`flex justify-between items-center px-space-md py-space-sm rounded-md mb-space-md
                  ${VARIANT_CLASSES[variant]} ${className}`}
      role="alert"
      aria-live="assertive"
      {...props}
    >
      <span>{message}</span>
      {onClose && (
        <button onClick={onClose} aria-label="Close alert" className="font-bold ml-space-md">
          ×
        </button>
      )}
    </div>
  );
};

export default Alert;
