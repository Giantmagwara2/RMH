import React from 'react';
import Table from './Table';

export default {
  title: 'UI/Table',
  component: Table,
  argTypes: {
    columns: { control: 'object' },
    data: { control: 'object' },
    striped: { control: 'boolean' },
    className: { control: 'text' },
  },
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

const Template = (args) => <Table {...args} />;

export const Default = Template.bind({});
Default.args = {
  columns: columns,
  data: sampleData,
  striped: false,
  className: '',
};

export const StripedRows = Template.bind({});
StripedRows.args = {
  ...Default.args, // Inherit default args
  striped: true,
};

export const EmptyData = Template.bind({});
EmptyData.args = {
  ...Default.args,
  data: [],
  striped: false,
};
