import { faker } from '@faker-js/faker';
import { getDate } from '../utils/methods/getDate.ts';
// import TableActionIcons from '../components/Molecules/TableActionIcons/TableActionIcons.tsx';
import { TablePostDataTypes } from '../components/Organisms/Table/Table.tsx';

export const mockTempPosts: Array<TablePostDataTypes> = [];

for (let i = 0; i < 110; i++) {
  const isPublished = faker.datatype.boolean();
  const post = {
    id: faker.string.uuid(),
    title: faker.lorem.sentence({ min: 2, max: 5 }),
    author: faker.person.fullName(),
    status: isPublished,
    sticky: faker.datatype.boolean(),
    categories: `${faker.lorem.word()}, ${faker.lorem.word()}`,
    comments: faker.number.int({ min: 0, max: 100 }),
    likes: faker.number.int({ min: 0, max: 1000 }),
    publishedAt: isPublished ? getDate(faker.date.recent()) : null,
  };

  mockTempPosts.push(post);
}
