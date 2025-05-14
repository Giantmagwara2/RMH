// src/hooks/useDebounce.js
import { useState, useEffect, useRef } from 'react';

function useDebounce(value, delay) {
  if (typeof delay !== 'number' || delay < 0) {
    console.warn('The delay must be a positive number.');
    delay = 300; // Default to 300ms if invalid
  }

  const [debouncedValue, setDebouncedValue] = useState(value);
  const handlerRef = useRef(null);

  useEffect(() => {
    handlerRef.current = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      if (handlerRef.current) {
        clearTimeout(handlerRef.current);
      }
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;