// src/components/Footer/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import PropTypes from 'prop-types'; // Import PropTypes
import { ROUTES } from '../../constants'; // Assuming you have ROUTES defined

const Footer = () => {
  const socialLinks = [
    { href: "https://facebook.com/rocvillemedia", icon: faFacebookF, label: "Facebook" },
    { href: "https://twitter.com/rocvillemedia", icon: faTwitter, label: "Twitter" },
    { href: "https://instagram.com/rocvillemedia", icon: faInstagram, label: "Instagram" },
    { href: "https://linkedin.com/company/rocvillemedia", icon: faLinkedinIn, label: "LinkedIn" },
  ];

  const footerNavLinks = [
    { to: ROUTES.ABOUT, label: "About Us" },
    { to: ROUTES.CONTACT, label: "Contact" },
    // Add more links as needed, e.g., Privacy Policy, Terms of Service
    // { to: "/privacy-policy", label: "Privacy Policy" },
    // { to: "/terms-of-service", label: "Terms of Service" },
  ];

  return (
    <footer className="py-8 bg-surface text-text-secondary dark:bg-surface dark:text-text-secondary"> {/* Use token-based background and text colors */}
      <div className="container px-4 mx-auto"> {/* Use container utility */}
        <div className="flex flex-col items-center justify-between space-y-6 md:flex-row md:space-y-0">
          {/* Copyright */}
          <div className="text-sm text-center md:text-left">
            © {new Date().getFullYear()} RocVille Media House. All rights reserved.
          </div>

          {/* Footer Navigation */}
          {footerNavLinks.length > 0 && (
            <nav className="flex flex-wrap justify-center gap-4 md:gap-6">
              {footerNavLinks.map(link => (
                <Link
                  key={link.label}
                  to={link.to}
                  className="text-sm transition-colors duration-300 hover:text-brand-primary dark:hover:text-highlight"
                  // Use token-based hover colors
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          )}

          {/* Social Media Links */}
          <div className="flex items-center space-x-4">
            {socialLinks.map(social => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Follow us on ${social.label}`} // Good accessibility practice
                className="transition-colors duration-300 text-text-muted hover:text-brand-primary dark:hover:text-highlight"
                // Use token-based colors
              >
                <FontAwesomeIcon icon={social.icon} size="lg" />
              </a>
            ))}
          </div>
        </div>
        {/* Optional: Add a horizontal rule or separator */}
        {/* <hr className="my-6 border-gray-300 dark:border-gray-700" /> */}
        {/* Optional: Add a secondary footer row for legal links etc. */}
        {/* <div className="mt-4 text-xs text-center">...</div> */}

      </div>
    </footer>
  );
};

export default Footer;

// Add PropTypes for documentation and validation
Footer.propTypes = {
  // No props are currently defined for Footer.
};