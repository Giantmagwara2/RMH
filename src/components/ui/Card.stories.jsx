// /src/components/ui/Card.stories.jsx
import React from 'react';
import Card from '../Card'; // Adjusted import path assuming Card.jsx is in ../
import Button from '../Button'; // Import Button for actions example

export default {
  title: 'UI/Card',
  component: Card,
  argTypes: {
    title: { control: 'text', description: 'Title of the card' },
    content: { control: 'text', description: 'Main content of the card' },
    image: { control: 'text', description: 'URL of the card image' },
    altText: { control: 'text', description: 'Alternative text for the image' },
    actions: {
      control: 'object',
      description: 'Array of action buttons (props for Button component)',
    },
    className: { control: 'text', description: 'Custom CSS classes' },
  },
};

const Template = (args) => <Card {...args} />;

export const BasicCard = Template.bind({});
BasicCard.args = { title: 'Basic Card', content: 'This is a simple card.' };

export const CardWithContent = Template.bind({});
CardWithContent.args = {
  title: 'Card with Content',
  content: 'This card has more detailed content. It can include multiple sentences and even paragraphs.',
};

export const CardWithImage = Template.bind({});
CardWithImage.args = {
  title: 'Card with Image',
  content: 'This card features a visually appealing image.',
  image: 'https://source.unsplash.com/random/400x200', // Replace with a relevant placeholder
  altText: 'A placeholder image',
};

export const CardWithActions = Template.bind({});
CardWithActions.args = {
  title: 'Card with Actions',
  content: 'This card includes action buttons for user interaction.',
  actions: [
    { children: 'View', variant: 'primary', onClick: () => alert('View action') },
    { children: 'Edit', variant: 'secondary', onClick: () => alert('Edit action') },
  ],
};

export const FullFeaturedCard = Template.bind({});
FullFeaturedCard.args = {
  title: 'Full Featured Card',
  content: 'This card combines an image, detailed content, and multiple actions.',
  image: 'https://source.unsplash.com/random/400x200',
  altText: 'A more descriptive alt text',
  actions: [
    { children: 'Learn More', variant: 'primary', onClick: () => alert('Learn More') },
    { children: 'Share', variant: 'default', onClick: () => alert('Share') },
  ],
};

export const CustomStyledCard = Template.bind({});
CustomStyledCard.args = {
  title: 'Custom Styled Card',
  content: 'This card has custom styling applied through CSS classes.',
  image: 'https://source.unsplash.com/random/400x200',
  altText: 'Styled image',
  className: 'bg-gradient-to-br from-purple-100 to-indigo-100 dark:from-purple-900 dark:to-indigo-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300',
};

export const CardWithoutContent = Template.bind({});
CardWithoutContent.args = {
  title: 'Card without Content',
  image: 'https://source.unsplash.com/random/400x200',
  altText: 'Image only card',
};
