
import React from 'react';
import { useForm } from '../../hooks/useForm';

const Form = ({ 
  onSubmit, 
  children, 
  className = '', 
  validateOnChange = false,
  asyncValidate
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
      className={`space-y-4 ${className} ${isSubmitting ? 'opacity-70 pointer-events-none' : ''}`}
      noValidate
    >
      {React.Children.map(children, child => {
        if (!React.isValidElement(child)) return child;

        return React.cloneElement(child, {
          onChange: handleChange,
          error: errors[child.props.name],
          value: values[child.props.name] || '',
          isValidating: isValidating[child.props.name],
          setFieldError: (error) => setFieldError(child.props.name, error)
        });
      })}
    </form>
  );
};

export default Form;
