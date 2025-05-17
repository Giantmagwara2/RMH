import { useState, useCallback } from 'react';
import useDebouncedCallback from './useDebouncedCallback'; // Assuming default export

/**
 * @typedef {Object.<string, any>} FormValues
 * @typedef {Object.<string, string | undefined>} FormErrors
 *
 * @typedef {(values: FormValues) => FormErrors | Promise<FormErrors>} SyncValidateFunction
 * @typedef {(fieldName: string, fieldValue: any, allValues: FormValues) => Promise<string | undefined>} AsyncValidateFieldFunction
 * @typedef {(values: FormValues) => void | Promise<void>} SubmitFunction
 */

/**
 * Custom hook to manage form state, validation (synchronous and asynchronous), and submission.
 *
 * @param {object} options - Configuration options for the form.
 * @param {FormValues} [options.initialValues={}] - Initial values for the form fields.
 * @param {SubmitFunction} options.onSubmit - Function to call when the form is submitted and valid.
 * @param {Object.<string, (value: any, allValues: FormValues) => string | undefined>} [options.validate={}] - Object of synchronous validation functions, keyed by field name.
 * @param {Object.<string, (value: any, allValues: FormValues) => Promise<string | undefined>>} [options.asyncValidate={}] - Object of asynchronous validation functions, keyed by field name.
 * @param {boolean} [options.validateOnChange=false] - Whether to run synchronous validation on every change.
 * @param {boolean} [options.asyncValidateOnChange=false] - Whether to run asynchronous validation on every change (debounced).
 * @param {number} [options.debounceDelay=500] - Delay in milliseconds for debouncing async validation.
 * @returns {{
 *   values: FormValues,
 *   errors: FormErrors,
 *   isSubmitting: boolean,
 *   isDirty: boolean,
 *   isValidating: Object.<string, boolean>,
 *   handleChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void,
 *   handleBlur: (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void,
 *   handleSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>,
 *   setFieldValue: (fieldName: string, value: any) => void,
 *   setFieldError: (fieldName: string, error?: string) => void,
 *   resetForm: (newInitialValues?: FormValues) => void,
 *   setValues: React.Dispatch<React.SetStateAction<FormValues>>
 * }}
 */
export const useForm = ({
  initialValues = {},
  onSubmit,
  validate = {},
  asyncValidate = {},
  validateOnChange = false,
  asyncValidateOnChange = false,
  debounceDelay = 500,
}) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isValidating, setIsValidating] = useState({});
  const [isDirty, setIsDirty] = useState(false);
  const [touched, setTouched] = useState({});

  const runAsyncValidation = useDebouncedCallback(async (name, valueToValidate) => {
    if (asyncValidate && typeof asyncValidate[name] === 'function') {
      setIsValidating(prev => ({ ...prev, [name]: true }));
      try {
        const error = await asyncValidate[name](valueToValidate, values);
        setErrors(prev => ({ ...prev, [name]: error }));
      } catch (err) {
        console.error(`Async validation error for ${name}:`, err);
        setErrors(prev => ({ ...prev, [name]: err.message || 'Async validation failed' }));
      } finally {
        setIsValidating(prev => ({ ...prev, [name]: false }));
      }
    }
  }, debounceDelay);

  const runSyncValidation = useCallback((name, valueToValidate) => {
    if (validate && typeof validate[name] === 'function') {
      const error = validatename;
      setErrors(prev => ({ ...prev, [name]: error }));
      return error;
    }
    return undefined;
  }, [validate, values]);

  const handleChange = useCallback((event) => {
    const { name, value, type, checked } = event.target;
    const fieldValue = type === 'checkbox' ? checked : value;

    setValues(prev => ({ ...prev, [name]: fieldValue }));
    setIsDirty(true);
    setTouched(prev => ({ ...prev, [name]: true }));

    if (validateOnChange) {
      runSyncValidation(name, fieldValue);
    }
    if (asyncValidateOnChange) {
      runAsyncValidation(name, fieldValue);
    }
  }, [validateOnChange, asyncValidateOnChange, runSyncValidation, runAsyncValidation]);

  const handleBlur = useCallback((event) => {
    const { name, value } = event.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    // Optionally run validation on blur if not validating on change
    if (!validateOnChange && validate && typeof validate[name] === 'function') {
      runSyncValidation(name, value);
    }
    if (!asyncValidateOnChange && asyncValidate && typeof asyncValidate[name] === 'function') {
      runAsyncValidation(name, value);
    }
  }, [validateOnChange, asyncValidateOnChange, validate, asyncValidate, runSyncValidation, runAsyncValidation]);

  const setFieldValue = useCallback((name, value) => {
    setValues(prev => ({ ...prev, [name]: value }));
    setIsDirty(true);
    setTouched(prev => ({ ...prev, [name]: true }));
    // Optionally trigger validation
    if (validateOnChange) runSyncValidation(name, value);
    if (asyncValidateOnChange) runAsyncValidation(name, value);
  }, [validateOnChange, asyncValidateOnChange, runSyncValidation, runAsyncValidation]);

  const setFieldError = useCallback((field, error) => {
    setErrors(prev => ({ ...prev, [field]: error }));
  }, []);

  const resetForm = useCallback((newInitialValues) => {
    setValues(newInitialValues || initialValues);
    setErrors({});
    setIsDirty(false);
    setTouched({});
    setIsValidating({});
    setIsSubmitting(false);
  }, [initialValues]);

  const handleSubmit = useCallback(async (event) => {
    event.preventDefault();
    setTouched(Object.keys(values).reduce((acc, key) => ({ ...acc, [key]: true }), {})); // Mark all fields as touched
    setIsSubmitting(true);

    let currentErrors = {};
    // Run all synchronous validations
    if (typeof validate === 'function') { // Global validate function
      currentErrors = validate(values) || {};
    } else { // Field-level validate functions
      for (const fieldName in values) {
        if (validate && typeof validate[fieldName] === 'function') {
          const error = validate[fieldName](values[fieldName], values);
          if (error) currentErrors[fieldName] = error;
        }
      }
    }
    setErrors(currentErrors);

    if (Object.values(currentErrors).some(error => error)) {
      setIsSubmitting(false);
      return;
    }

    // Optionally, run all async validations if needed before submit, or rely on onChange/onBlur
    // For simplicity, this example assumes async validations are handled via change/blur
    // or that onSubmit itself handles further async checks.

    try {
      await onSubmit(values);
      // Optionally reset form on successful submission, or handle as needed
      // resetForm(); 
    } catch (submissionError) {
      console.error('Form submission error:', submissionError);
      if (submissionError && submissionError.fieldErrors) {
        setErrors(prev => ({ ...prev, ...submissionError.fieldErrors }));
      } else {
        // Set a general submission error if not field-specific
        setErrors(prev => ({ ...prev, _submit: submissionError.message || 'Submission failed' }));
      }
    } finally {
      setIsSubmitting(false);
    }
  }, [onSubmit, values, validate]);

  return {
    values,
    errors,
    isSubmitting,
    isDirty,
    isValidating,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    setFieldError,
    resetForm,
    setValues, // Expose setValues for more direct manipulation if needed
  };
};
