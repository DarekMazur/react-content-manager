import { Meta, StoryObj } from '@storybook/react';
import ActionButton from './ActionButton.tsx';

const meta: Meta<typeof ActionButton> = {
  tags: ['autodocs'],
  component: ActionButton,
  title: 'Atoms/ActionButton',
};

export default meta;

type Story = StoryObj<typeof ActionButton>;

export const Primary: Story = {
  argTypes: {
    children: {
      control: 'text',
      description: 'Component children',
      name: 'Label',
    },
    handleClick: {
      description: 'onClick action',
    },
    isDel: {
      control: 'boolean',
      description: 'Switch between standard buttno and delete button',
      table: {
        type: {
          summary: 'boolean',
        },
        defaultValue: {
          summary: false,
        },
      },
    },
  },
  args: {
    children: 'click',
    handleClick: () => {},
  },
};

export const Delete: Story = {
  args: {
    children: 'delete',
    isDel: true,
    handleClick: () => {},
  },
};
