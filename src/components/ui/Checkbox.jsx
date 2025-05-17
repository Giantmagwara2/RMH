import React from 'react';
import PropTypes from 'prop-types';

const Checkbox = React.forwardRef(
  (
    {
      id,
      label,
      checked,
      onChange,
      disabled = false,
      className = '',
      size = 'md',
      ...props
    },
    ref
  ) => {
    const sizeClasses = {
      sm: 'w-3 h-3',
      md: 'w-4 h-4', // Default size
      lg: 'w-5 h-5',
    };

    const checkboxClass = `rounded border-gray-300 text-blue-500 focus:ring-blue-500 ${sizeClasses[size] || sizeClasses.md} ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`;

    return (
      <div className={`flex items-center ${className}`}>
        <input
          type="checkbox"
          id={id}
          ref={ref}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className={checkboxClass}
          aria-checked={checked}
          {...props}
        />
        {label && (
          <label
            htmlFor={id}
            className={`ml-2 text-sm text-gray-700 ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
          >
            {label}
          </label>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox'; // Helps with debugging in React DevTools

Checkbox.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.node, // Allows for text or other React nodes
  checked: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
};

export default Checkbox;
