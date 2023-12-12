import { faker } from '@faker-js/faker';
import { mockRoles, RoleTypes } from './mockRoles.ts';

export interface UserTypes {
  id: number;
  username: string;
  email: string;
  avatar: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  uuid: string;
  role: RoleTypes;
}

export const mockUsers: Array<UserTypes> = [];

const randomizeLength = Math.floor(Math.random() * 30);
const bannedChance = 15;

for (let i = 0; i <= randomizeLength; i++) {
  const roleId = Math.floor(Math.random() * 4) + 1;
  const userRole = mockRoles.filter((role) => role.id === roleId);
  const isBlocked = Math.floor(Math.random() * 100) <= bannedChance;
  const user = {
    id: i + 1,
    username: faker.person.fullName(),
    email: faker.internet.email(),
    avatar: faker.internet.avatar(),
    provider: 'local',
    confirmed: true,
    blocked: isBlocked,
    uuid: faker.string.uuid(),
    role: {
      id: userRole[0].id,
      name: userRole[0].name,
      description: userRole[0].description,
      type: userRole[0].type,
    },
  };

  mockUsers.push(user);
}
