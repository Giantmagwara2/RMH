import React from 'react';
import { Container } from './Container';

export default {
  title: 'UI/Layout/Container',
  component: Container,
};

export const Default = () => (
  <Container>
    <div className="text-center rounded-md shadow-md bg-neutrals-surface p-space-md">
      <p className="text-text-primary">This is content inside a Container component.</p>
    </div>
  </Container>
);
