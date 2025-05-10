import React from 'react';
import Spinner from './Spinner';

export default {
  title: 'UI/Spinner',
  component: Spinner,
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
};

const Template = (args) => <Spinner {...args} />;

export const Default = Template.bind({});
Default.args = { size: 'md' };

export const Small = Template.bind({});
Small.args = { size: 'sm' };

export const Large = Template.bind({});
Large.args = { size: 'lg' };
