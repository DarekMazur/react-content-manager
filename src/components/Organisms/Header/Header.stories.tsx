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
      avatar: '',
      provider: 'local',
      confirmed: true,
      blocked: true,
      role: {
        id: 1,
        name: 'Administrator',
        description: 'Page admin',
        type: 'admin',
      },
    },
  },
};

/** View for authorised user with avatar */
export const AuthorisedWithAvatar: Story = {
  args: {
    user: {
      uuid: faker.string.uuid(),
      id: faker.number.int(),
      username: faker.helpers.fake(`{{person.firstName}} {{person.lastName}}`),
      email: faker.internet.email(),
      avatar: faker.internet.avatar(),
      provider: 'local',
      confirmed: true,
      blocked: true,
      role: {
        id: 1,
        name: 'Administrator',
        description: 'Page admin',
        type: 'admin',
      },
    },
  },
};
