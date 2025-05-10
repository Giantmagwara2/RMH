
import { useState, useCallback, useRef } from 'react';
import { useDebounce } from './useDebounce';

export const useForm = ({ onSubmit, asyncValidate, validateOnChange = false }) => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isValidating, setIsValidating] = useState({});
  const [isDirty, setIsDirty] = useState(false);
  
  const debouncedValidation = useDebounce(async (name, value) => {
    if (!asyncValidate) return;
    
    setIsValidating(prev => ({ ...prev, [name]: true }));
    try {
      const fieldError = await asyncValidate(name, value);
      setErrors(prev => ({ ...prev, [name]: fieldError }));
    } catch (error) {
      setErrors(prev => ({ ...prev, [name]: error.message }));
    } finally {
      setIsValidating(prev => ({ ...prev, [name]: false }));
    }
  }, 400);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
    setIsDirty(true);
    
    if (validateOnChange) {
      debouncedValidation(name, value);
    }
  }, [validateOnChange, debouncedValidation]);

  const setFieldError = useCallback((field, error) => {
    setErrors(prev => ({ ...prev, [field]: error }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await onSubmit(values);
      setErrors({});
      setIsDirty(false);
    } catch (error) {
      if (error.fieldErrors) {
        setErrors(error.fieldErrors);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    values,
    errors,
    isSubmitting,
    isDirty,
    isValidating,
    handleChange,
    handleSubmit,
    setFieldError
  };
};
