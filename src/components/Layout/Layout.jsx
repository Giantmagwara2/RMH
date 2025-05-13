// src/components/Layout/Layout.jsx
import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

// Define an ID for the main content area for the skip link
const MAIN_CONTENT_ID = 'main-content';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col antialiased transition-colors duration-300 overflow-x-hidden">
      <a
        href={`#${MAIN_CONTENT_ID}`}
        className="absolute z-50 left-4 top-4 -translate-y-full focus:translate-y-0 p-3 bg-white dark:bg-neutral-900 text-brand-primary dark:text-brand-accent shadow-lg rounded-md transition-transform duration-200 ease-in-out"
        // Alternatively, for a simpler hide/show:
        // className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:p-3 focus:bg-white focus:text-blue-600 focus:rounded focus:shadow-md"
      >
        Skip to main content
      </a>
      <Header />
      <main id={MAIN_CONTENT_ID} className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;