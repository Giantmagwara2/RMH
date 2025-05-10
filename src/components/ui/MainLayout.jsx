// /src/layouts/MainLayout.jsx
import React from 'react';
import Navbar from '../components/ui/Navbar';
import Link from '../components/ui/Link';

const MainLayout = ({ children }) => (
  <div>
    <Navbar
      logo={<div className="text-lg font-bold text-text-primary">RocVille</div>}
    />
    <main className="mt-navbar">{children}</main>
  </div>
);

export default MainLayout;
