import React from 'react';
import Table from './Table';

export default {
  title: 'UI/Table',
  component: Table,
};

const columns = [
  { key: 'name', header: 'Name' },
  { key: 'email', header: 'Email' },
  { key: 'role', header: 'Role' },
];

const sampleData = [
  { name: 'Alice Johnson', email: 'alice@example.com', role: 'Designer' },
  { name: 'Bob Smith', email: 'bob@example.com', role: 'Developer' },
  { name: 'Carol Lee', email: 'carol@example.com', role: 'Product Manager' },
];

export const Default = () => <Table columns={columns} data={sampleData} />;
