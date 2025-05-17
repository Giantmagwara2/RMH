import React from 'react';
import PropTypes from 'prop-types';
import { X } from 'lucide-react';

const Alert = ({ 
  variant = 'info', 
  message, 
  onClose, 
  className = '', 
  title, // Optional title
  ...props 
}) => {
  const VARIANT_CLASSES = {
    info: 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100',
    success: 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100',
    warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100',
    error: 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100',
  };

  const style = VARIANT_CLASSES[variant] || VARIANT_CLASSES.info;

  return ( 
    <div className={`rounded-md p-4 ${style} ${className} flex`} role="alert" {...props}>
      <div className="flex-1">
        {title && <h3 className="mb-1 text-sm font-semibold">{title}</h3>}
        <p className="text-sm">{message}</p>
      </div>

      {onClose && (
        <button onClick={onClose} className="ml-4 shrink-0 focus:outline-none">
          <X className="w-4 h-4" aria-label="Close alert" />
        </button>
      )}
    </div> 
  );
};

Alert.propTypes = {
  variant: PropTypes.oneOf(['info', 'success', 'warning', 'error']),
  message: PropTypes.node.isRequired,
  onClose: PropTypes.func,
  className: PropTypes.string,
  title: PropTypes.string,
};

export default Alert;
