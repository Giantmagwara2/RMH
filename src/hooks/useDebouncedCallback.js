// src/hooks/useDebouncedCallback.js
import { useMemo } from 'react';
import { debounce } from 'lodash';
import PropTypes from 'prop-types'; // Although not used directly in the hook, good practice for related components/tests

/**
 * Custom hook that debounces a callback function.
 * It returns a memoized version of the callback that delays invoking
 * `callback` until after `delay` milliseconds have elapsed since the last
 * time the debounced function was invoked.
 *
 * Note: This hook relies on the `lodash.debounce` function.
 *
 * @param {Function} callback - The function to debounce.
 * @param {number} delay - The number of milliseconds to delay.
 * @returns {Function} Returns the new debounced function.
 */
export default function useDebouncedCallback(callback, delay) {
  return useMemo(() => debounce(callback, delay, { leading: false, trailing: true }), [callback, delay]);
}