import React from 'react';
import PropTypes from 'prop-types';

const Select = ({
  id, // Added id prop
  label,
  name,
  options = [],
  value,
  onChange,
  placeholder = 'Select an option',
  error = '', // Default to empty string
  disabled = false,
  required = false,
  'aria-label': ariaLabel,
  // 'aria-describedby': ariaDescribedby, // Will be managed internally
  className = '', // Added className prop for the wrapper
  selectClassName = '', // Added selectClassName for the select element itself
  ...props // Collect other props to spread onto the select element
}) => {
  const hasError = !!error;
  const selectId = id || name; // Use provided id or fallback to name
  const errorId = hasError ? `${selectId}-error` : undefined;
  const describedBy = errorId || undefined; // Only describe by error if it exists

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label htmlFor={selectId} className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
          {required && <span className="ml-1 text-red-500">*</span>}
        </label>
      )}
      <select
        id={selectId}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`
          block w-full px-3 py-2 text-gray-900 bg-white border rounded-md shadow-sm
          dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
          disabled:opacity-50 disabled:cursor-not-allowed
          ${hasError ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300'}
          ${selectClassName}
        `}
        aria-label={label ? undefined : ariaLabel || placeholder} // Use label for aria if no explicit aria-label
        aria-describedby={describedBy}
        aria-invalid={hasError}
        required={required}
        {...props}
      >
        {placeholder && <option value="" disabled={required ? false : true}>{placeholder}</option>}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {hasError && (
        <p id={errorId} className="mt-1 text-sm text-red-600 dark:text-red-400" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};

Select.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.any.isRequired,
    label: PropTypes.string.isRequired,
  })).isRequired,
  value: PropTypes.any,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  'aria-label': PropTypes.string,
  className: PropTypes.string,
  selectClassName: PropTypes.string,
};

Select.displayName = 'Select';

export default Select;