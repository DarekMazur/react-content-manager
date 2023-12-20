import { Meta, StoryObj } from '@storybook/react';
import EntriesNumberPicker from './EntriesNumberPicker.tsx';

const meta: Meta<typeof EntriesNumberPicker> = {
  tags: ['autodocs'],
  component: EntriesNumberPicker,
  title: 'Molecules/EntriesNumberPicker',
};

export default meta;

type Story = StoryObj<typeof EntriesNumberPicker>;

export const Primary: Story = {
  args: {
    isExpand: true,
    perPage: 10,
  },
};
