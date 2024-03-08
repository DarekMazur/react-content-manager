import { Meta, StoryObj } from '@storybook/react';
import Icon from './Icon.tsx';
import { faker } from '@faker-js/faker';

/** Icon - placeholder for user avatar */
const meta: Meta<typeof Icon> = {
  tags: ['autodocs'],
  component: Icon,
  title: 'Atoms/User Icon',
};

export default meta;
type Story = StoryObj<typeof Icon>;

/** Default icon for no avatar */
export const Default: Story = {};

/** Icon for user's avatar */
export const Avatar: Story = {
  args: {
    customIcon: faker.internet.avatar(),
  },
};
