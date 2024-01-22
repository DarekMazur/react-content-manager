import { http, HttpResponse } from 'msw';
import { db } from '../db';
import { ArticleDataTypes, UserTypes } from '../../types/dataTypes';

export const handlers = [
  http.get('/api/comments', () => {
    return HttpResponse.json(db.comment.getAll());
  }),
  http.delete('/api/comments/:commentId', async ({ params }) => {
    const { commentId } = params;
    if (!isNaN(Number(commentId))) {
      db.comment.delete({
        where: {
          id: {
            equals: Number(commentId),
          },
        },
      });
      return HttpResponse.json();
    }

    return new HttpResponse(null, { status: 404 });
  }),
  http.delete('/api/comments', async ({ request }) => {
    const CommentsIds = await request.json();
    if (CommentsIds) {
      db.comment.deleteMany({
        where: {
          id: {
            in: CommentsIds as number[],
          },
        },
      });
      return HttpResponse.json();
    }

    return new HttpResponse(null, { status: 404 });
  }),
  http.get('/api/users', () => {
    return HttpResponse.json(db.user.getAll());
  }),
  http.patch('/api/users/:id', async ({ request }) => {
    const updatedUser = (await request.json()) as UserTypes;
    if (updatedUser) {
      db.user.update({
        where: {
          uuid: {
            equals: updatedUser.uuid,
          },
        },
        data: {
          avatar: updatedUser.avatar,
          username: updatedUser.username,
          email: updatedUser.email,
          confirmed: updatedUser.confirmed,
          blocked: updatedUser.blocked,
          role: updatedUser.role,
        },
      });
      return HttpResponse.json(updatedUser, { status: 201 });
    }
  }),
  http.delete('/api/users/:userId', async ({ params }) => {
    const { userId } = params;
    if (!isNaN(Number(userId))) {
      db.user.delete({
        where: {
          id: {
            equals: Number(userId),
          },
        },
      });
      return HttpResponse.json();
    }

    return new HttpResponse(null, { status: 404 });
  }),
  http.delete('/api/users', async ({ request }) => {
    const UsersIds = await request.json();
    if (UsersIds) {
      db.user.deleteMany({
        where: {
          id: {
            in: UsersIds as number[],
          },
        },
      });
      return HttpResponse.json();
    }

    return new HttpResponse(null, { status: 404 });
  }),
  http.get('/api/articles', () => {
    return HttpResponse.json(db.article.getAll());
  }),
  http.patch('/api/articles/:id', async ({ request }) => {
    const updatedArticle = (await request.json()) as ArticleDataTypes;
    if (updatedArticle) {
      db.article.update({
        where: {
          uuid: {
            equals: updatedArticle.uuid,
          },
        },
        data: {
          isSticky: updatedArticle.isSticky,
          title: updatedArticle.title,
          description: updatedArticle.description,
          body: updatedArticle.body,
          createdAt: updatedArticle.createdAt,
          updatedAt: updatedArticle.updatedAt,
          publishedAt: updatedArticle.publishedAt,
          likes: updatedArticle.likes,
          categories: updatedArticle.categories,
        },
      });
      return HttpResponse.json(updatedArticle, { status: 201 });
    }
  }),
  http.delete('/api/articles/:articleId', async ({ params }) => {
    const { articleId } = params;
    if (!isNaN(Number(articleId))) {
      db.article.delete({
        where: {
          id: {
            equals: Number(articleId),
          },
        },
      });
      return HttpResponse.json();
    }

    return new HttpResponse(null, { status: 404 });
  }),
  http.delete('/api/articles', async ({ request }) => {
    const articleIds = await request.json();
    if (articleIds) {
      db.article.deleteMany({
        where: {
          id: {
            in: articleIds as number[],
          },
        },
      });
      return HttpResponse.json();
    }

    return new HttpResponse(null, { status: 404 });
  }),
];
