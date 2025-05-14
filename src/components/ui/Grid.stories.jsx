import React from 'react';
import { Grid } from './Grid';
import { GridItem } from './GridItem';

export default {
  title: 'UI/Layout/Grid',
  component: Grid,
};

export const ThreeColumnGrid = () => (
  <Grid columns={3} gap="space-md">
    <GridItem colSpan={1}>
      <div className="text-white rounded-md bg-primary-surface p-space-md">Column 1</div>
    </GridItem>
    <GridItem colSpan={1}>
      <div className="text-white rounded-md bg-primary-surface p-space-md">Column 2</div>
    </GridItem>
    <GridItem colSpan={1}>
      <div className="text-white rounded-md bg-primary-surface p-space-md">Column 3</div>
    </GridItem>
  </Grid>
);

export const ResponsiveGrid = () => (
  <Grid
    columns={3}
    gap="space-md"
    responsive={{ sm: 1, md: 2, lg: 3 }} // Add responsive configuration
  >
    <GridItem colSpan={1}>
      <div className="text-white rounded-md bg-primary-surface p-space-md">Column 1</div>
    </GridItem>
    <GridItem colSpan={1}>
      <div className="text-white rounded-md bg-primary-surface p-space-md">Column 2</div>
    </GridItem>
    <GridItem colSpan={1}>
      <div className="text-white rounded-md bg-primary-surface p-space-md">Column 3</div>
    </GridItem>
  </Grid>
);
