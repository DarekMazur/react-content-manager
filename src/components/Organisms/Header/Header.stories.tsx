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
    user: {
      uuid: faker.string.uuid(),
      id: faker.number.int(),
      username: faker.helpers.fake(`{{person.firstName}} {{person.lastName}}`),
      email: faker.internet.email(),
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
      avatar: null,
      provider: 'local',
      confirmed: true,
      blocked: true,
      role: {
        id: 1,
        name: 'Administrator',
        description: 'Page admin',
        type: 'admin',
        createdAt: faker.date.past(),
        updatedAt: faker.date.recent(),
        nb_users: faker.number.int()
      },
      articles: [],
      comments: []
    },
  },
};