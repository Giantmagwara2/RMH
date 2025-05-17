import React from 'react';
import Container from './Container'; // Changed to default import

export default {
  title: 'UI/Layout/Container',
  component: Container,
  argTypes: {
    as: {
      control: 'select',
      options: ['div', 'section', 'article', 'main', 'aside', 'header', 'footer'],
      description: 'The HTML element to render the container as.',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes for custom styling.',
    },
    children: {
      control: 'text', // Basic control for simple text, can be more complex if needed
      description: 'Content to be rendered inside the container.',
    },
  },
};

const Template = (args) => <Container {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: (
    <div className="p-4 text-center bg-gray-100 rounded-md shadow-md dark:bg-gray-700">
      <p className="text-gray-800 dark:text-gray-200">This is content inside a Container component.</p>
    </div>
  ),
};

export const AsSection = Template.bind({});
AsSection.args = {
  as: 'section',
  className: 'py-8 bg-blue-50 dark:bg-blue-900',
  'aria-label': 'Featured Section', // Example of passing other props
  children: (
    <div className="p-4 text-center text-blue-800 bg-blue-100 rounded-md shadow-md dark:text-blue-200 dark:bg-blue-800">
      <h2 className="mb-2 text-xl font-semibold">This Container is a &lt;section&gt;</h2>
      <p>It demonstrates the polymorphic 'as' prop.</p>
    </div>
  ),
};

export const WithCustomStyling = Template.bind({});
WithCustomStyling.args = {
  className: 'border-2 border-dashed border-red-500 p-8',
  children: (
    <div className="p-4 text-center rounded-md bg-red-50 dark:bg-red-900">
      <p className="text-red-700 dark:text-red-300">This Container has custom border and padding.</p>
    </div>
  ),
};
