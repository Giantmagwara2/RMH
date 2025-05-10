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
