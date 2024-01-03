import { faker } from '@faker-js/faker';
import { factory, primaryKey } from '@mswjs/data';
import { roles } from './data/roles';

faker.seed(123);

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
});
