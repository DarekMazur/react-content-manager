import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';
import { faker } from '@faker-js/faker';
import { db } from './db.ts';
import { ICategoriesTypes } from '../types/dataTypes.ts';

declare global {
  interface Window {
    mocks: unknown;
  }
}

export const worker = setupWorker(...handlers);

const createCategories = () => {
  for (let i = 0; i < 5; ++i) {
    db.category.create({ id: db.category.count() + 1 });
  }
};

const createUsers = () => {
  for (let i = 0; i < faker.number.int({ min: 10, max: 50 }); ++i) {
    const user = db.user.create({ id: db.user.count() + 1 });
    if (user.confirmed) {
      for (let i = 0; i < faker.number.int({ min: 0, max: 20 }); ++i) {
        const createdDate = faker.date.past();
        const isPublished = faker.datatype.boolean(0.75);
        const categoriesList: ICategoriesTypes[] = [];
        for (
          let i = 0;
          i < faker.number.int({ min: 1, max: db.category.count() });
          ++i
        ) {
          const newCategory =
            db.category.getAll()[
              faker.number.int({ min: 0, max: db.category.count() - 1 })
            ];
          if (
            categoriesList.length === 0 ||
            !categoriesList.includes(newCategory)
          )
            categoriesList.push(newCategory);
        }
        const article = db.article.create({
          id: db.article.count() + 1,
          createdAt: createdDate,
          updatedAt: createdDate,
          publishedAt: isPublished ? createdDate : null,
          author: user,
          categories: categoriesList,
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

createCategories();
createUsers();

window.mocks = {
  createCategories,
  createUsers,
  getUsers: () => db.user.getAll(),
  getArticles: () => db.article.getAll(),
  getComments: () => db.comment.getAll(),
  getCategories: () => db.category.getAll(),
};
