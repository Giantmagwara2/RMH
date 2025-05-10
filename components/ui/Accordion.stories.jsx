import React from 'react';
import Accordion from './Accordion';

export default {
  title: 'UI/Accordion',
  component: Accordion,
};

const sampleItems = [
  {
    title: 'What is RocVille Media House?',
    content: 'RocVille Media House is a creative powerhouse delivering digital media, tech, and storytelling innovations.',
  },
  {
    title: 'What services do you offer?',
    content: 'We offer branding, web design, content creation, podcast production, and AI-driven business tools.',
  },
  {
    title: 'Where are you based?',
    content: 'We’re proudly based in Africa, with a global digital reach.',
  },
];

export const Default = () => <Accordion items={sampleItems} />;
