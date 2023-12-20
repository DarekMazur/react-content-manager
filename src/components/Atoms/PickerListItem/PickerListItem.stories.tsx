import { Meta, StoryObj } from '@storybook/react';
import PickerListItem from './PickerListItem.tsx';
import PickerList from '../../Molecules/PickerList/PickerList.tsx';
import React from 'react';

const meta: Meta<typeof PickerListItem> = {
  tags: ['autodocs'],
  component: PickerListItem,
  title: 'Atoms/PickerListItem',
  decorators: [
    (Story) => (
      <PickerList isExpand onClickOutside={() => {}}>
        <Story />
      </PickerList>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof PickerListItem>;

export const Primary: Story = {
  argTypes: {
    value: {
      control: 'number',
      description: 'Component children',
      name: 'Item value',
      table: {
        type: {
          summary: 'number',
        },
        defaultValue: {
          summary: 10,
        },
      },
    },
    onClick: {
      description: 'onClick action',
    },
    perPage: {
      control: 'number',
      description: 'Current value',
      table: {
        type: {
          summary: 'number',
        },
        defaultValue: {
          summary: 10,
        },
      },
    },
  },
  args: {
    value: 10,
    perPage: 10,
    onClick: () => {},
  },
};

export const Secondary: Story = {
  args: {
    value: 10,
    perPage: 25,
    onClick: () => {},
  },
};
