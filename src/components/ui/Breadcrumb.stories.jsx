import React from 'react';
import Breadcrumb from './Breadcrumb';

export default {
  title: 'UI/Breadcrumb',
  component: Breadcrumb,
};

export const Default = () => (
  <Breadcrumb
    items={[
      { label: 'Home', link: '/' },
      { label: 'Blog', link: '/blog' },
      { label: 'Post Title', link: '/post-title' },
    ]}
  />
);

export const CurrentPage = () => (
  <Breadcrumb
    items={[
      { label: 'Home', link: '/' },
      { label: 'Blog', link: '/blog' },
      { label: 'Post Title' }, {/* No link for current page */}
    ]}
  />
);

// Added a story to demonstrate custom separators and accessibility
export const CustomSeparator = () => (
  <Breadcrumb
    items={[
      { label: 'Home', link: '/' },
      { label: 'Blog', link: '/blog' },
      { label: 'Post Title' },
    ]}
    separator=">"
  />
);
