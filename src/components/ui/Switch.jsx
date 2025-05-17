import React from 'react';
import PropTypes from 'prop-types';

const Switch = ({
  checked,
  onChange,
  disabled = false,
  color = 'bg-brand-primary', // Active color class
  className = '',
  id, // For associating with a label
  'aria-label': ariaLabel, // For accessibility if no visible label
  'aria-labelledby': ariaLabelledBy,
  ...props // Spread other props
}) => {
  return (
    <button
      id={id}
      onClick={() => !disabled && onChange(!checked)}
      className={`
        relative inline-flex h-6 w-11 items-center rounded-full transition-colors
        ${checked ? color : 'bg-neutrals-border'}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
      role="switch"
      aria-checked={checked}
      aria-disabled={disabled}
      aria-label={ariaLabel} // Use passed aria-label
      aria-labelledby={ariaLabelledBy} // Use passed aria-labelledby
      {...props} // Spread other props
    >
      <span
        className={`
          inline-block h-4 w-4 transform rounded-full bg-white transition
          ${checked ? 'translate-x-6' : 'translate-x-1'}
        `}
      />
    </button>
  );
};

Switch.propTypes = {
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  color: PropTypes.string, // Expects a Tailwind background color class for the 'on' state
  className: PropTypes.string,
  id: PropTypes.string,
  'aria-label': PropTypes.string,
  'aria-labelledby': PropTypes.string,
};

Switch.defaultProps = {
  disabled: false,
  color: 'bg-brand-primary', // Ensure this is a valid Tailwind class in your project
  className: '',
};

Switch.displayName = 'Switch';

export default Switch;
