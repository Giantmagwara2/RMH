// src/hooks/useDebounce.js
import { useState, useEffect, useRef } from 'react';

/**
 * Custom hook that debounces a value.
 * The debounced value will only reflect the latest value when the useDebounce
 * hook has not been called for the specified delay period.
 *
 * @template T
 * @param {T} value - The value to debounce.
 * @param {number} delay - The delay in milliseconds.
 * @returns {T} The debounced value.
 */
function useDebounce(value, delay) {
  if (typeof delay !== 'number' || delay < 0) {
    console.warn('useDebounce: The delay must be a non-negative number. Defaulting to 300ms.');
    delay = 300; // Default to 300ms if delay is invalid
  }

  const [debouncedValue, setDebouncedValue] = useState(value);
  const handlerRef = useRef(null);

  useEffect(() => {
    handlerRef.current = setTimeout(() => {
      // Only update if the value has actually changed to avoid unnecessary re-renders
      // if the parent component re-renders but the value prop remains the same.
      // However, useState's setter already handles this optimization.
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handlerRef.current); // Clear the timeout on unmount or if value/delay changes
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;