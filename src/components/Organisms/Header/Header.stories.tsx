import { Meta, StoryObj } from '@storybook/react';
import Header from './Header.tsx';
import { faker } from '@faker-js/faker';

/** Header component */
const meta: Meta<typeof Header> = {
  tags: ['autodocs'],
  component: Header,
  title: 'Organisms/Header',
};

export default meta;
type Story = StoryObj<typeof Header>;

/** View for authorised user with default icon */
export const AuthorisedNoAvatar: Story = {
  args: {
    isAuthorised: true,
    user: {
      userName: faker.person.fullName(),
      uuid: faker.string.uuid(),
    },
  },
};

/** View for authorised user with avatar */
export const AuthorisedWithAvatar: Story = {
  args: {
    isAuthorised: true,
    user: {
      userName: faker.person.fullName(),
      uuid: faker.string.uuid(),
      avatar: faker.internet.avatar(),
    },
  },
};
