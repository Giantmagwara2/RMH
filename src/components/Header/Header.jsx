// src/components/Header/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants/routes'; // Import ROUTES
import logo from '../../assets/logo.png'; // Import logo

const Header = () => {
  return (
    <header className="bg-white shadow-md py-4">
      <nav className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        <Link to={ROUTES.HOME} className="flex items-center">
          <img src={logo} alt="RocVille Media House" className="h-12 w-auto mr-2" />
          <span className="text-2xl font-bold text-electric-blue">RocVille</span>
        </Link>
        <div className="space-x-4">
          <Link to={ROUTES.HOME} className="text-gray-700 hover:text-electric-blue">Home</Link>
          <Link to={ROUTES.SERVICES} className="text-gray-700 hover:text-electric-blue">Services</Link>
          <Link to={ROUTES.PORTFOLIO} className="text-gray-700 hover:text-electric-blue">Portfolio</Link>
          <Link to={ROUTES.ABOUT} className="text-gray-700 hover:text-electric-blue">About</Link>
          <Link to={ROUTES.CONTACT} className="text-gray-700 hover:text-electric-blue">Contact</Link>
          <Link to={ROUTES.BLOG} className="text-gray-700 hover:text-electric-blue">Blog</Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;