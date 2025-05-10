// src/components/Layout/Layout.jsx
import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col antialiased transition-colors duration-300 overflow-x-hidden">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;