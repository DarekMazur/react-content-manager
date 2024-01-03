import { mockUsers, UserTypes } from './users.ts';
import { faker } from '@faker-js/faker';

export interface CommentTypes {
  id: number;
  content: string;
  uuid: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  user: UserTypes;
}

const users = mockUsers;
export const mockComments: Array<CommentTypes> = [];
const randomizeLength = Math.floor(Math.random() * 500);

for (let i = 0; i <= randomizeLength; i++) {
  const getID = faker.number.int({ min: 1, max: users.length });
  const user: UserTypes = users.filter((user) => user.id === getID)[0];
  const createdDate = faker.date.past();

  const comment: CommentTypes = {
    id: i + 1,
    content: faker.lorem.sentence({ min: 1, max: 20 }),
    uuid: faker.string.uuid(),
    createdAt: createdDate,
    updatedAt: createdDate,
    publishedAt: createdDate,
    user,
  };

  mockComments.push(comment);
}
