// src/hooks/useDebouncedCategoryFilter.js
import { useState, useEffect } from 'react';

const useDebouncedCategoryFilter = (value, delay = 300) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value); // Update debounced value after delay
    }, delay);

    // Cleanup the timeout on component unmount or when value changes
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // Re-run effect when value or delay changes

  return debouncedValue;
};

export default useDebouncedCategoryFilter;
