import React from 'react';
import Avatar from './Avatar';

export default {
  title: 'UI/Avatar',
  component: Avatar,
};

export const WithImage = () => (
  <Avatar
    src="https://i.pravatar.cc/150?img=8"
    alt="User"
    size="md"
  />
);

export const WithInitial = () => (
  <Avatar name="RocVille" size="md" />
);

export const Sizes = () => (
  <div className="flex items-center gap-space-md">
    <Avatar name="R" size="sm" />
    <Avatar name="R" size="md" />
    <Avatar name="R" size="lg" />
  </div>
);

export const WithClassName = () => (
  <Avatar name="Custom Style" className="border-2 border-blue-500" size="md" />
);

export const DifferentSizes = () => (
  <div className="flex space-x-4">
    <Avatar name="XS" size="sm" />
    <Avatar name="SM" size="md" />
    <Avatar name="LG" size="lg" />
  </div>
);
