import { mockUsers, UserTypes } from './mockUsers.ts';
import { faker } from '@faker-js/faker';

export interface CommentTypes {
  id: number;
  content: string;
  uuid: string;
  user: UserTypes;
}

const users = mockUsers;
export const mockComments: Array<CommentTypes> = [];
const randomizeLength = Math.floor(Math.random() * 500);

for (let i = 0; i <= randomizeLength; i++) {
  const user: Array<UserTypes> = users.filter(
    (user) => user.id === Math.floor(Math.random() * users.length),
  );
  const comment: CommentTypes = {
    id: i + 1,
    content: faker.lorem.sentence({ min: 1, max: 20 }),
    uuid: faker.string.uuid(),
    user: user[0],
  };

  mockComments.push(comment);
}
