import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

const TextInputComponent = React.forwardRef(
  (
    {
      id,
      label,
      type = 'text',
      placeholder,
      value,
      onChange,
      error,
      disabled = false,
      required = false,
      name,
      'aria-label': ariaLabel,
      'aria-describedby': ariaDescribedby,
      className = '',
      inputClassName = '',
      borderColor = 'border-neutrals-border',
      backgroundColor = 'bg-white',
      ...rest
    },
    ref
  ) => {
    const errorId = id && error ? `${id}-error` : undefined;
    const describedBy = clsx(ariaDescribedby, errorId).trim() || undefined;

    const baseInputStyle =
      'block w-full p-space-sm border rounded-md focus:outline-none focus:ring focus:ring-brand-primary';
    const errorInputStyle = error ? 'border-error-border focus:border-error-border' : ''; // More specific error border
    const disabledInputStyle = disabled ? 'text-text-disabled bg-neutrals-surface cursor-not-allowed' : '';

    return (
      <div className={clsx('mb-space-md', className)}>
        {label && (
          <label htmlFor={id} className="block font-medium mb-space-xs text-text-primary">
            {label}
          </label>
        )}
        <input
          id={id}
          ref={ref}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          aria-label={ariaLabel}
          aria-describedby={describedBy}
          aria-invalid={!!error}
          className={clsx(baseInputStyle, borderColor, backgroundColor, errorInputStyle, disabledInputStyle, inputClassName)}
          {...rest}
        />
        {error && (
  <p id={errorId} className="text-sm mt-space-xs text-error-text" aria-live="assertive" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

TextInputComponent.displayName = 'TextInput';

TextInputComponent.propTypes = {
  id: (props, propName, componentName) => {
    if (props.label && !props[propName]) {
      return new Error(
        `Warning: Failed prop type: When a 'label' is provided to \`${componentName}\`, an \`${propName}\` must also be provided for accessibility. ` +
        `If the input is labelled by other means (e.g. aria-label), ensure the label prop is not set.`
      );
    }
    if (props[propName] && typeof props[propName] !== 'string') {
      return new Error(`Invalid prop \`${propName}\` supplied to \`${componentName}\`, expected a string.`);
    }
    return null;
  },
  label: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  error: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  name: PropTypes.string,
  'aria-label': PropTypes.string,
  'aria-describedby': PropTypes.string,
  className: PropTypes.string, // For the wrapper div
  inputClassName: PropTypes.string, // For the input element itself
  borderColor: PropTypes.string,
  backgroundColor: PropTypes.string,
};

TextInputComponent.defaultProps = {
  id: undefined,
  label: undefined,
  type: 'text',
  placeholder: '',
  value: '', // Default to empty string for controlled/uncontrolled consistency
  onChange: undefined,
  error: '',
  disabled: false,
  required: false,
  name: undefined,
  'aria-label': undefined,
  'aria-describedby': undefined,
  className: '',
  inputClassName: '',
  borderColor: 'border-neutrals-border',
  backgroundColor: 'bg-white',
};

const TextInput = React.memo(TextInputComponent);

export default TextInput;
