import React, { Suspense } from 'react';

const SuspenseWrapper = ({ children }) => (
  <Suspense fallback={<div className="text-lg text-center text-gray-600 dark:text-gray-300">Loading...</div>}>
    {children}
  </Suspense>
);

export default SuspenseWrapper;
