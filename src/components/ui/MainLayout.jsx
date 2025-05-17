// /src/layouts/MainLayout.jsx
import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import Navbar from '../ui/Navbar'; // Adjusted path assuming Navbar is in ui
import Footer from '../ui/Footer'; // Adjusted path assuming Footer is in ui
// Link import is not directly used by MainLayout, but likely by Navbar or Footer

const MainLayout = ({ children }) => (
  <div className="flex flex-col min-h-screen">
    <Navbar
      logo={<div className="text-lg font-bold text-text-primary">RocVille</div>}
    />
    <main className="flex-grow mt-navbar">{children}</main>
    <Footer />
  </div>
);

MainLayout.propTypes = {
  children: PropTypes.node.isRequired, // Children are required
};

MainLayout.displayName = 'MainLayout'; // For better debugging

export default MainLayout;
