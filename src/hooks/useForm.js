// /src/hooks/useForm.js
import { useState } from 'react';

export const useForm = (initialValues = {}, validationSchema = {}, onSubmit) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const validate = (currentValues) => {
    const newErrors = {};
    if (validationSchema) {
      for (const key in validationSchema) {
        const rules = validationSchema[key];
        for (const rule in rules) {
          const ruleValue = rules[rule];
          switch (rule) {
            case 'required':
              if (!currentValues[key]?.trim()) {
                newErrors[key] = newErrors[key] || ruleValue;
              }
              break;
            case 'email':
              if (ruleValue && currentValues[key] && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(currentValues[key])) {
                newErrors[key] = newErrors[key] || ruleValue;
              }
              break;
            case 'minLength':
              if (ruleValue && currentValues[key]?.length < ruleValue) {
                newErrors[key] = newErrors[key] || `Must be at least ${ruleValue} characters`;
              }
              break;
            // Add more validation rules as needed
            default:
              break;
          }
        }
      }
    }
    return newErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    const validationErrors = validate(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0 && onSubmit) {
      await onSubmit(values);
    }
    setIsSubmitting(false);
  };

  return {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    setValues,
    setErrors, // Exposing setErrors for manual error setting if needed
  };
};