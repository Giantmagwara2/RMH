import React, { useState } from 'react';
import Select from './Select';

export default {
  title: 'UI/Select',
  component: Select,
};

const options = [
  { label: 'Frontend Developer', value: 'frontend' },
  { label: 'Backend Developer', value: 'backend' },
  { label: 'Fullstack Developer', value: 'fullstack' },
];

export const Default = () => {
  const [role, setRole] = useState('');

  return (
    <Select
      label="Role"
      name="role"
      options={options}
      value={role}
      onChange={(e) => setRole(e.target.value)}
      placeholder="Choose a role"
    />
  );
};

export const WithError = () => (
  <Select
    label="Role"
    name="role"
    options={options}
    value=""
    onChange={() => {}}
    error="This field is required"
  />
);

export const Disabled = () => (
  <Select
    label="Role"
    name="role"
    options={options}
    value=""
    onChange={() => {}}
    disabled
  />
);

export const DynamicOptions = () => {
  const [value, setValue] = useState('');
  const dynamicOptions = [
    { label: 'Dynamic A', value: 'dynamic-a' },
    { label: 'Dynamic B', value: 'dynamic-b' },
    { label: 'Dynamic C', value: 'dynamic-c' },
  ];

  return (
    <Select
      label="Dynamic Role"
      name="dynamic-role"
      options={dynamicOptions}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="Choose a dynamic role"
    />
  );
};
