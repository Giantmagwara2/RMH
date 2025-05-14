// src/hooks/useDebouncedCategoryFilter.js
import { useState, useEffect } from 'react';

const useDebouncedCategoryFilter = (value, delay = 300) => {
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
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

export default useDebouncedCategoryFilter;
