// src/hooks/useDebouncedCallback.js
import { useMemo } from 'react';
import { debounce } from 'lodash';

export default function useDebouncedCallback(callback, delay) {
  return useMemo(() => debounce(callback, delay), [callback, delay]);
}