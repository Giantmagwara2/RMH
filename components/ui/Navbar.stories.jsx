import React from 'react';
import Navbar from './Navbar';

export default {
  title: 'UI/Navbar',
  component: Navbar,
};

export const Default = () => (
  <Navbar
    logo={<div className="text-lg font-bold text-text-primary">RocVille</div>}
  />
);

export const MobileMenuOpen = () => {
  // Force-open the mobile menu by simulating a click
  const [mobileOpen, setMobileOpen] = React.useState(true);

  return (
    <div className="h-screen">
      <Navbar
        logo={<div className="text-lg font-bold text-text-primary">RocVille</div>}
      />
      {mobileOpen && (
        <div className="absolute left-0 right-0 shadow-md md:hidden top-full bg-neutrals-surface">
          <div className="px-space-md py-space-sm space-y-space-sm">
            {['Home', 'Portfolio', 'Services', 'Contact'].map((label) => (
              <a
                key={label}
                href={`/${label.toLowerCase()}`}
                className="block transition-colors text-text-primary hover:bg-neutrals-border"
                onClick={() => setMobileOpen(false)}
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
