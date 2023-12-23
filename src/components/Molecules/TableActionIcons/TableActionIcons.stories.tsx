import { Meta, StoryObj } from '@storybook/react';
import TableActionIcons from './TableActionIcons.tsx';

const meta: Meta<typeof TableActionIcons> = {
  tags: ['autodocs'],
  component: TableActionIcons,
  title: 'Molecules/TableActionIcons',
};

export default meta;

type Story = StoryObj<typeof TableActionIcons>;

export const Primary: Story = {};
