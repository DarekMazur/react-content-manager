import { Meta, StoryObj } from '@storybook/react';
import MenuListItem from './MenuListItem.tsx';
import { StyledMenuList } from '../../Molecules/MenuList/MenuList.styles.ts';

/** Item for header top menu. Based on NavLink from React Router */
const meta: Meta<typeof MenuListItem> = {
  tags: ['autodocs'],
  component: MenuListItem,
  title: 'Atoms/Main menu list item',
  decorators: [
    (Story) => (
      <div style={{ fontSize: '1.6rem', fontWeight: '600' }}>
        <StyledMenuList>
          <Story />
        </StyledMenuList>
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof MenuListItem>;

export const Active: Story = {
  args: {
    target: '/',
    children: 'Active menu target',
  },
};

export const InActive: Story = {
  args: {
    target: '/lorem',
    children: 'Inactive menu target',
  },
};
