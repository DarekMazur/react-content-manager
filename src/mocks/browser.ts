import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';
import { faker } from '@faker-js/faker';
import { db } from './db.ts';

declare global {
  interface Window {
    mocks: unknown;
  }
}

export const worker = setupWorker(...handlers);

const usersNumber = faker.number.int({ min: 1, max: 100 });
const createUsers = () => {
  for (let i = 0; i < usersNumber; ++i) {
    db.user.create();
  }
};

createUsers();

window.mocks = {
  createUsers,
  getUsers: () => db.user.getAll(),
};
