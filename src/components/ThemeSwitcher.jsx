import React from 'react';
import { useDarkMode } from '../hooks/useDarkMode';
import { motion } from 'framer-motion';

// Simple SVG icons
const SunIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3 text-yellow-500">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-6.364-.386 1.591-1.591M3 12h2.25m.386-6.364 1.591 1.591" />
  </svg>
);

const MoonIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3 text-blue-300">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
  </svg>
);

export function ThemeSwitcher() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <motion.div 
      className="flex items-center justify-center p-2 transition-colors duration-300 bg-gray-100 rounded-full cursor-pointer dark:bg-gray-700"
      onClick={toggleDarkMode}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label={`Toggle ${isDarkMode ? 'Light Mode' : 'Dark Mode'}`}
      role="button"
    >
      <motion.div
        className="relative w-6 h-6 bg-white rounded-full shadow-inner"
        variants={{
          light: { x: 0 },
          dark: { x: 20 },
        }}
        animate={isDarkMode ? 'dark' : 'light'}
        transition={{ type: "spring", stiffness: 700, damping: 30 }}
      >
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          variants={{
            light: { opacity: 1 },
            dark: { opacity: 0 },
          }}
          animate={isDarkMode ? 'dark' : 'light'}
          transition={{ duration: 0.2 }}
        >
          <SunIcon />
        </motion.div>
        <motion.div className="absolute inset-0 flex items-center justify-center"
          variants={{ light: { opacity: 0 }, dark: { opacity: 1 } }}
          animate={isDarkMode ? 'dark' : 'light'}
          transition={{ duration: 0.2 }}
        ><MoonIcon /></motion.div>
      </motion.div>
    </motion.div>
  );
}
