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

const createUsers = () => {
  for (let i = 0; i < faker.number.int({ min: 1, max: 50 }); ++i) {
    const user = db.user.create({ id: db.user.count() + 1 });
    if (user.confirmed) {
      for (let i = 0; i < faker.number.int({ min: 0, max: 10 }); ++i) {
        const createdDate = faker.date.past();
        const isPublished = faker.datatype.boolean(0.75);
        const article = db.article.create({
          id: db.article.count() + 1,
          createdAt: createdDate,
          updatedAt: createdDate,
          publishedAt: isPublished ? createdDate : null,
          author: user,
        });
        for (let i = 0; i < faker.number.int({ min: 0, max: 15 }); ++i) {
          const commentAuthor = db.user.findFirst({
            where: {
              id: {
                equals: faker.number.int({ min: 1, max: db.user.count() }),
              },
            },
          });

          db.comment.create({
            id: db.comment.count() + 1,
            author: commentAuthor!,
            article,
          });
        }
      }
    }
  }
};

createUsers();

window.mocks = {
  createUsers,
  getUsers: () => db.user.getAll(),
  getArticles: () => db.article.getAll(),
  getComments: () => db.comment.getAll(),
};
