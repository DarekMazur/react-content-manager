import { Meta, StoryObj } from '@storybook/react';
import Copyright from './Copyright.tsx';

const meta: Meta<typeof Copyright> = {
  tags: ['autodocs'],
  component: Copyright,
  title: 'Molecules/Copyright',
};

export default meta;
type Story = StoryObj<typeof Copyright>;

/** Footer copyright component */
export const Primary: Story = {};
