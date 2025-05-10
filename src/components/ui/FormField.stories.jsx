// FormField.stories.jsx
import React, { useState } from 'react';
import { FormField } from './FormField';
import { Input } from './Input';
import { Select } from './Select';
import { Textarea } from './Textarea';

export default {
  title: 'UI/FormField',
  component: FormField,
};

export const InputField = () => {
  const [value, setValue] = useState('');
  return (
    <FormField
      id="email"
      label="Email Address"
      helperText="We'll never share your email."
    >
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="name@example.com"
      />
    </FormField>
  );
};

export const SelectField = () => {
  const [value, setValue] = useState('');
  return (
    <FormField
      id="role"
      label="User Role"
      error={value === '' ? 'Please select a role.' : ''}
      required
    >
      <Select
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Select role"
        options={[
          { label: 'Admin', value: 'admin' },
          { label: 'Editor', value: 'editor' },
          { label: 'Viewer', value: 'viewer' },
        ]}
      />
    </FormField>
  );
};

export const TextareaField = () => {
  const [text, setText] = useState('');
  return (
    <FormField
      id="bio"
      label="Short Bio"
      helperText="Tell us a bit about yourself."
    >
      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write something..."
      />
    </FormField>
  );
};
