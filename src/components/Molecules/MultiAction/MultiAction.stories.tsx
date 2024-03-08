import { Meta, StoryObj } from '@storybook/react';
import MultiAction from './MultiAction.tsx';

const meta: Meta<typeof MultiAction> = {
  tags: ['autodocs'],
  component: MultiAction,
  title: 'Molecules/MultiAction',
};

export default meta;

type Story = StoryObj<typeof MultiAction>;

export const Primary: Story = {
  args: {
    counter: 3,
  },
};
