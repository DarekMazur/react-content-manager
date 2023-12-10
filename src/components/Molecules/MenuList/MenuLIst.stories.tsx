import { Meta, StoryObj } from '@storybook/react';
import MenuList from './MenuList.tsx';

/** Header top menu */
const meta: Meta<typeof MenuList> = {
  tags: ['autodocs'],
  component: MenuList,
  title: 'Molecules/Main menu list',
  decorators: [
    (Story) => (
      <div style={{ fontSize: '1.6rem', fontWeight: '600' }}>
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof MenuList>;

export const Primary: Story = {};
