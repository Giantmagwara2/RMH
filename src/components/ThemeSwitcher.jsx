import React from 'react';
import { useDarkMode } from '../hooks/useDarkMode';

export function ThemeSwitcher() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <div className="p-4 bg-gray-100 rounded-md flex items-center justify-between">
      <span className="text-sm font-medium">Dark Mode</span>
      <button
        className={`w-10 h-5 flex items-center rounded-full p-1 ${
          isDarkMode ? 'bg-blue-500' : 'bg-gray-300'
        }`}
        onClick={toggleDarkMode}
      >
        <div
          className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${
            isDarkMode ? 'translate-x-5' : 'translate-x-0'
          }`}
        ></div>
      </button>
    </div>
  );
}
