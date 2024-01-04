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
const articlesNumber = faker.number.int({ min: 0, max: 20 });

const createUsers = () => {
  for (let i = 0; i < usersNumber; ++i) {
    const user = db.user.create();
    if (user.confirmed) {
      for (let i = 0; i < articlesNumber; ++i) {
        const createdDate = faker.date.past();
        const isPublished = faker.datatype.boolean(0.75);
        db.article.create({
          id: db.article.count() + 1,
          createdAt: createdDate,
          updatedAt: createdDate,
          publishedAt: isPublished ? createdDate : null,
          author: user,
        });
      }
    }
  }
};

createUsers();

window.mocks = {
  createUsers,
  getUsers: () => db.user.getAll(),
  getArticles: () => db.article.getAll(),
};
