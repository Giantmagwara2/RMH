// src/components/Footer/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faFacebook, faLinkedin, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faArrowUp } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
  return (
    <footer className="bg-rich-black text-soft-white py-12 mt-section">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {/* Contact Info */}
        <div>
          <h3 className="font-display text-lg font-semibold mb-4">Contact Us</h3>
          <address className="text-sm not-italic">
            123 Creative Lane<br />
            Innovation City, ZA 54321<br />
            <a href="mailto:info@rocvillemedia.com" className="hover:text-highlight-yellow transition-colors">
              <FontAwesomeIcon icon={faEnvelope} className="mr-2" /> info@rocvillemedia.com
            </a><br />
            <a href="tel:+27123456789" className="hover:text-highlight-yellow transition-colors">
              +27 12 345 6789
            </a>
          </address>
        </div>

        {/* Sitemap */}
        <div>
          <h3 className="font-display text-lg font-semibold mb-4">Sitemap</h3>
          <ul className="text-sm space-y-2">
            <li>
              <Link to={ROUTES.HOME} className="hover:text-highlight-yellow transition-colors">Home</Link>
            </li>
            <li>
              <Link to={ROUTES.SERVICES} className="hover:text-highlight-yellow transition-colors">Services</Link>
            </li>
            <li>
              <Link to={ROUTES.PORTFOLIO} className="hover:text-highlight-yellow transition-colors">Portfolio</Link>
            </li>
            <li>
              <Link to={ROUTES.ABOUT} className="hover:text-highlight-yellow transition-colors">About</Link>
            </li>
            <li>
              <Link to={ROUTES.CONTACT} className="hover:text-highlight-yellow transition-colors">Contact</Link>
            </li>
            <li>
              <Link to={ROUTES.BLOG} className="hover:text-highlight-yellow transition-colors">Blog</Link>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="font-display text-lg font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-highlight-yellow transition-colors">
              <FontAwesomeIcon icon={faTwitter} size="lg" />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-highlight-yellow transition-colors">
              <FontAwesomeIcon icon={faFacebook} size="lg" />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-highlight-yellow transition-colors">
              <FontAwesomeIcon icon={faLinkedin} size="lg" />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-highlight-yellow transition-colors">
              <FontAwesomeIcon icon={faInstagram} size="lg" />
            </a>
          </div>
        </div>

        {/* Newsletter Signup (Optional) */}
        <div>
          <h3 className="font-display text-lg font-semibold mb-4">Newsletter</h3>
          <p className="text-sm text-gray-400 mb-2">Subscribe to our newsletter for updates and insights.</p>
          <div className="flex">
            <input
              type="email"
              placeholder="Your Email"
              className="bg-midnight-blue text-soft-white border border-gray-600 rounded-l-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-highlight-yellow"
            />
            <button className="bg-highlight-yellow text-rich-black rounded-r-md py-2 px-4 font-semibold hover:bg-yellow-500 transition-colors focus:outline-none focus:ring-2 focus:ring-highlight-yellow">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Footer Section */}
      <div className="mt-8 py-4 border-t border-gray-700 text-center text-sm text-gray-400">
        <p>&copy; {new Date().getFullYear()} RocVille. All rights reserved.</p>
        <Link to="#" className="inline-flex items-center mt-2 hover:text-highlight-yellow transition-colors">
          <FontAwesomeIcon icon={faArrowUp} className="mr-2" /> Back to Top
        </Link>
      </div>
    </footer>
  );
};

export default Footer;