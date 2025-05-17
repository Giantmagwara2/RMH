import React from 'react';
import PropTypes from 'prop-types';

const FormField = ({
  label,
  children, // Ensure children are handled
  error = '', // Provide default value
  required,
  helpText,
  className,
  id,
  // customStyles = '', // customStyles prop is not used
  validateOnChange = false, // Add validateOnChange prop
  ...props // Collect any extra props
}) => {
  const fieldId = id || Math.random().toString(36).substring(2); // Generate unique ID
  const errorId = `${fieldId}-error`; // Error message ID
  const helpTextId = `${fieldId}-help`; // Help text ID

  return (
    <div className={`mb-4 ${className}`} {...props}> {/* Apply className to the main div */}
      {label && (
        <label
          htmlFor={fieldId}
          className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300" // Label styling
        >
          {label}
          {required && <span className="ml-1 text-red-500">*</span>} {/* Required indicator */}
        </label>
      )}

      {/* Apply props to the first child only */}
      {React.Children.map(children, (child, index) =>
        React.isValidElement(child) ? (
          React.cloneElement(child, {
            id: fieldId, // Connect label with input
            'aria-invalid': !!error, // Indicate error state
            'aria-describedby': [errorId, helpTextId].filter(Boolean).join(' ') || undefined, // Associate error & help text
            ...child.props, // Spread existing props
            className: `${child.props.className || ''} ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`, // Error styling on input
          })
        ) : child // Pass through non-element children (e.g., text)
      )}

      {/* Help text */}
      {helpText && (
        <p
          id={helpTextId}
          className="mt-2 text-sm text-gray-500 dark:text-gray-400" // Help text styling
        >
          {helpText}
        </p>
      )}

      {/* Error message */}
      {error && (
        <p
          id={errorId}
          className="mt-2 text-sm text-red-500" // Error text styling
        >
          {error}
        </p>
      )}
    </div>
  );
}

FormField.propTypes = {
  id: PropTypes.string,
  label: PropTypes.node, // Allow React nodes in label
  children: PropTypes.node.isRequired,
  error: PropTypes.string,
  required: PropTypes.bool,
  helpText: PropTypes.string,
  className: PropTypes.string,
  validateOnChange: PropTypes.bool,
};

export default FormField;
