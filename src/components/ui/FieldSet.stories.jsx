// /src/components/ui/FieldSet.stories.jsx
import React from 'react';
import FieldSet from './FieldSet';
import Input from './Input';

export default {
  title: 'UI/Form/FieldSet',
  component: FieldSet,
  argTypes: {
    legend: { control: 'text' },
    description: { control: 'text' },
    borderColor: { control: 'text' },
    backgroundColor: { control: 'text' },
  },
};

const Template = (args) => <FieldSet {...args}>
  {args.children}
</FieldSet>;

export const Default = Template.bind({});
Default.args = {
  legend: 'Contact Information',
  children: <>
    <Input label="Email" name="email" id="email" />
    <Input label="Phone" name="phone" id="phone" />
  </>,
};

export const WithDescription = Template.bind({});
WithDescription.args = {
  legend: 'Personal Info',
  description: 'This information will be used for your user profile.',
  children: <>
    <Input label="First Name" name="firstName" id="firstName" />
    <Input label="Last Name" name="lastName" id="lastName" />
  </>,
};

export const MultipleGroups = () => <div className="space-y-4">
  <FieldSet legend="Billing Address">
    <Input label="Street" name="billingStreet" id="billingStreet" />
    <Input label="City" name="billingCity" id="billingCity" />
  </FieldSet>
  <FieldSet legend="Shipping Address">
    <Input label="Street" name="shippingStreet" id="shippingStreet" />
    <Input label="City" name="shippingCity" id="shippingCity" />
  </FieldSet>
</div>;

export const CustomStyles = Template.bind({});
CustomStyles.args = {
  legend: 'Custom Styled FieldSet',
  description: 'This FieldSet has custom styles applied.',
  borderColor: 'border-blue-500',
  backgroundColor: 'bg-blue-50',
  children: <Input label="Custom Input" name="customInput" id="customInput" />,
};
