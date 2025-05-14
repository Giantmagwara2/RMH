// App.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header/Header'; // Import the Header component
import Footer from './components/Footer/Footer'; // Import the Footer component

function App() {
  return (
    <div className="flex flex-col min-h-screen text-gray-800 bg-gray-50 dark:bg-gray-900 dark:text-gray-200">
      {/* Header */}
      <Header />
      {/* Diagnostic Text Start */}
      <div className="p-4 text-center">
        <p className="text-xl text-red-500 dark:text-yellow-300">DIAGNOSTIC: Light Mode Text (Red) / Dark Mode Text (Yellow)</p>
        <p className="text-neutral-textPrimary dark:text-neutral-textPrimary-dark">Test with neutral text primary.</p>
      </div>
      {/* Diagnostic Text End */}

      {/* Main Content */}
      <main className="container flex-grow px-4 py-8 mx-auto">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;