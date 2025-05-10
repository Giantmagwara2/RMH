import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Link from './Link';

export default {
  title: 'UI/Link',
  component: Link,
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
};

export const Default = () => (
  <div className="space-x-4">
    <Link to="/">Home</Link>
    <Link to="/portfolio">Portfolio</Link>
    <Link to="/contact">Contact</Link>
  </div>
);

export const WithCustomClass = () => (
  <div className="space-x-4">
    <Link to="/" className="text-red-500">
      Home
    </Link>
    <Link to="/portfolio" className="text-blue-500">
      Portfolio
    </Link>
    <Link to="/contact" className="text-green-500">
      Contact
    </Link>
  </div>
);
