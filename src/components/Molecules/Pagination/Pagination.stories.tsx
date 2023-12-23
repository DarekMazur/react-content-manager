import { Meta, StoryObj } from '@storybook/react';
import Pagination from './Pagination.tsx';

const meta: Meta<typeof Pagination> = {
  tags: ['autodocs'],
  component: Pagination,
  title: 'Molecules/Pagination',
};

export default meta;

type Story = StoryObj<typeof Pagination>;

export const Primary: Story = {
  args: {
    pages: 3,
    current: 1,
  },
};
