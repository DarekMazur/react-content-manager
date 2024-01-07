import { faker } from '@faker-js/faker';
import { factory, oneOf, primaryKey, nullable } from '@mswjs/data';
import { RoleTypes } from '../types/dataTypes';

faker.seed(123);

export const roles: Array<RoleTypes> = [
  {
    id: 1,
    name: 'Administrator',
    description: 'Page admin',
    type: 'admin',
  },
  {
    id: 2,
    name: 'Redactor',
    description: 'Blog redactor',
    type: 'redactor',
  },
  {
    id: 3,
    name: 'Creator',
    description: 'Content creator',
    type: 'creator',
  },
  {
    id: 4,
    name: 'Authenticated',
    description: 'User',
    type: 'authenticated',
  },
];

export const db = factory({
  user: {
    uuid: primaryKey(faker.string.uuid),
    id: () => faker.number.int(),
    username: () =>
      faker.helpers.fake(`{{person.firstName}} {{person.lastName}}`),
    email: () => faker.internet.email(),
    avatar: () => faker.internet.avatar(),
    provider: () => 'local',
    confirmed: () => faker.datatype.boolean(0.8),
    blocked: () => faker.datatype.boolean(0.15),
    role: () =>
      roles[faker.number.int({ min: 0, max: roles.length - 1 })] as any, // eslint-disable-line @typescript-eslint/no-explicit-any
  },
  comment: {
    id: () => faker.number.int(),
    content: () => faker.lorem.sentence({ min: 1, max: 20 }),
    uuid: primaryKey(faker.string.uuid),
    createdAt: () => faker.date.past(),
    updatedAt: () => faker.date.past(),
    publishedAt: () => faker.date.past(),
    author: oneOf('user'),
    article: oneOf('article'),
  },
  article: {
    uuid: primaryKey(faker.string.uuid),
    id: () => faker.number.int(),
    isSticky: () => faker.datatype.boolean(0.3),
    title: () => faker.lorem.sentence({ min: 2, max: 6 }),
    description: () => faker.lorem.words({ min: 0, max: 14 }),
    body: () => faker.lorem.paragraphs({ min: 5, max: 29 }),
    createdAt: () => faker.date.past(),
    updatedAt: () => faker.date.past(),
    publishedAt: nullable<Date>(faker.date.past),
    likes: () => faker.number.int({ min: 0, max: 500 }),
    categories: () => faker.helpers.fake(`{{lorem.word}}, {{lorem.word}}`),
    author: oneOf('user'),
  },
});
