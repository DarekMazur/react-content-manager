// import { http, HttpResponse } from 'msw';
// import { db } from '../db';
// import {
//   IArticleDataTypes,
//   ICategoriesTypes,
//   ICommentTypes,
//   IUserTypes,
// } from '../../types/dataTypes';
// import { faker } from '@faker-js/faker';
//
// export const handlers = [
//   http.get('/api/comments', () => {
//     return HttpResponse.json(db.comment.getAll());
//   }),
//   http.patch('/api/comments/:id', async ({ request }) => {
//     const updatedComment = (await request.json()) as ICommentTypes;
//     if (updatedComment) {
//       db.comment.update({
//         where: {
//           uuid: {
//             equals: updatedComment.uuid,
//           },
//         },
//         data: {
//           shadowed: updatedComment.shadowed,
//         },
//       });
//       return HttpResponse.json(updatedComment, { status: 201 });
//     }
//   }),
//   http.delete('/api/comments/:commentId', async ({ params }) => {
//     const { commentId } = params;
//     if (!isNaN(Number(commentId))) {
//       db.comment.delete({
//         where: {
//           id: {
//             equals: Number(commentId),
//           },
//         },
//       });
//       return HttpResponse.json();
//     }
//
//     return new HttpResponse(null, { status: 404 });
//   }),
//   http.delete('/api/comments', async ({ request }) => {
//     const CommentsIds = await request.json();
//     if (CommentsIds) {
//       db.comment.deleteMany({
//         where: {
//           id: {
//             in: CommentsIds as number[],
//           },
//         },
//       });
//       return HttpResponse.json();
//     }
//
//     return new HttpResponse(null, { status: 404 });
//   }),
//   http.get('/api/users', () => {
//     return HttpResponse.json(db.user.getAll());
//   }),
//   http.patch('/api/users/:id', async ({ request }) => {
//     const updatedUser = (await request.json()) as IUserTypes;
//     if (updatedUser) {
//       db.user.update({
//         where: {
//           uuid: {
//             equals: updatedUser.uuid,
//           },
//         },
//         data: {
//           avatar: updatedUser.avatar,
//           username: updatedUser.username,
//           email: updatedUser.email,
//           confirmed: updatedUser.confirmed,
//           blocked: updatedUser.blocked,
//           role: updatedUser.role,
//         },
//       });
//       return HttpResponse.json(updatedUser, { status: 201 });
//     }
//   }),
//   http.delete('/api/users/:userId', async ({ params }) => {
//     const { userId } = params;
//     if (!isNaN(Number(userId))) {
//       db.user.delete({
//         where: {
//           id: {
//             equals: Number(userId),
//           },
//         },
//       });
//       return HttpResponse.json();
//     }
//
//     return new HttpResponse(null, { status: 404 });
//   }),
//   http.delete('/api/users', async ({ request }) => {
//     const UsersIds = await request.json();
//     if (UsersIds) {
//       db.user.deleteMany({
//         where: {
//           id: {
//             in: UsersIds as number[],
//           },
//         },
//       });
//       return HttpResponse.json();
//     }
//
//     return new HttpResponse(null, { status: 404 });
//   }),
//   http.get('/api/articles', () => {
//     return HttpResponse.json(db.article.getAll());
//   }),
//   http.patch('/api/articles/:id', async ({ request }) => {
//     const updatedArticle = (await request.json()) as IArticleDataTypes;
//     if (updatedArticle) {
//       db.article.update({
//         where: {
//           uuid: {
//             equals: updatedArticle.uuid,
//           },
//         },
//         data: {
//           isSticky: updatedArticle.isSticky,
//           title: updatedArticle.title,
//           description: updatedArticle.description,
//           body: updatedArticle.body,
//           cover: updatedArticle.cover,
//           createdAt: updatedArticle.createdAt,
//           updatedAt: updatedArticle.updatedAt,
//           publishedAt: updatedArticle.publishedAt,
//           likes: updatedArticle.likes,
//           tags: updatedArticle.tags,
//           categories: db.category.findMany({
//             where: {
//               uuid: {
//                 in: updatedArticle.categories.map((category) => category.uuid),
//               },
//             },
//           }),
//         },
//       });
//       return HttpResponse.json(updatedArticle, { status: 201 });
//     }
//   }),
//   http.post('/api/articles', async ({ request }) => {
//     const newArticle = (await request.json()) as IArticleDataTypes;
//     const createdTime = new Date(Date.now());
//     db.article.create({
//       uuid: faker.string.uuid(),
//       id: db.article.count() + 1,
//       createdAt: createdTime,
//       updatedAt: createdTime,
//       publishedAt: newArticle.publishedAt ? createdTime : null,
//       likes: 0,
//       isSticky: newArticle.isSticky,
//       title: newArticle.title,
//       description: newArticle.description,
//       body: newArticle.body,
//       cover: newArticle.cover,
//       tags: newArticle.tags,
//       author: db.user.findFirst({
//         where: {
//           uuid: {
//             equals: newArticle.author.uuid,
//           },
//         },
//       })!,
//       categories: db.category.findMany({
//         where: {
//           uuid: {
//             in: newArticle.categories.map((category) => category.uuid),
//           },
//         },
//       }),
//     });
//     return HttpResponse.json(newArticle, { status: 201 });
//   }),
//   http.delete('/api/articles/:articleId', async ({ params }) => {
//     const { articleId } = params;
//     if (!isNaN(Number(articleId))) {
//       db.article.delete({
//         where: {
//           id: {
//             equals: Number(articleId),
//           },
//         },
//       });
//       return HttpResponse.json();
//     }
//
//     return new HttpResponse(null, { status: 404 });
//   }),
//   http.delete('/api/articles', async ({ request }) => {
//     const articleIds = await request.json();
//     if (articleIds) {
//       db.article.deleteMany({
//         where: {
//           id: {
//             in: articleIds as number[],
//           },
//         },
//       });
//       return HttpResponse.json();
//     }
//
//     return new HttpResponse(null, { status: 404 });
//   }),
//   http.get('/api/categories', () => {
//     return HttpResponse.json(db.category.getAll());
//   }),
//   http.post('/api/categories', async ({ request }) => {
//     const categoryBody = await request.json();
//     if (categoryBody as ICategoriesTypes) {
//       const newCategory: ICategoriesTypes = {
//         uuid: faker.string.uuid(),
//         title: (categoryBody as ICategoriesTypes).title,
//         description: (categoryBody as ICategoriesTypes).description,
//         id: db.category.count() + 1,
//       };
//
//       db.category.create(newCategory);
//
//       return new HttpResponse(null, { status: 201 });
//     }
//   }),
//   http.patch('/api/categories/:id', async ({ request }) => {
//     const updatedCategory = (await request.json()) as ICategoriesTypes;
//     if (updatedCategory) {
//       db.category.update({
//         where: {
//           uuid: {
//             equals: updatedCategory.uuid,
//           },
//         },
//         data: {
//           title: updatedCategory.title,
//           description: updatedCategory.description,
//         },
//       });
//       return HttpResponse.json(updatedCategory, { status: 201 });
//     }
//   }),
//   http.delete('/api/categories/:categoryId', async ({ params }) => {
//     const { categoryId } = params;
//     if (!isNaN(Number(categoryId))) {
//       db.category.delete({
//         where: {
//           id: {
//             equals: Number(categoryId),
//           },
//         },
//       });
//       return HttpResponse.json();
//     }
//
//     return new HttpResponse(null, { status: 404 });
//   }),
//   http.delete('/api/categories', async ({ request }) => {
//     const CategoriesIds = await request.json();
//     if (CategoriesIds) {
//       db.category.deleteMany({
//         where: {
//           id: {
//             in: CategoriesIds as number[],
//           },
//         },
//       });
//       return HttpResponse.json();
//     }
//
//     return new HttpResponse(null, { status: 404 });
//   }),
// ];
