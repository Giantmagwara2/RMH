import React from 'react';
import Tabs from './Tabs';

export default {
  title: 'UI/Tabs',
  component: Tabs,
  argTypes: {
    defaultActiveTab: {
      control: 'number',
      description: 'The index of the tab to be active by default (0-indexed).',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes to apply to the Tabs container.',
    },
    children: {
      control: false, // Disable control for children as it's complex JSX
      description: 'Child <Tabs.Tab> components. Each Tab.Tab should have a `title` prop and can contain content as its children.',
    },
  },
};

// Define a common set of tab children to reuse in stories
const commonTabChildren = (
  <>
    <Tabs.Tab title="Overview">
      <div className="p-space-md">
        This is the content for the Overview tab. It provides a general summary.
      </div>
    </Tabs.Tab>
    <Tabs.Tab title="Details">
      <div className="p-space-md">
        Detailed information can be found here. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </div>
    </Tabs.Tab>
    <Tabs.Tab title="Settings">
      <div className="p-space-md">
        Configure your settings in this section. Adjust preferences as needed.
      </div>
    </Tabs.Tab>
  </>
);

const Template = (args) => <Tabs {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: commonTabChildren,
  defaultActiveTab: 0,
  className: '',
};

export const DefaultActiveSecondTab = Template.bind({});
DefaultActiveSecondTab.storyName = 'Default Active Tab (Second)';
DefaultActiveSecondTab.args = {
  ...Default.args,
  defaultActiveTab: 1,
};

export const CustomStyling = Template.bind({});
CustomStyling.storyName = 'Tabs with Custom Styling';
CustomStyling.args = {
  defaultActiveTab: 0,
  className: 'bg-neutrals-surface-accent p-space-sm rounded-lg shadow-md', // Custom class for Tabs container
  children: (
    <>
      <Tabs.Tab title="Styled Tab 1" className="font-semibold text-feedback-success-text hover:text-feedback-success-hover">
        <div className="p-space-md">Content for Styled Tab 1 with custom tab button styling.</div>
      </Tabs.Tab>
      {commonTabChildren.props.children[1]} {/* Reuse second tab from common */}
      <Tabs.Tab title="Another Tab" className="text-feedback-error-text">
        <div className="p-space-md">Content for another distinctively styled tab.</div>
      </Tabs.Tab>
    </>
  ),
};
