import React from 'react';
import Breadcrumb from './Breadcrumb';

// Define component metadata for Storybook
export default {
  title: 'UI/Breadcrumb',
  component: Breadcrumb,
  argTypes: {
    separator: { control: 'text' },
  },
};

// Define a template for consistent story rendering
const Template = (args) => <Breadcrumb {...args} />;

// Create individual stories using the template
export const Default = Template.bind({});
Default.args = {
  items: [
    { label: 'Home', link: '/' },
    { label: 'Blog', link: '/blog' },
    { label: 'Post Title', link: '/blog/post-title' }, // Added a more realistic link
  ],
};
Default.parameters = {
  docs: {
    description: {
      story: 'Basic breadcrumb with links to different pages.',
    },
  },
};

export const CurrentPage = Template.bind({});
CurrentPage.args = {
  items: [
    { label: 'Home', link: '/' },
    { label: 'Blog', link: '/blog' },
    { label: 'Current Post' }, // No link for the current page
  ],
};
CurrentPage.parameters = {
  docs: {
    description: {
      story: 'Breadcrumb where the last item represents the current page and has no link.',
    },
  },
};

export const CustomSeparator = Template.bind({});
CustomSeparator.args = {
  items: [{ label: 'Home', link: '/' }, { label: 'Section', link: '/section' }, { label: 'Page' }],
  separator: '»',
};
