import { Meta, StoryObj } from '@storybook/react';
import Button from './Button.tsx';

const meta: Meta<typeof Button> = {
  tags: ['autodocs'],
  component: Button,
  title: 'Atoms/Button',
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  argTypes: {
    children: {
      control: 'text',
      description: 'Component children',
      name: 'Label',
    },
  },
  args: {
    children: 'Click',
  },
};
