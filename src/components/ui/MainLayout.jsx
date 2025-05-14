// /src/layouts/MainLayout.jsx
import React from 'react';
import Navbar from '../components/ui/Navbar';
import Link from '../components/ui/Link';
import Footer from '../components/ui/Footer';

const MainLayout = ({ children }) => (
  <div className="flex flex-col min-h-screen">
    <Navbar
      logo={<div className="text-lg font-bold text-text-primary">RocVille</div>}
    />
    <main className="flex-grow mt-navbar">{children}</main>
    <Footer />
  </div>
);

export default MainLayout;
