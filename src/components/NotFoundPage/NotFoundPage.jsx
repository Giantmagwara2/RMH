// src/components/NotFoundPage/NotFoundPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants'; // Assuming ROUTES are defined

const NotFoundPage = () => {
  return (
    <div
      className="relative flex flex-col items-center justify-center min-h-screen p-6 text-center bg-gradient-to-br from-electric-blue to-indigo-500 dark:from-midnight-blue dark:to-rich-black overflow-hidden"
      role="alert" // Indicate to screen readers this is an alert/status page
    >
      {/* 404 Heading */}
      <h1 className="mb-4 text-7xl font-extrabold md:text-8xl lg:text-9xl text-soft-white drop-shadow-lg animate-fadeIn">
        404
      </h1>
      <p className="mb-4 text-xl font-semibold text-gray-200 md:text-2xl lg:text-3xl animate-fadeIn animation-delay-200">
        Oops! Page Not Found.
      </p>
      <p className="max-w-xl mb-8 text-base leading-relaxed text-gray-300 md:text-lg animate-fadeIn animation-delay-400">
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </p>

      {/* Decorative SVG */}
      {/* Ensure these absolute elements don't interfere with content on small screens */}
      <div className="absolute top-0 left-0 rounded-full w-72 h-72 bg-highlight-yellow opacity-20 blur-3xl animate-fadeIn"></div>
      <div className="absolute bottom-0 right-0 rounded-full w-96 h-96 bg-electric-blue opacity-10 blur-2xl animate-fadeIn animation-delay-200"></div>

      {/* Navigation Links */}
      <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 animate-fadeIn animation-delay-600">
        <Link
          to={ROUTES.HOME} // Use constant for path
          className="px-8 py-3 font-semibold transition duration-300 rounded-md shadow-md bg-soft-white text-electric-blue hover:bg-gray-100 hover:text-blue-700 dark:bg-highlight-yellow dark:text-rich-black dark:hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-electric-blue dark:focus:ring-highlight-yellow focus:ring-offset-2"
          aria-label="Go to Homepage"
        >
          Go to Homepage
        </Link>
        {/* Add another link, e.g., to Blog or Services */}
        <Link
          to={ROUTES.BLOG} // Example: Link to the blog page
          className="px-8 py-3 font-semibold transition duration-300 rounded-md shadow-md bg-gray-200 text-gray-700 hover:bg-gray-300 hover:text-gray-800 dark:bg-zinc-700 dark:text-gray-200 dark:hover:bg-zinc-600 focus:outline-none focus:ring-2 focus:ring-gray-500 dark:focus:ring-gray-400 focus:ring-offset-2"
          aria-label="Visit our Blog"
        >
          Visit Our Blog
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;