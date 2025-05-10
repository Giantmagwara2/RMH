import React from 'react';
import Badge from './Badge';

export default {
  title: 'UI/Badge',
  component: Badge,
};

export const Variants = () => (
  <div className="flex flex-col gap-space-sm">
    <Badge variant="default">Default</Badge>
    <Badge variant="success">Success</Badge>
    <Badge variant="warning">Warning</Badge>
    <Badge variant="error">Error</Badge>
    <Badge variant="info">Info</Badge>
  </div>
);
