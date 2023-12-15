import '@testing-library/jest-dom';
import { PostTypes } from '../../__mock__/mockPosts.ts';
import { CommentTypes } from '../../__mock__/mockComments.ts';
import { faker } from '@faker-js/faker';
import { getLatest } from './getLatest.ts';

const demoPostsArray: Array<PostTypes> = [
  {
    id: 1,
    title: faker.lorem.sentence({ min: 2, max: 6 }),
    description: faker.lorem.words({ min: 0, max: 14 }),
    body: faker.lorem.paragraphs({ min: 5, max: 29 }),
    uuid: faker.string.uuid(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.past(),
    publishedAt: faker.date.past(),
    likes: faker.number.int({ min: 0, max: 500 }),
    author: {
      uuid: faker.string.uuid(),
      username: faker.person.fullName(),
      email: faker.internet.email(),
      avatar: faker.internet.avatar(),
      role: {
        id: 1,
        name: 'Administrator',
        description: 'Page admin',
        type: 'admin',
      },
    },
    comments: null,
  },
  {
    id: 2,
    title: faker.lorem.sentence({ min: 2, max: 6 }),
    description: faker.lorem.words({ min: 0, max: 14 }),
    body: faker.lorem.paragraphs({ min: 5, max: 29 }),
    uuid: faker.string.uuid(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.past(),
    publishedAt: faker.date.past(),
    likes: faker.number.int({ min: 0, max: 500 }),
    author: {
      uuid: faker.string.uuid(),
      username: faker.person.fullName(),
      email: faker.internet.email(),
      avatar: faker.internet.avatar(),
      role: {
        id: 1,
        name: 'Administrator',
        description: 'Page admin',
        type: 'admin',
      },
    },
    comments: null,
  },
  {
    id: 3,
    title: 'Latest post',
    description: faker.lorem.words({ min: 0, max: 14 }),
    body: faker.lorem.paragraphs({ min: 5, max: 29 }),
    uuid: faker.string.uuid(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.past(),
    publishedAt: faker.date.soon(),
    likes: faker.number.int({ min: 0, max: 500 }),
    author: {
      uuid: faker.string.uuid(),
      username: faker.person.fullName(),
      email: faker.internet.email(),
      avatar: faker.internet.avatar(),
      role: {
        id: 1,
        name: 'Administrator',
        description: 'Page admin',
        type: 'admin',
      },
    },
    comments: null,
  },
  {
    id: 4,
    title: faker.lorem.sentence({ min: 2, max: 6 }),
    description: faker.lorem.words({ min: 0, max: 14 }),
    body: faker.lorem.paragraphs({ min: 5, max: 29 }),
    uuid: faker.string.uuid(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.past(),
    publishedAt: faker.date.past(),
    likes: faker.number.int({ min: 0, max: 500 }),
    author: {
      uuid: faker.string.uuid(),
      username: faker.person.fullName(),
      email: faker.internet.email(),
      avatar: faker.internet.avatar(),
      role: {
        id: 1,
        name: 'Administrator',
        description: 'Page admin',
        type: 'admin',
      },
    },
    comments: null,
  },
];

const demoCommentsArray: Array<CommentTypes> = [
  {
    id: 1,
    content: faker.lorem.sentence({ min: 1, max: 20 }),
    uuid: faker.string.uuid(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.past(),
    publishedAt: faker.date.past(),
    user: {
      id: 1,
      username: faker.person.fullName(),
      email: faker.internet.email(),
      avatar: faker.internet.avatar(),
      provider: 'local',
      confirmed: true,
      blocked: false,
      uuid: faker.string.uuid(),
      role: {
        id: 1,
        name: 'Administrator',
        description: 'Page admin',
        type: 'admin',
      },
    },
  },
  {
    id: 2,
    content: faker.lorem.sentence({ min: 1, max: 20 }),
    uuid: faker.string.uuid(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.past(),
    publishedAt: faker.date.past(),
    user: {
      id: 1,
      username: faker.person.fullName(),
      email: faker.internet.email(),
      avatar: faker.internet.avatar(),
      provider: 'local',
      confirmed: true,
      blocked: false,
      uuid: faker.string.uuid(),
      role: {
        id: 1,
        name: 'Administrator',
        description: 'Page admin',
        type: 'admin',
      },
    },
  },
  {
    id: 3,
    content: 'Latest comment',
    uuid: faker.string.uuid(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.past(),
    publishedAt: faker.date.soon(),
    user: {
      id: 1,
      username: faker.person.fullName(),
      email: faker.internet.email(),
      avatar: faker.internet.avatar(),
      provider: 'local',
      confirmed: true,
      blocked: false,
      uuid: faker.string.uuid(),
      role: {
        id: 1,
        name: 'Administrator',
        description: 'Page admin',
        type: 'admin',
      },
    },
  },
  {
    id: 4,
    content: faker.lorem.sentence({ min: 1, max: 20 }),
    uuid: faker.string.uuid(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.past(),
    publishedAt: faker.date.past(),
    user: {
      id: 1,
      username: faker.person.fullName(),
      email: faker.internet.email(),
      avatar: faker.internet.avatar(),
      provider: 'local',
      confirmed: true,
      blocked: false,
      uuid: faker.string.uuid(),
      role: {
        id: 1,
        name: 'Administrator',
        description: 'Page admin',
        type: 'admin',
      },
    },
  },
];

describe('getLatest method', () => {
  it('- should find latest post from array', () => {
    expect((getLatest(demoPostsArray).latest as PostTypes).title).toBe(
      'Latest post',
    );
  });
  it('- should find latest comment from array', () => {
    expect((getLatest(demoCommentsArray).latest as CommentTypes).content).toBe(
      'Latest comment',
    );
  });
});