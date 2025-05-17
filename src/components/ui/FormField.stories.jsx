// FormField.stories.jsx
import React, { useState } from 'react';
import FormField from './FormField'; // Changed to default import
import Input from './Input'; // Assuming Input is a default export or this path is correct
import Select from './Select'; // Assuming Select is a default export or this path is correct
import Textarea from './Textarea'; // Assuming Textarea is a default export or this path is correct

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

export const CustomStyles = () => (
  <FormField
    id="custom"
    label="Custom Styled Field"
    helperText="This field has custom styles."
    className="p-4 bg-gray-100 rounded-md" // Changed customStyles to className
  >
    <Input placeholder="Custom input" />
  </FormField>
);

// Added a story to demonstrate custom styles and aria-describedby
export const CustomStyledField = () => (
  <FormField
    id="custom-field"
    label="Custom Field"
    helperText="This is a custom styled field."
    className="p-2 border border-blue-500 rounded" // Changed customStyles to className
  >
    <Input placeholder="Enter something..." />
  </FormField>
);
