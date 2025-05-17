// c:\My Web Sites\RocVille Media House\RMH-Replit\RMH-Replit\src\components\ui\AsyncValidationForm.jsx
import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import TextInput from './TextInput'; // Assuming TextInput is a default export
import Alert from './Alert';       // Assuming Alert is a default export
import Button from './Button';     // Assuming Button is a default export

// Debounce function (can be a simple utility or from a library like lodash)
const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};


const AsyncValidationFormComponent = ({ onSubmit, validateEmailAsync, initialEmail = '' }) => {
  const [email, setEmail] = useState(initialEmail);
  const [isValidating, setIsValidating] = useState(false);
  const [error, setError] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isTouched, setIsTouched] = useState(false);

  // Define your actual async validation logic here or pass it as a prop
  const performValidation = useCallback(async (currentEmail) => {
    if (!currentEmail.trim()) {
      setIsValidating(false);
      setError('');
      setIsEmailValid(false);
      return;
    }
    setIsValidating(true);
    setError(''); // Clear previous errors
    try {
      // Use the passed validateEmailAsync prop, or the default if not provided
      const validationFn = validateEmailAsync || AsyncValidationFormComponent.defaultProps.validateEmailAsync;
      const result = await validationFn(currentEmail);
      if (result.isValid) {
        setIsEmailValid(true);
        setError('');
      } else {
        setIsEmailValid(false);
        setError(result.error || 'Invalid email.');
      }
    } catch (err) {
      setIsEmailValid(false);
      setError('Validation request failed. Please try again.');
    } finally {
      setIsValidating(false);
    }
  }, [validateEmailAsync]); // Added validateEmailAsync to dependency array

  const debouncedValidate = useCallback(debounce(performValidation, 500), [performValidation]);

  useEffect(() => {
    if (isTouched && email.trim() !== '') {
      debouncedValidate(email);
    } else if (email.trim() === '') {
        setIsValidating(false);
        setError('');
        setIsEmailValid(false);
    }
  }, [email, debouncedValidate, isTouched]);


  const handleEmailChange = (e) => {
    setIsTouched(true);
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEmailValid && !isValidating && !error) {
      onSubmit({ email });
    } else if (!isTouched && email.trim() === '') {
        setError('Email is required.'); // Show error if submitted empty without touching
    } else if (email.trim() !== '' && !error && !isValidating && !isEmailValid) {
        // If not validating, no error, but not valid (e.g. initial state or after clearing)
        // and user tries to submit, trigger validation.
        performValidation(email);
    }
  };
  
  const canSubmit = isEmailValid && !isValidating && !error && email.trim() !== '';


  return (
    <div className="p-4 rounded-md bg-bg-surface-accent"> {/* Using theme token */}
      <h2 className="mb-4 text-lg font-bold text-text-primary">Async Validation Form</h2>
      <form onSubmit={handleSubmit} className="space-y-space-md"> {/* Using theme token */}
        <TextInput
          id="email"
          label="Email"
          type="email"
          value={email}
          onChange={handleEmailChange}
          error={error && !isValidating ? error : ''}
          placeholder=" " // For floating label effect if your TextInput supports it
          required
        />
        {isValidating && <p className="text-sm text-text-secondary animate-pulse">Validating...</p>}
        {/* Alert component might be used here if error is more complex */}
        {/* {error && !isValidating && <Alert variant="error" message={error} />} */}
        <Button type="submit" disabled={!canSubmit || isValidating}>
          Submit
        </Button>
      </form>
    </div>
  );
};

AsyncValidationFormComponent.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  validateEmailAsync: PropTypes.func,
  initialEmail: PropTypes.string,
};

// Default props are handled by default parameters in the function signature.
AsyncValidationFormComponent.defaultProps = {
  initialEmail: '',
  validateEmailAsync: async (emailValue) => {
    // Default mock validation logic for Storybook/standalone use
    return new Promise(resolve => {
      setTimeout(() => {
        if (!emailValue.includes('@')) {
          resolve({ isValid: false, error: 'Invalid email format.' });
        } else if (emailValue === 'taken@example.com') {
          resolve({ isValid: false, error: 'Email already taken.' });
        } else {
          resolve({ isValid: true, error: null });
        }
      }, 700); // Simulate network delay
    });
  }
};

const AsyncValidationForm = React.memo(AsyncValidationFormComponent);
export default AsyncValidationForm; // Ensure this is a default export

// Note: The default for `validateEmailAsync` is handled in the component's props destructuring.
