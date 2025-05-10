// /src/components/ui/FieldSet.stories.jsx
import React from 'react';
import { FieldSet } from './FieldSet';
import { Input } from './Input';

export default {
  title: 'UI/Form/FieldSet',
  component: FieldSet,
};

export const Default = () => (
  <FieldSet legend="Contact Information">
    <Input label="Email" name="email" id="email" />
    <Input label="Phone" name="phone" id="phone" />
  </FieldSet>
);

export const WithDescription = () => (
  <FieldSet
    legend="Personal Info"
    description="This information will be used for your user profile."
  >
    <Input label="First Name" name="firstName" id="firstName" />
    <Input label="Last Name" name="lastName" id="lastName" />
  </FieldSet>
);

export const MultipleGroups = () => (
  <div className="space-y-space-lg">
    <FieldSet legend="Billing Address">
      <Input label="Street" name="billingStreet" id="billingStreet" />
      <Input label="City" name="billingCity" id="billingCity" />
    </FieldSet>
    <FieldSet legend="Shipping Address">
      <Input label="Street" name="shippingStreet" id="shippingStreet" />
      <Input label="City" name="shippingCity" id="shippingCity" />
    </FieldSet>
  </div>
);
