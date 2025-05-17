import React from 'react';
import Accordion from './Accordion';
import { PlusIcon, MinusIcon, SparklesIcon } from '@heroicons/react/24/outline'; // Example custom icons

export default {
  title: 'UI/Accordion',
  component: Accordion,
  argTypes: {
    items: { control: 'object', description: 'Array of accordion items (title, content, id)' },
    className: { control: 'text', description: 'Custom CSS classes for the accordion wrapper' },
    allowMultipleOpen: { control: 'boolean', description: 'Allow multiple accordion items to be open simultaneously' },
    buttonClassName: { control: 'text', description: 'Custom CSS classes for accordion item buttons' },
    contentClassName: { control: 'text', description: 'Custom CSS classes for accordion item content areas' },
    // IconComponent cannot be easily controlled via Storybook's default controls,
    // so we'll demonstrate it with a specific story.
    iconClassName: { control: 'text', description: 'Custom CSS classes for the expand/collapse icon' },
  },
};

const sampleItems = [
  {
    id: 'what-is-rmh',
    title: 'What is RocVille Media House?',
    content: 'RocVille Media House is a creative powerhouse delivering digital media, tech, and storytelling innovations.',
  },
  {
    id: 'services-offered',
    title: 'What services do you offer?',
    content: 'We offer branding, web design, content creation, podcast production, and AI-driven business tools.',
  },
  {
    id: 'location',
    title: 'Where are you based?',
    content: 'We’re proudly based in Africa, with a global digital reach.',
  },
  {
    id: 'html-content-example',
    title: <span>What about <strong>HTML</strong> in titles?</span>,
    content: (
      <p>
        You can use <em>rich HTML content</em> directly within the content prop. 
        This allows for lists, paragraphs, and other formatting.
        <ul>
          <li>Like this list item.</li>
          <li>And another one.</li>
        </ul>
      </p>
    ),
  }
];

const Template = (args) => <Accordion {...args} />;

export const Default = Template.bind({});
Default.args = {
  items: sampleItems,
};
Default.storyName = 'Default (Single Open)';

export const AllowMultipleOpen = Template.bind({});
AllowMultipleOpen.args = {
  items: sampleItems,
  allowMultipleOpen: true,
};
AllowMultipleOpen.storyName = 'Allow Multiple Open Items';

export const WithCustomStyling = Template.bind({});
WithCustomStyling.args = {
  items: sampleItems,
  className: 'border-2 border-brand-accent dark:border-brand-primary rounded-lg shadow-lg overflow-hidden',
  buttonClassName: 'hover:bg-brand-primary-50 dark:hover:bg-brand-primary-900 text-lg',
  contentClassName: 'bg-neutral-50 dark:bg-neutral-800 text-sm',
  iconClassName: 'text-brand-accent dark:text-brand-primary',
};
WithCustomStyling.storyName = 'Custom Styling';

export const WithCustomIcons = Template.bind({});
WithCustomIcons.args = {
  items: sampleItems,
  // The IconComponent receives `isOpen` and `className` props.
  // The `className` prop from AccordionItem already handles rotation for the default icon.
  // For custom icons like Plus/Minus, you'd typically ignore the rotation class
  // and just use `isOpen` to switch between icons.
  IconComponent: ({ isOpen, className: inheritedClassName }) => {
    // We only take the color/size part of the inheritedClassName, not the rotation.
    const baseIconClasses = inheritedClassName.split(' ').filter(cls => !cls.startsWith('rotate-')).join(' ');
    return isOpen ? <MinusIcon className={baseIconClasses} /> : <PlusIcon className={baseIconClasses} />;
  },
  iconClassName: 'text-semantic-success w-6 h-6', // Example: Green plus/minus icons
};
WithCustomIcons.storyName = 'Custom Icons (Plus/Minus)';

export const WithDifferentCustomIcon = Template.bind({});
WithDifferentCustomIcon.args = {
  items: sampleItems,
  IconComponent: SparklesIcon, // Using a different Heroicon directly
  iconClassName: 'text-semantic-info w-5 h-5', // Blue sparkles
  allowMultipleOpen: true,
};
WithDifferentCustomIcon.storyName = 'Different Custom Icon (Sparkles)';

// Added a story to demonstrate keyboard navigation and accessibility
export const AccessibleAccordion = Template.bind({});
AccessibleAccordion.args = {
  items: sampleItems,
  className: 'border border-gray-300 rounded-md',
  buttonClassName: 'focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary',
};
AccessibleAccordion.storyName = 'Accessible Accordion';
