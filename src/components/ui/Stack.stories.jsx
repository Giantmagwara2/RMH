// /src/components/ui/Stack.stories.jsx
import React from 'react';
import { Stack } from './Stack';
import { Text } from './Text'; // Assuming we have a Text component

export default {
  title: 'UI/Layout/Stack',
  component: Stack,
};

export const Default = () => (
  <Stack gap="space-sm">
    <div className="rounded-md bg-neutrals-surface p-space-md">Item 1</div>
    <div className="rounded-md bg-neutrals-surface p-space-md">Item 2</div>
    <div className="rounded-md bg-neutrals-surface p-space-md">Item 3</div>
  </Stack>
);

export const WithDifferentGaps = () => (
  <>
    <Stack gap="space-xs" className="mb-space-md">
      <div className="rounded-md bg-neutrals-surface p-space-md">Item 1 (xs)</div>
      <div className="rounded-md bg-neutrals-surface p-space-md">Item 2 (xs)</div>
    </Stack>
    <Stack gap="space-md" className="mb-space-md">
      <div className="rounded-md bg-neutrals-surface p-space-md">Item 1 (md)</div>
      <div className="rounded-md bg-neutrals-surface p-space-md">Item 2 (md)</div>
    </Stack>
    <Stack gap="space-xl">
      <div className="rounded-md bg-neutrals-surface p-space-md">Item 1 (xl)</div>
      <div className="rounded-md bg-neutrals-surface p-space-md">Item 2 (xl)</div>
    </Stack>
  </>
);