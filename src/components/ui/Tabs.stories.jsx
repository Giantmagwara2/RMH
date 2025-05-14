import React from 'react';
import Tabs from './Tabs';

export default {
  title: 'UI/Tabs',
  component: Tabs,
};

export const Default = () => (
  <Tabs>
    <Tabs.Tab>Tab 1</Tabs.Tab>
    <Tabs.Tab>Tab 2</Tabs.Tab>
    <Tabs.Tab>Tab 3</Tabs.Tab>
    <div>Content for Tab 1</div>
    <div>Content for Tab 2</div>
    <div>Content for Tab 3</div>
  </Tabs>
);

export const DefaultActiveTab = () => (
  <Tabs defaultActiveTab={1}>
    <Tabs.Tab>Tab 1</Tabs.Tab>
    <Tabs.Tab>Tab 2</Tabs.Tab>
    <Tabs.Tab>Tab 3</Tabs.Tab>
    <div>Content for Tab 1</div>
    <div>Content for Tab 2</div>
    <div>Content for Tab 3</div>
  </Tabs>
);

export const CustomActiveTabStyles = () => (
  <Tabs>
    <Tabs.Tab>Custom Tab 1</Tabs.Tab>
    <Tabs.Tab>Custom Tab 2</Tabs.Tab>
    <Tabs.Tab>Custom Tab 3</Tabs.Tab>
    <div>Custom Content for Tab 1</div>
    <div>Custom Content for Tab 2</div>
    <div>Custom Content for Tab 3</div>
  </Tabs>
);
