import { Meta, StoryObj } from '@storybook/react';
import LockIcon from './LockIcon.tsx';

/** Lock Icon - based on FontAwesome */
const meta: Meta<typeof LockIcon> = {
  tags: ['autodocs'],
  component: LockIcon,
  title: 'Atoms/Lock icon',
};

export default meta;

type Story = StoryObj<typeof LockIcon>;

export const Primary: Story = {};
