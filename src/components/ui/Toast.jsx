// Toast.jsx
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

export const Toast = ({
  type = 'info',
  message,
  onClose,
  duration = 3000,
  icon: CustomIcon,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose?.();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const baseStyles = 'flex items-center px-space-md py-space-sm rounded shadow-lg text-white w-full max-w-xs';
  const variants = {
    info: 'bg-blue-600',
    success: 'bg-green-600',
    warning: 'bg-yellow-600 text-black',
    error: 'bg-red-600',
  };

  const icons = {
    info: 'ℹ️',
    success: '✔️',
    warning: '⚠️',
    error: '❌',
  };

  return (
    <div className={clsx(baseStyles, variants[type])} role="alert" aria-live="assertive">
      {CustomIcon ? (
        <CustomIcon className="mr-space-sm" />
      ) : (
        <span className="mr-space-sm">{icons[type]}</span>
      )}
      <span className="flex-1">{message}</span>
      <button
        onClick={onClose}
        className="text-sm font-bold text-white ml-space-sm focus:outline-none"
        aria-label="Close"
      >
        ×
      </button>
    </div>
  );
};

Toast.propTypes = {
  type: PropTypes.oneOf(['info', 'success', 'warning', 'error']),
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func,
  duration: PropTypes.number,
  icon: PropTypes.elementType,
};
