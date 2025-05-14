// src/components/Layout/Layout.jsx
import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

// Define an ID for the main content area for the skip link
const MAIN_CONTENT_ID = 'main-content';

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden antialiased text-gray-800 transition-colors duration-300 bg-gray-50 dark:bg-gray-900 dark:text-gray-200">
      {/* Skip Link for Accessibility */}
      <a
        href={`#${MAIN_CONTENT_ID}`}
        className="absolute z-50 p-3 transition-transform duration-200 ease-in-out -translate-y-full bg-white rounded-md shadow-lg left-4 top-4 focus:translate-y-0 dark:bg-gray-800 text-electric-blue dark:text-highlight-yellow"
      >
        Skip to main content
      </a>

      {/* Header */}
      <Header />

      {/* Main Content */}
      <main
        id={MAIN_CONTENT_ID}
        className="container flex-grow px-4 py-8 mx-auto"
        role="main"
        aria-labelledby="main-heading"
      >
        {children}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Layout;