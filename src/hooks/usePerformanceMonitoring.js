import { useEffect } from 'react';

/**
 * @callback SendMetricsFunction
 * @param {object} metrics - The performance metrics to send.
 * @param {string} [metrics.name] - The name of the metric (e.g., 'largest-contentful-paint').
 * @param {number} [metrics.value] - The value of the metric.
 * @param {string} [metrics.metricType] - The type of metric (e.g., 'web-vital', 'page-load').
 * @returns {void}
 */

/**
 * Custom hook to monitor Core Web Vitals and page load performance metrics.
 *
 * @param {SendMetricsFunction} [onMetricsCollected] - Optional callback function to send collected metrics to an analytics service.
 *        If not provided, metrics will be logged to the console.
 */
export const usePerformanceMonitoring = (onMetricsCollected) => {
  const sendMetrics = onMetricsCollected || ((metrics) => {
    console.log('Performance Metrics:', metrics); // Default to console logging if no callback provided
  });

  useEffect(() => {
    // Core Web Vitals monitoring
    if ('PerformanceObserver' in window) {
      try {
        const observer = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry) => {
            // Send Core Web Vitals metrics
            sendMetrics({ name: entry.name, value: entry.value, metricType: 'web-vital' });
          });
        });

        observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift', 'longtask'] }); // Added 'longtask' for monitoring long tasks
      } catch (error) {
        console.error('Error setting up PerformanceObserver:', error);
      }
    } else {
      console.warn('PerformanceObserver is not supported in this browser. Consider using a polyfill.'); // Added suggestion for polyfill
    }

    // Page load metrics
    const handleLoad = () => {
      setTimeout(() => {
        const timing = performance.timing;
        if (!timing) return; // performance.timing might be deprecated or unavailable in some contexts

        const navigationStart = timing.navigationStart;
        const timeToInteractive = timing.domInteractive - navigationStart;
        const domContentLoaded = timing.domContentLoadedEventEnd - navigationStart;
        const loadComplete = timing.domComplete - navigationStart;

        const metrics = {
          timeToInteractive,
          domContentLoaded,
          loadComplete,
          metricType: 'page-load',
        };
        sendMetrics(metrics);
      }, 0);
    };

    window.addEventListener('load', handleLoad);

    return () => {
      window.removeEventListener('load', handleLoad);
      // Note: PerformanceObserver does not need to be explicitly disconnected here if it's only observing.
      // If you were to call observer.disconnect() it would stop observing.
    };
  }, [sendMetrics]); // Add sendMetrics to dependency array as it can change if onMetricsCollected changes
};
