import React from 'react';
import Tabs from './Tabs';

export default {
  title: 'UI/Tabs',
  component: Tabs,
};

export const Default = () => (
  <Tabs>
    <Tabs.Tab title="Tab 1">
      <div>Content for Tab 1</div>
    </Tabs.Tab>
    <Tabs.Tab title="Tab 2">
      <div>Content for Tab 2</div>
    </Tabs.Tab>
    <Tabs.Tab title="Tab 3">
      <div>Content for Tab 3</div>
    </Tabs.Tab>
  </Tabs>
);

export const DefaultActiveTab = () => (
  <Tabs defaultActiveTab={1}>
    <Tabs.Tab title="Tab 1">
      <div>Content for Tab 1</div>
    </Tabs.Tab>
    <Tabs.Tab title="Tab 2">
      <div>Content for Tab 2</div>
    </Tabs.Tab>
    <Tabs.Tab title="Tab 3">
      <div>Content for Tab 3</div>
    </Tabs.Tab>
  </Tabs>
);

// CustomActiveTabStyles story would now involve passing custom classNames to Tabs or Tab components
// if you add such props to them, or by targeting their base classes with global CSS.
// For now, this story can be simplified or removed if not demonstrating a specific prop.
export const CustomActiveTabStyles = Default;
CustomActiveTabStyles.storyName = "Tabs (Styling via Tailwind)";
