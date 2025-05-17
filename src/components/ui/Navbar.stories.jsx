import React from 'react';
import { BrowserRouter } from 'react-router-dom'; // Needed for RouterLink in Navbar
import Navbar from './Navbar';

export default {
  title: 'UI/Navbar',
  component: Navbar,
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
  argTypes: {
    logo: {
      control: 'text', // Simple text control for logo, can be more complex if needed
      description: 'Logo element or text to display in the navbar.',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes for the navbar container.',
    },
    activePath: {
      control: 'text',
      description: "The path of the currently active link (e.g., '/portfolio').",
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'A responsive navigation bar. To test the mobile menu, use the Storybook viewport addon to simulate smaller screen sizes and interact with the menu toggle button.',
      },
    },
  },
};

const Template = (args) => <Navbar {...args} />;

export const Default = Template.bind({});
Default.args = {
  logo: <div className="text-lg font-bold text-text-primary dark:text-neutrals-light">RocVille</div>,
  activePath: '/', // Example: Home is active by default
};

export const WithActiveLink = Template.bind({});
WithActiveLink.args = {
  logo: <div className="text-lg font-bold text-text-primary dark:text-neutrals-light">RocVille</div>,
  activePath: '/portfolio', // Highlight the Portfolio link
};
WithActiveLink.storyName = 'Active Link Highlighted';

export const CustomClass = Template.bind({});
CustomClass.args = {
  logo: <div className="text-lg font-bold text-text-primary dark:text-neutrals-light">RocVille</div>,
  className: 'bg-brand-accent dark:bg-opacity-20', // Example custom background
  activePath: '/services',
};
