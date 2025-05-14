import React, { useState } from 'react';

const AsyncValidationForm = ({ onSubmit }) => {
  const [email, setEmail] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setEmail(e.target.value);
    setError(null);
  };

  const handleBlur = async () => {
    setIsValidating(true);
    try {
      // Simulate async validation
      await new Promise((resolve) => setTimeout(resolve, 1000));
      if (!email.includes('@')) {
        throw new Error('Invalid email address');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsValidating(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!error) {
      onSubmit({ email });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email:</label>
      <input
        id="email"
        type="email"
        value={email}
        onChange={handleChange}
        onBlur={handleBlur}
        aria-invalid={!!error}
        aria-describedby="email-error"
      />
      {isValidating && <p>Validating...</p>}
      {error && <p id="email-error" role="alert">{error}</p>}
      <button type="submit">Submit</button>
    </form>
  );
};

export { AsyncValidationForm };
