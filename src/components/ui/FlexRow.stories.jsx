// /src/components/ui/FlexRow.stories.jsx
import React from 'react';
import { FlexRow } from './FlexRow';

export default {
  title: 'UI/Layout/FlexRow',
  component: FlexRow,
};

export const Default = () => (
  <FlexRow gap="space-md">
    <div className="text-white rounded-md bg-primary-surface p-space-md">Item 1</div>
    <div className="text-white rounded-md bg-primary-surface p-space-md">Item 2</div>
  </FlexRow>
);

export const WithAlignment = () => (
  <div className="h-32 bg-neutrals-border p-space-sm">
    <FlexRow gap="space-md" alignItems="center">
      <div className="text-white rounded-md bg-primary-surface p-space-sm">Item 1</div>
      <div className="text-white rounded-md bg-primary-surface p-space-lg">Item 2 (taller)</div>
    </FlexRow>
  </div>
);

export const WithJustification = () => (
  <FlexRow gap="space-md" justifyContent="space-between">
    <div className="text-white rounded-md bg-primary-surface p-space-md">Item 1</div>
    <div className="text-white rounded-md bg-primary-surface p-space-md">Item 2</div>
  </FlexRow>
);