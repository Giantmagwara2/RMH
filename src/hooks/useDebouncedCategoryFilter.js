// src/hooks/useDebouncedCategoryFilter.js
import { useState, useEffect } from 'react';

/**
 * Custom hook that debounces a category filter value.
 * The debounced value will only reflect the latest string value after
 * the specified delay has passed since the last change.
 *
 * @param {string} value - The category value to debounce.
 * @param {number} [delay=300] - The delay in milliseconds. Defaults to 300ms.
 * @returns {string} The debounced category value.
 */
const useDebouncedCategoryFilter = (value, delay = 300) => {
  if (typeof delay !== 'number' || delay < 0) {
    console.warn('useDebouncedCategoryFilter: The delay must be a non-negative number. Defaulting to 300ms.');
    delay = 300; // Default to 300ms if delay is invalid
  }
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    if (typeof value !== 'string') {
      console.warn('Expected a string value for category filter');
      return;
    }

    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler); // Clear the timeout on unmount or if value/delay changes
    };
  }, [value, delay]);

  return debouncedValue;
};

export default useDebouncedCategoryFilter;
