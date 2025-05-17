import React from 'react';
import { useForm } from '../../hooks/useForm';

const Form = ({ 
  onSubmit, 
  children, 
  className = '', 
  validateOnChange = false,
  asyncValidate,
  'aria-label': ariaLabel,
  role = 'form',
  noValidate = true,
  customStyles = '',
}) => {
  const {
    values,
    errors,
    isSubmitting,
    isDirty,
    isValidating,
    handleChange,
    handleSubmit,
    setFieldError
  } = useForm({
    onSubmit,
    asyncValidate,
    validateOnChange
  });

  return (
    <form 
      onSubmit={handleSubmit}
      className={`space-y-4 ${className} ${customStyles} ${isSubmitting ? 'opacity-70 pointer-events-none' : ''}`}
      noValidate={noValidate}
      role={role} // Keep role attribute
      aria-label={ariaLabel}
      aria-busy={isSubmitting}
      aria-live="polite"
    >
      {isSubmitting && (
        <div className="sr-only" role="status" aria-live="polite">
          Form is submitting...
        </div>
      )}
      {React.Children.map(children, child => {
        if (!React.isValidElement(child)) return child;

        return (
          <div className="form-field">
            {React.cloneElement(child, {
              // Use onBlur for validation and onChange for value update.
              onChange: (e) => { handleChange(e); if (validateOnChange) { child.props.onBlur && child.props.onBlur(e); } },
              error: errors[child.props.name],
              value: values[child.props.name] || '',
              isValidating: isValidating[child.props.name],
              setFieldError: (error) => setFieldError(child.props.name, error)
            })}
            {errors[child.props.name] && (
              <div className="mt-1 text-sm text-red-500" role="alert">
                {errors[child.props.name]}
              </div>
            )}
          </div>
        );
      })}
    </form>
  );
};

export default Form;
