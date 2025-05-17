// Textarea.jsx
import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

const TextareaComponent = React.forwardRef(({
  id,
  label,
  value,
  onChange,
  placeholder = '',
  rows = 4,
  disabled = false,
  error = '',
  name,
  required = false,
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedby,
  maxLength,
  borderColor = 'border-neutrals-border',
  backgroundColor = 'bg-white',
  className = '', // Added className prop for the wrapper
  ...rest // Capture rest of the props for the textarea element
}, ref) => {
  const baseStyle = 'w-full px-space-md py-space-sm border rounded-md text-base transition duration-300';
  const errorStyle = error ? 'border-error-border focus:border-error-border' : '';
  const disabledStyle = disabled ? 'text-text-disabled bg-neutrals-surface' : '';
  const errorId = id && error ? `${id}-error` : undefined;
  const describedBy = clsx(ariaDescribedby, errorId).trim() || undefined;

  return (
    <div className="flex flex-col space-y-space-xs">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-text-secondary">
          {label}
        </label>
      )}
      <textarea
        id={id}
        ref={ref}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        rows={rows}
        className={clsx(baseStyle, borderColor, backgroundColor, errorStyle, disabledStyle, 'resize-none')}
        required={required}
        aria-label={ariaLabel}
        aria-describedby={describedBy}
        maxLength={maxLength}
        aria-invalid={!!error}
        {...rest} // Spread other props like data-* etc.
      />
      {error && (
        <span id={errorId} className="text-sm text-error-text" aria-live="assertive">
          {error}
        </span>
      )}
    </div>
  );
});

TextareaComponent.displayName = 'Textarea';

TextareaComponent.propTypes = {
  id: (props, propName, componentName) => {
    if (props.label && !props[propName]) {
      return new Error(
        `Warning: Failed prop type: When a 'label' is provided to \`${componentName}\`, an \`${propName}\` must also be provided for accessibility. ` +
        `If the textarea is labelled by other means (e.g. aria-label), ensure the label prop is not set.`
      );
    }
    if (props[propName] && typeof props[propName] !== 'string') {
      return new Error(`Invalid prop \`${propName}\` supplied to \`${componentName}\`, expected a string.`);
    }
    return null;
  },
  label: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  rows: PropTypes.number,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  required: PropTypes.bool,
  'aria-label': PropTypes.string,
  'aria-describedby': PropTypes.string,
  maxLength: PropTypes.number,
  borderColor: PropTypes.string,
  backgroundColor: PropTypes.string,
  className: PropTypes.string,
};

TextareaComponent.defaultProps = {
  id: undefined,
  label: undefined,
  name: undefined,
  placeholder: '',
  rows: 4,
  disabled: false,
  error: '',
  required: false,
  'aria-label': undefined,
  'aria-describedby': undefined,
  maxLength: undefined,
  borderColor: 'border-neutrals-border',
  backgroundColor: 'bg-white',
  className: '',
};

export const Textarea = React.memo(TextareaComponent);