// Toast.jsx
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

const ToastComponent = ({
  type = 'info',
  message,
  onClose,
  duration = 3000,
  icon: CustomIcon,
  className = '',
  ...rest
}) => {
  useEffect(() => {
    if (Number.isFinite(duration) && duration > 0 && duration !== Infinity) {
      const timer = setTimeout(() => {
        onClose?.();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const baseStyles = 'flex items-center px-space-md py-space-sm rounded-md shadow-lg text-white w-full max-w-xs'; // Added rounded-md for consistency
  const variants = {
    info: 'bg-blue-600',
    success: 'bg-green-600',
    warning: 'bg-yellow-600 text-black',
    error: 'bg-red-600',
  };

  // Default icons (emojis)
  const icons = {
    info: 'ℹ️',
    success: '✔️',
    warning: '⚠️',
    error: '❌',
  };

  const closeButtonTextColor = type === 'warning' ? 'text-black' : 'text-white';

  return (
    <div
      className={clsx(baseStyles, variants[type], className)}
      role="alert"
      aria-live="assertive"
      {...rest}
    >
      {CustomIcon ? (
        // If CustomIcon is an SVG, it should ideally have aria-hidden="true" if purely decorative
        <CustomIcon className="flex-shrink-0 mr-space-sm" />
      ) : (
        <span className="flex-shrink-0 mr-space-sm" aria-hidden="true">{icons[type]}</span>
      )}
      <span className="flex-1">{message}</span>
      {onClose && ( // Only render close button if onClose is provided
        <button
          onClick={onClose}
          className={clsx("ml-space-sm p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-opacity-50", closeButtonTextColor, type === 'warning' ? 'hover:bg-black/10 focus:ring-black' : 'hover:bg-white/20 focus:ring-white')}
          aria-label="Close"
        >
          <span className="text-xl leading-none" aria-hidden="true">&times;</span>
        </button>
      )}
    </div>
  );
};

ToastComponent.propTypes = {
  type: PropTypes.oneOf(['info', 'success', 'warning', 'error']),
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func,
  duration: PropTypes.number,
  icon: PropTypes.elementType,
  className: PropTypes.string,
};

ToastComponent.displayName = 'Toast';

export const Toast = React.memo(ToastComponent);

// Note: For a full toast system, you'd typically have a ToastProvider
// and a way to imperatively add/remove toasts. This component is the visual Toast item.
