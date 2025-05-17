import React from 'react';
import PropTypes from 'prop-types';

export const RadioButton = React.forwardRef(
  (
    {
      id,
      label,
      value,
      name,
      checked,
      onChange,
      disabled = false,
      error = false, // Keep error prop for individual button styling if needed
      className = '',
      size = 'md', // Added size prop
      ...props
    },
    ref
  ) => {
    const sizeClasses = {
      sm: 'w-3 h-3',
      md: 'w-4 h-4', // Default size
      lg: 'w-5 h-5',
    };

    const radioClass = `text-blue-600 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 ${
      sizeClasses[size] || sizeClasses.md
    } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} ${
      error ? 'border-red-500' : ''
    }`;

    return (
      <div className={`flex items-center ${className}`}>
        <input
          type="radio"
          id={id}
          name={name}
          value={value}
          ref={ref}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          aria-invalid={!!error} // Use !!error to convert string to boolean for aria-invalid
          className={radioClass}
          {...props}
        />
        {label && (
          <label
            htmlFor={id}
            className={`ml-2 text-sm font-medium text-gray-900 dark:text-gray-300 ${
              disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
            }`}
          >
            {label}
          </label>
        )}
      </div>
    );
  }
);

RadioButton.displayName = 'RadioButton';

RadioButton.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.node,
  value: PropTypes.any.isRequired,
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]), // Can be bool or error message string
  className: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
};

const RadioGroup = ({ name, legend, options = [], selectedValue, onChange, error = '', className = '', orientation = 'vertical' }) => (
  <fieldset className={className} role="radiogroup" aria-labelledby={legend ? `${name}-legend` : undefined} aria-describedby={error ? `${name}-error` : undefined}>
    {legend && <legend id={`${name}-legend`} className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">{legend}</legend>}
    <div className={`flex ${orientation === 'horizontal' ? 'flex-row space-x-4' : 'flex-col space-y-2'}`}>
      {options.map((opt) => (
        <RadioButton
          key={opt.value}
          id={`${name}-${opt.value.toString().replace(/\s+/g, '-')}`} // Ensure ID is valid
          name={name}
          label={opt.label}
          value={opt.value}
          checked={selectedValue === opt.value}
          onChange={() => onChange(opt.value)}
          error={!!error} // Pass error state to individual radio buttons
        />
      ))}
    </div>
    {error && <p className="mt-2 text-sm text-red-500" id={`${name}-error`}>{error}</p>}
  </fieldset>
);

RadioGroup.displayName = 'RadioGroup';

RadioGroup.propTypes = {
  name: PropTypes.string.isRequired,
  legend: PropTypes.string, // Optional legend for the group
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.node.isRequired,
      value: PropTypes.any.isRequired,
    })
  ).isRequired,
  selectedValue: PropTypes.any,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  className: PropTypes.string,
  orientation: PropTypes.oneOf(['vertical', 'horizontal']),
};

export default RadioGroup;
