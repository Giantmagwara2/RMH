// /src/components/ui/Card.stories.jsx
import React from 'react';
import Card from './Card';
import Button from './Button';

export default {
  title: 'UI/Card',
  component: Card,
  argTypes: {
    actions: {
      control: { type: 'array' }, // Can pass multiple actions
    },
    image: {
      control: { type: 'text' },
      description: 'Image URL for the card',
    },
    title: {
      control: { type: 'text' },
    },
    content: {
      control: { type: 'text' },
    },
  },
};

const Template = (args) => <Card {...args} />;

export const BasicCard = Template.bind({});
BasicCard.args = {
  title: 'Card Title',
  content: 'This is a simple card with a title and content.',
};

export const CardWithImage = Template.bind({});
CardWithImage.args = {
  title: 'Card with Image',
  content: 'This card has an image and text content.',
  image: 'https://via.placeholder.com/400x200',
};

export const CardWithActions = Template.bind({});
CardWithActions.args = {
  title: 'Card with Actions',
  content: 'This card has buttons as actions.',
  actions: [
    <Button variant="primary" size="sm">Action 1</Button>,
    <Button variant="secondary" size="sm">Action 2</Button>
  ],
};

export const CardWithImageAndActions = Template.bind({});
CardWithImageAndActions.args = {
  title: 'Card with Image and Actions',
  content: 'This card includes both an image and action buttons.',
  image: 'https://via.placeholder.com/400x200',
  actions: [
    <Button variant="primary" size="sm">Primary Action</Button>,
    <Button variant="secondary" size="sm">Secondary Action</Button>
  ],
};
