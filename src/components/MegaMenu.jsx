import React, { useState, useContext, createContext } from 'react';
import { motion } from 'framer-motion';

// Create a context for managing the MegaMenu state
const MegaMenuContext = createContext();

export function MegaMenuProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  return (
    <MegaMenuContext.Provider value={{ isOpen, toggleMenu }}>
      {children}
    </MegaMenuContext.Provider>
  );
}

export function useMegaMenu() {
  return useContext(MegaMenuContext);
}

export function MegaMenu() {
  const { isOpen, toggleMenu } = useMegaMenu();

  return (
    <div className="relative">
      <button
        onClick={toggleMenu}
        className="px-4 py-2 bg-blue-500 text-white rounded-md"
      >
        Menu
      </button>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute top-full left-0 w-full bg-white shadow-lg"
        >
          <ul className="p-4 space-y-2">
            <li className="hover:bg-gray-100 p-2 rounded-md">Service 1</li>
            <li className="hover:bg-gray-100 p-2 rounded-md">Service 2</li>
            <li className="hover:bg-gray-100 p-2 rounded-md">Service 3</li>
          </ul>
        </motion.div>
      )}
    </div>
  );
}
