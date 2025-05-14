import React from 'react';
import clsx from 'clsx';

const FormField = ({
  label,
  error,
  children,
  required,
  helpText,
  className,
  id,
  customStyles = '',
}) => {
  const fieldId = id || Math.random().toString(36).substring(2);
  const errorId = `${fieldId}-error`;
  const helpTextId = `${fieldId}-help`;

  return (
    <div className={clsx('form-field', className, customStyles)}>
      {label && (
        <label 
          htmlFor={fieldId}
          className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
        >
          {label}
          {required && (
            <span className="text-red-500 ml-1" aria-hidden="true">*</span>
          )}
        </label>
      )}
      
      <div className="relative">
        {React.Children.map(children, child => {
          if (!React.isValidElement(child)) return child;
          
          return React.cloneElement(child, {
            id: fieldId,
            'aria-invalid': error ? 'true' : 'false',
            'aria-required': required,
            'aria-describedby': clsx(
              error && errorId,
              helpText && helpTextId
            ),
            ...child.props
          });
        })}
      </div>

      {helpText && (
        <p 
          id={helpTextId}
          className="text-sm text-gray-500 dark:text-gray-400 mt-1"
        >
          {helpText}
        </p>
      )}

      {error && (
        <p 
          id={errorId}
          className="text-sm text-red-500 mt-1"
        >
          {error}
        </p>
      )}
    </div>
  );
};

export default FormField;
