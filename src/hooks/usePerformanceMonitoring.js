
import { useEffect } from 'react';

export const usePerformanceMonitoring = () => {
  useEffect(() => {
    // Core Web Vitals monitoring
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          // Log vital metrics
          console.log(`${entry.name}: ${entry.value}`);
        });
      });
      
      observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });
    }

    // Page load metrics
    window.addEventListener('load', () => {
      setTimeout(() => {
        const timing = performance.timing;
        const interactive = timing.domInteractive - timing.navigationStart;
        const dcl = timing.domContentLoadedEventEnd - timing.navigationStart;
        const complete = timing.domComplete - timing.navigationStart;
        
        console.log({
          TimeToInteractive: interactive,
          DCL: dcl,
          LoadComplete: complete,
        });
      }, 0);
    });
  }, []);
};
