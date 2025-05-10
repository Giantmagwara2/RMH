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
