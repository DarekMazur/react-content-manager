import { faker } from '@faker-js/faker';

interface dataTypes {
  blogName: string;
  blogUrl: string;
  authorName: string;
  authorUrl: string;
}

export const data: dataTypes = {
  blogName: 'Leśny Gacek',
  blogUrl: 'https://lesnygacek.pl',
  authorName: 'Nerdistry',
  authorUrl: 'https://nerdistry.pl',
};

export const adminUser = {
  id: 1,
  username: faker.person.fullName(),
  email: faker.internet.email(),
  avatar: faker.internet.avatar(),
  provider: 'local',
  confirmed: true,
  blocked: false,
  createdAt: '2023-12-08T11:17:05.804Z',
  updatedAt: '2023-12-08T11:17:05.804Z',
  uuid: faker.string.uuid(),
  role: {
    id: 1,
    name: 'Administrator',
    description: 'Page admin',
    type: 'admin',
    createdAt: '2023-06-18T21:11:04.852Z',
    updatedAt: '2023-06-18T21:11:04.852Z',
  },
};
