import { useEffect } from 'react';

export const usePerformanceMonitoring = () => {
  useEffect(() => {
    // Core Web Vitals monitoring
    if ('PerformanceObserver' in window) {
      try {
        const observer = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry) => {
            // Example: send metrics to an analytics service
            sendMetricsToAnalyticsService({ name: entry.name, value: entry.value });
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
        const interactive = timing.domInteractive - timing.navigationStart;
        const dcl = timing.domContentLoadedEventEnd - timing.navigationStart;
        const complete = timing.domComplete - timing.navigationStart;

        const metrics = {
          TimeToInteractive: interactive,
          DCL: dcl,
          LoadComplete: complete,
        };

        sendMetricsToAnalyticsService(metrics);
      }, 0);
    };

    window.addEventListener('load', handleLoad);

    return () => {
      window.removeEventListener('load', handleLoad);
    };
  }, []);
};
